import { useQuery } from '@tanstack/react-query';
import { expenseApi } from '../api/expense.api';

export const useExpenses = () => {
  return useQuery({
    queryKey: ['expenses'],
    queryFn:  () => expenseApi.getExpenses({ limit: 500 }),
    staleTime: 1000 * 60 * 5,
  });
};
