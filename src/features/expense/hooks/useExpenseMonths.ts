import { useQuery } from '@tanstack/react-query';
import { expenseApi } from '../api/expense.api';

export const useExpenseMonths = () => {
  return useQuery({
    queryKey: ['expense-months'],
    queryFn: expenseApi.getAvailableMonths,
    staleTime: 1000 * 60 * 5,
  });
};
