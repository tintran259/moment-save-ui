import { MonthMeta } from '@/types/expense.types';
import { MonthlyReport } from '../../api/report.api';

export interface DayData {
  day:       number;
  dateLabel: string;
  count:     number;
  total:     number;
}

export interface MonthGroup {
  monthKey:    string;
  year:        number;
  month:       number;
  label:       string;
  fullLabel:   string;
  totalAmount: number;
  txCount:     number;
  dayData:     DayData[];
}

/** Converts a MonthMeta + MonthlyReport API response into the MonthGroup shape the screen uses. */
export function buildGroupFromReport(
  meta:   MonthMeta,
  report: MonthlyReport,
): MonthGroup {
  const { year, month } = meta;
  const monthKey = `${year}-${String(month).padStart(2, '0')}`;

  const dayData: DayData[] = report.dailyGroups.map(g => ({
    day:       parseInt(g.date.split('-')[2], 10),
    dateLabel: `${g.date.split('-')[2]}/${String(month).padStart(2, '0')}`,
    count:     g.count,
    total:     g.total,
  }));

  return {
    monthKey,
    year,
    month,
    label:       `Th${month}`,
    fullLabel:   `Tháng ${month} · ${year}`,
    totalAmount: report.totalAmount,
    txCount:     report.totalCount,
    dayData,
  };
}
