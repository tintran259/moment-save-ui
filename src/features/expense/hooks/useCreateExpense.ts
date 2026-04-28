import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseApi } from '../api/expense.api';
import { CreateExpenseRequest } from '@/types/expense.types';

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateExpenseRequest) =>
      expenseApi.createExpense(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expense-months'] });
      queryClient.invalidateQueries({ queryKey: ['report', 'statistics'] });
      queryClient.invalidateQueries({ queryKey: ['report', 'monthly'] });
    },
  });
};
