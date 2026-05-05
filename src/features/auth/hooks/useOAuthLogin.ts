import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { tokenService } from '@/services/token.service';
import { showToast } from '@/utils/toast';

WebBrowser.maybeCompleteAuthSession();

const openOAuthSession = async (
  initPath: string,
  callbackPath: string,
  onSuccess?: () => void,
  errorMsg = 'Đăng nhập thất bại',
) => {
  const appCallbackUrl = Linking.createURL(callbackPath);
  const initUrl = `${process.env.EXPO_PUBLIC_API_URL}/${initPath}?state=${encodeURIComponent(appCallbackUrl)}`;
  const result = await WebBrowser.openAuthSessionAsync(initUrl, appCallbackUrl);
  if (result.type === 'success') {
    const parsed = new URL(result.url);
    const accessToken = parsed.searchParams.get('accessToken');
    const refreshToken = parsed.searchParams.get('refreshToken');
    if (accessToken && refreshToken) {
      await tokenService.saveTokens(accessToken, refreshToken);
      onSuccess?.();
    } else {
      showToast.error(errorMsg);
    }
  }
};

export const useGoogleLogin = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const promptAsync = async () => {
    setIsLoading(true);
    try {
      await openOAuthSession('auth/google/init', 'auth/google/callback', onSuccess, 'Đăng nhập Google thất bại');
    } catch {
      showToast.error('Đăng nhập Google thất bại');
    } finally {
      setIsLoading(false);
    }
  };
  return { promptAsync, isLoading, request: true };
};

export const useFacebookLogin = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const promptAsync = async () => {
    setIsLoading(true);
    try {
      await openOAuthSession('auth/facebook/init', 'auth/facebook/callback', onSuccess, 'Đăng nhập Facebook thất bại');
    } catch {
      showToast.error('Đăng nhập Facebook thất bại');
    } finally {
      setIsLoading(false);
    }
  };
  return { promptAsync, isLoading, request: true };
};
