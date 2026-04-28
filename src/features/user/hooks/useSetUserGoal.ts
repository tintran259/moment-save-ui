import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api/user.api';
import { goalService } from '@/services/goal.service';
import { useGoal } from '@/contexts/GoalContext';
import { UserGoal } from '@/types/user.types';

export const useSetUserGoal = () => {
  const queryClient = useQueryClient();
  const { saveGoal } = useGoal();

  return useMutation({
    mutationFn: (goal: UserGoal) => userApi.setGoal(goal),
    onSuccess: async (data) => {
      if (!data) return;
      // Save to AsyncStorage cache + update context
      await saveGoal(data);
      queryClient.invalidateQueries({ queryKey: ['user-goal'] });
    },
  });
};
