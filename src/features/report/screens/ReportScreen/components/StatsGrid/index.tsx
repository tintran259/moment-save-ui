import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useMonthlyReport } from '@/features/report/hooks/useMonthlyReport';
import { formatCompact } from '@/utils/format';
import { StatCard } from '../StatCard';
import { styles } from './styles';
import { MonthlyReport } from '@/features/report/api/report.api';

interface Props {
  report: MonthlyReport | undefined;
}

export const StatsGrid: React.FC<Props> = ({ report }) => {
  const { colors } = useTheme();

  const totalAmount = report?.totalAmount ?? 0;
  const txCount = report?.totalCount ?? 0;
  const dayCount = report?.dailyGroups.length ?? 0;
  const avgPerDay = Math.round(totalAmount / Math.max(1, dayCount));

  return (
    <View style={styles.grid}>
      <StatCard icon="calculator-outline" label="Trung bình/ngày" value={`${formatCompact(avgPerDay)} ₫`} colors={colors} />
      <StatCard icon="receipt-outline" label="Giao dịch" value={`${txCount} lần`} colors={colors} />
      <StatCard icon="calendar-outline" label="Ngày chi tiêu" value={`${dayCount} ngày`} colors={colors} />
    </View>
  );
};
