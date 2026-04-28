import { apiClient } from '@/services/axios';
import { UserGoal } from '@/types/user.types';

interface GoalResponse {
  data: UserGoal | null;
  message: string;
}

export const userApi = {
  getGoal: () =>
    apiClient.get<GoalResponse>('/user/goal').then((r) => r.data.data),

  setGoal: (goal: UserGoal) =>
    apiClient.post<GoalResponse>('/user/goal', goal).then((r) => r.data.data),
};
