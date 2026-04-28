import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { authApi } from '../api/auth.api';
import { tokenService } from '@/services/token.service';
import { goalService } from '@/services/goal.service';
import { userApi } from '@/features/user/api/user.api';
import { useGoal } from '@/contexts/GoalContext';
import { VerifyOtpRequest } from '@/types/auth.types';

export const useVerifyOtp = () => {
  const router = useRouter();
  const { saveGoal } = useGoal();

  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => authApi.verifyOtp(data),
    onSuccess: async (response, variables) => {
      await Promise.all([
        tokenService.saveTokens(
          response.data.accessToken,
          response.data.refreshToken,
        ),
        tokenService.savePhoneNumber(variables.phoneNumber),
      ]);

      try {
        const goal = await userApi.getGoal();
        if (goal) {
          await saveGoal(goal);
          router.replace('/(protected)');
        } else {
          await goalService.clearGoal();
          router.replace('/(onboarding)/goal-setup');
        }
      } catch {
        // getGoal failed — still route correctly; treat as no goal
        await goalService.clearGoal();
        router.replace('/(onboarding)/goal-setup');
      }
    },
  });
};
