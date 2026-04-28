import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '@/constants/storage-keys';

export const tokenService = {
  async getAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
  },

  async getRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
  },

  async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
    await Promise.all([
      SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, accessToken),
      SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, refreshToken),
    ]);
  },

  async savePhoneNumber(phoneNumber: string): Promise<void> {
    await SecureStore.setItemAsync(STORAGE_KEYS.PHONE_NUMBER, phoneNumber);
  },

  async getPhoneNumber(): Promise<string | null> {
    return SecureStore.getItemAsync(STORAGE_KEYS.PHONE_NUMBER);
  },

  async clearTokens(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.PHONE_NUMBER),
    ]);
  },
};
