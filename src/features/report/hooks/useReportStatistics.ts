import { useQuery } from '@tanstack/react-query';
import { reportApi } from '../api/report.api';

export const useReportStatistics = () => {
  return useQuery({
    queryKey: ['report', 'statistics'],
    queryFn: reportApi.getStatistics,
    staleTime: 1000 * 60 * 2,
  });
};
