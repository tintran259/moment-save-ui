import { useMemo } from 'react';

interface Expense {
  amount: number;
  expenseDate: string; // YYYY-MM-DD
}

export interface Statistics {
  todayTotal:  number;
  monthTotal:  number;
  yearTotal:   number;
  todayCount:  number;
  monthCount:  number;
  yearCount:   number;
}

/**
 * Computes daily / monthly / yearly spending totals from an expense list.
 * Pass real API data when available — currently used with mock data.
 */
export function useStatistics(expenses: Expense[]): Statistics {
  return useMemo(() => {
    const now      = new Date();
    const todayStr = now.toISOString().split('T')[0];          // "2026-04-24"
    const monthStr = todayStr.substring(0, 7);                 // "2026-04"
    const yearStr  = String(now.getFullYear());                 // "2026"

    let todayTotal = 0, monthTotal = 0, yearTotal = 0;
    let todayCount = 0, monthCount = 0, yearCount = 0;

    for (const exp of expenses) {
      if (exp.expenseDate === todayStr) {
        todayTotal += exp.amount;
        todayCount++;
      }
      if (exp.expenseDate.startsWith(monthStr)) {
        monthTotal += exp.amount;
        monthCount++;
      }
      if (exp.expenseDate.startsWith(yearStr)) {
        yearTotal += exp.amount;
        yearCount++;
      }
    }

    return { todayTotal, monthTotal, yearTotal, todayCount, monthCount, yearCount };
  }, [expenses]);
}
