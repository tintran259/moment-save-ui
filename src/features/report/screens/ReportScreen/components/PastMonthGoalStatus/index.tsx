import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useGoal } from '@/contexts/GoalContext';
import { MonthlyReport } from '@/features/report/api/report.api';
import { getGoalLimits, spentPercent } from '@/utils/calculateGoal';
import { formatCompact } from '@/utils/format';
import { SemanticColors } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  report: MonthlyReport | undefined;
  year:   number;
  month:  number;
}

export const PastMonthGoalStatus: React.FC<Props> = ({ report, year, month }) => {
  const { colors } = useTheme();
  const { goal }   = useGoal();
  const barAnim    = useRef(new Animated.Value(0)).current;

  const monthTotal = report?.totalAmount ?? 0;

  useEffect(() => {
    if (!goal || !report) return;
    barAnim.setValue(0);
    Animated.spring(barAnim, { toValue: 1, damping: 18, stiffness: 120, useNativeDriver: false }).start();
  }, [goal, report]);

  if (!goal) return null;

  const limits    = getGoalLimits(goal.sourceField, goal.sourceValue, new Date(year, month - 1, 1));
  const rawPct    = spentPercent(monthTotal, limits.monthly);
  const clampedPct = Math.min(rawPct, 100);
  const saved      = monthTotal <= limits.monthly;
  const diff       = Math.abs(monthTotal - limits.monthly);

  const accent   = saved ? SemanticColors.success : SemanticColors.danger;
  const accentBg = saved ? SemanticColors.successBg : SemanticColors.dangerBg;
  const icon: React.ComponentProps<typeof Ionicons>['name'] = saved ? 'trophy-outline' : 'trending-up-outline';

  const barWidth = barAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: ['0%', `${clampedPct}%`],
  });

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Kết quả chi tiêu</Text>
        <View style={[styles.monthChip, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.monthChipText, { color: colors.primary }]}>
            T{String(month).padStart(2, '0')} · {year}
          </Text>
        </View>
      </View>

      {/* Result highlight */}
      <View style={[styles.resultBox, { backgroundColor: accentBg }]}>
        <View style={styles.resultIconWrap}>
          <Ionicons name={icon} size={22} color={accent} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.resultLabel, { color: accent }]}>
            {saved ? 'Tháng này tiết kiệm được' : 'Tháng này đã vượt mức'}
          </Text>
          <Text style={[styles.resultAmount, { color: accent }]}>
            {formatCompact(diff)} ₫
          </Text>
        </View>
        <Text style={[styles.resultPct, { color: accent }]}>
          {Math.round(rawPct)}%
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.trackWrap}>
        <View style={[styles.track, { backgroundColor: colors.border }]}>
          <Animated.View style={[styles.fill, { width: barWidth, backgroundColor: accent }]} />
        </View>
      </View>

      {/* Spent / Limit row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Đã chi</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {formatCompact(monthTotal)} ₫
          </Text>
        </View>
        <View style={[styles.sep, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Mục tiêu</Text>
          <Text style={[styles.statValue, { color: colors.textSecondary }]}>
            {formatCompact(limits.monthly)} ₫
          </Text>
        </View>
        <View style={[styles.sep, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
            {saved ? 'Tiết kiệm' : 'Vượt mức'}
          </Text>
          <Text style={[styles.statValue, { color: accent }]}>
            {formatCompact(diff)} ₫
          </Text>
        </View>
      </View>

      {/* Motivational footer */}
      <Text style={[styles.footer, { color: colors.textTertiary }]}>
        {saved
          ? `Tốt lắm! Bạn đã kiểm soát chi tiêu rất tốt tháng ${String(month).padStart(2, '0')}.`
          : `Đừng nản! Tháng tới hãy cố gắng giữ trong mức ${formatCompact(limits.monthly)} ₫ nhé.`}
      </Text>
    </View>
  );
};
