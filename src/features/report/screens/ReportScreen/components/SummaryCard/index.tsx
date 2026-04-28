import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { MonthlyReport } from '@/features/report/api/report.api';
import { formatCompact } from '@/utils/format';
import { SemanticColors } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  year:   number;
  month:  number;
  report: MonthlyReport | undefined;
}

export const SummaryCard: React.FC<Props> = ({ year, month, report }) => {
  const { colors }  = useTheme();
  const totalAnim   = useRef(new Animated.Value(0)).current;
  const [displayTotal, setDisplayTotal] = useState(0);

  useEffect(() => {
    const id = totalAnim.addListener(({ value }) => setDisplayTotal(Math.round(value)));
    return () => totalAnim.removeListener(id);
  }, []);

  useEffect(() => {
    if (report == null) return;
    totalAnim.setValue(0);
    Animated.timing(totalAnim, {
      toValue:         report.totalAmount,
      duration:        900,
      useNativeDriver: false,
    }).start();
  }, [report?.totalAmount]);

  const changePercent = report && report.previousMonthTotal > 0
    ? Math.round(((report.totalAmount - report.previousMonthTotal) / report.previousMonthTotal) * 100)
    : null;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.cardLabel, { color: colors.textTertiary }]}>
        Tháng {String(month).padStart(2, '0')} · {year}
      </Text>

      <View style={styles.summaryRow}>
        <Text style={[styles.totalAmount, { color: colors.text }]}>
          {displayTotal.toString().length > 9
            ? formatCompact(displayTotal)
            : displayTotal.toLocaleString('vi-VN')}
          <Text style={[styles.totalCurrency, { color: colors.textSecondary }]}> ₫</Text>
        </Text>

        {changePercent !== null && (
          <View style={[
            styles.changeBadge,
            { backgroundColor: changePercent > 0 ? SemanticColors.dangerBg : SemanticColors.successBg },
          ]}>
            <Ionicons
              name={changePercent > 0 ? 'arrow-up' : 'arrow-down'}
              size={11}
              color={changePercent > 0 ? SemanticColors.danger : SemanticColors.success}
            />
            <Text style={[styles.changeText, { color: changePercent > 0 ? SemanticColors.danger : SemanticColors.success }]}>
              {Math.abs(changePercent)}%
            </Text>
          </View>
        )}
      </View>

      <Text style={[styles.txInfo, { color: colors.textTertiary }]}>
        {report?.totalCount ?? 0} giao dịch · {report?.dailyGroups.length ?? 0} ngày
      </Text>
    </View>
  );
};
