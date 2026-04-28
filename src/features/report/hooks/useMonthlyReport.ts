import { useQuery } from '@tanstack/react-query';
import { reportApi } from '../api/report.api';

export const useMonthlyReport = (year: number, month: number) => {
  return useQuery({
    queryKey: ['report', 'monthly', year, month],
    queryFn: () => reportApi.getMonthlyReport(year, month),
    enabled: year > 0 && month > 0,
    staleTime: 1000 * 60 * 5,
  });
};
