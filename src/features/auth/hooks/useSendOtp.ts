import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { SendOtpRequest } from '@/types/auth.types';

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (data: SendOtpRequest) => authApi.sendOtp(data),
  });
};
