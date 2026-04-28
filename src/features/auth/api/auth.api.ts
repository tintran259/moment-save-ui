import { apiClient } from '@/services/axios';
import {
  SendOtpRequest,
  VerifyOtpRequest,
  RefreshTokenRequest,
  AuthTokens,
  ApiResponse,
} from '@/types/auth.types';

export const authApi = {
  sendOtp: async (data: SendOtpRequest): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      '/auth/send-otp',
      data,
    );
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<ApiResponse<AuthTokens>> => {
    const response = await apiClient.post<ApiResponse<AuthTokens>>(
      '/auth/verify-otp',
      data,
    );
    return response.data;
  },

  refreshToken: async (
    data: RefreshTokenRequest,
  ): Promise<ApiResponse<AuthTokens>> => {
    const response = await apiClient.post<ApiResponse<AuthTokens>>(
      '/auth/refresh-token',
      data,
    );
    return response.data;
  },
};
