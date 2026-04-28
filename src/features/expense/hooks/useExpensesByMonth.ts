import { useQuery } from '@tanstack/react-query';
import { expenseApi } from '../api/expense.api';

export const useExpensesByMonth = (year: number, month: number) => {
  return useQuery({
    queryKey:  ['expenses', year, month],
    queryFn:   () => expenseApi.getExpenses({ year, month, limit: 100 }),
    staleTime: 1000 * 60 * 5,
  });
};
