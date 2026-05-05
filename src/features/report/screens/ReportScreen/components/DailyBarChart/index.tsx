import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useGoal } from '@/contexts/GoalContext';
import { MonthlyReport } from '@/features/report/api/report.api';
import { getGoalLimits } from '@/utils/calculateGoal';
import { SemanticColors } from '@/constants/colors';
import { styles, BAR_MAX_H, N_DAYS_MAX } from './styles';

interface Props {
  report: MonthlyReport | undefined;
  year: number;
  month: number;
}

export const DailyBarChart: React.FC<Props> = ({ report, year, month }) => {
  const { colors, isDark } = useTheme();
  const { goal } = useGoal();

  const barAnims = useRef(
    Array.from({ length: N_DAYS_MAX }, () => new Animated.Value(0)),
  ).current;

  const dailyLimit = goal ? getGoalLimits(goal.sourceField, goal.sourceValue).daily : 0;

  const daysInMonth = year > 0 && month > 0 ? new Date(year, month, 0).getDate() : 0;
  const dailyMap = new Map((report?.dailyGroups ?? []).map(g => [g.date, g.total]));

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const d = i + 1;
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return { day: d, date: dateStr, total: dailyMap.get(dateStr) ?? 0 };
  });

  const maxTotal = Math.max(...days.map(d => d.total), 1);
  const todayStr = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' });

  useEffect(() => {
    if (daysInMonth === 0) return;
    barAnims.forEach(b => b.setValue(0));
    const animations = days.map((d, i) => {
      const ratio = d.total > 0
        ? goal && dailyLimit > 0
          ? Math.min(d.total / dailyLimit, 1.2)
          : d.total / maxTotal
        : 0;
      return Animated.spring(barAnims[i], {
        toValue: ratio * BAR_MAX_H,
        damping: 16,
        stiffness: 120,
        useNativeDriver: false,
      });
    });
    Animated.stagger(25, animations).start();
  }, [report?.dailyGroups, year, month]);

  const getBarColor = (total: number): string => {
    if (total === 0) return 'transparent';
    if (goal && dailyLimit > 0) {
      const pct = total / dailyLimit;
      if (pct >= 1)   return SemanticColors.danger;
      if (pct >= 0.8) return SemanticColors.warning;
      return SemanticColors.success;
    }
    return isDark ? 'rgba(167,139,250,0.85)' : 'rgba(124,58,237,0.85)';
  };

  if (daysInMonth === 0) return null;

  const hasData = days.some(d => d.total > 0);

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Chi tiêu theo ngày</Text>

      {hasData ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true}
          directionalLockEnabled={true}
          bounces={false}
        >
          {days.map((d, i) => {
            const isToday = d.date === todayStr;
            const barColor = getBarColor(d.total);

            return (
              <View key={d.date} style={styles.col}>
                <View style={styles.barArea}>
                  {d.total > 0 ? (
                    <Animated.View
                      style={[styles.bar, { height: barAnims[i], backgroundColor: barColor }]}
                    />
                  ) : (
                    <View style={[styles.barFloor, { backgroundColor: colors.border }]} />
                  )}
                </View>
                <Text
                  style={[
                    styles.dayLabel,
                    {
                      color: isToday ? colors.primary : colors.textTertiary,
                      fontWeight: isToday ? '700' : '500',
                    },
                  ]}
                >
                  {String(d.day).padStart(2, '0')}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <Text style={[styles.emptyChart, { color: colors.textTertiary }]}>
          Không có dữ liệu trong tháng này.
        </Text>
      )}
    </View>
  );
};
