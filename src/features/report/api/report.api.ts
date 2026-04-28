import { apiClient } from '@/services/axios';
import { ApiResponse } from '@/types/auth.types';
import { Expense } from '@/types/expense.types';

export interface DailyGroup {
  date:  string;
  total: number;
  count: number;
}

export interface MonthlyReport {
  month:               number;
  year:                number;
  totalAmount:         number;
  totalCount:          number;
  previousMonthTotal:  number;
  topExpense:          Expense | null;
  dailyGroups:         DailyGroup[];
}

export interface ReportStatistics {
  todayTotal:  number;
  todayCount:  number;
  monthTotal:  number;
  monthCount:  number;
  yearTotal:   number;
  yearCount:   number;
}

export const reportApi = {
  getMonthlyReport: async (year: number, month: number): Promise<MonthlyReport> => {
    const { data } = await apiClient.get<ApiResponse<MonthlyReport>>('/reports/monthly', {
      params: { year, month },
    });
    return data.data;
  },

  getStatistics: async (): Promise<ReportStatistics> => {
    const { data } = await apiClient.get<ApiResponse<ReportStatistics>>('/reports/statistics');
    return data.data;
  },
};
