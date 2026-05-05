import axios from 'axios';
import { tokenService } from './token.service';

const BASE_URL = (() => {
  const url = process.env.EXPO_PUBLIC_API_URL;
  if (!url) {
    if (__DEV__) console.warn('[axios] EXPO_PUBLIC_API_URL not set — falling back to localhost');
    return 'http://localhost:3000/api/v1';
  }
  return url;
})();

// Minimal pub/sub — no dependency needed
type Unsubscribe = () => void;
const _sessionListeners = new Set<() => void>();
export const authEvents = {
  onSessionExpired: (fn: () => void): Unsubscribe => {
    _sessionListeners.add(fn);
    return () => _sessionListeners.delete(fn);
  },
  emit: () => _sessionListeners.forEach(fn => fn()),
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await tokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Single in-flight refresh promise shared across concurrent 401s
let _refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await tokenService.getRefreshToken();
      if (!refreshToken) {
        await tokenService.clearTokens();
        authEvents.emit();
        return Promise.reject(error);
      }

      try {
        if (!_refreshPromise) {
          _refreshPromise = axios
            .post(`${BASE_URL}/auth/refresh-token`, { refreshToken })
            .then(async ({ data }) => {
              await tokenService.saveTokens(
                data.data.accessToken,
                data.data.refreshToken,
              );
              return data.data.accessToken as string;
            })
            .finally(() => {
              _refreshPromise = null;
            });
        }

        const newAccessToken = await _refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        await tokenService.clearTokens();
        authEvents.emit();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
