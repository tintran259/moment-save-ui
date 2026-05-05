import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useGoal } from '@/contexts/GoalContext';
import { useReportStatistics } from '@/features/report/hooks/useReportStatistics';
import { MonthlyReport } from '@/features/report/api/report.api';
import { getGoalLimits, spentPercent, goalStatus, STATUS_COLORS } from '@/utils/calculateGoal';
import { formatCompact } from '@/utils/format';
import { styles } from './styles';

interface Props {
  report: MonthlyReport | undefined;
  year: number;
}

interface PeriodCardProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  spent: number;
  limit: number;
  anim: Animated.Value;
}

const PeriodCard: React.FC<PeriodCardProps> = ({ icon, label, spent, limit, anim }) => {
  const { colors } = useTheme();

  const pct        = spentPercent(spent, limit);
  const status     = goalStatus(pct);
  const color      = STATUS_COLORS[status];
  const exceeded   = status === 'exceeded';
  const warning    = status === 'warning';
  const overAmount = spent - limit;
  const remaining  = limit - spent;

  const barW = anim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });

  const heroColor    = exceeded ? color : warning ? color : colors.text;
  const insightColor = exceeded ? color : warning ? color : colors.textTertiary;

  return (
    <View style={[
      styles.periodCard,
      {
        backgroundColor: colors.surface,
        borderColor: exceeded ? color + '50' : warning ? color + '30' : colors.border,
      },
    ]}>
      <View style={styles.periodHeader}>
        <View style={styles.periodLabelRow}>
          <Ionicons name={icon} size={12} color={colors.textTertiary} />
          <Text style={[styles.periodLabel, { color: colors.textSecondary }]}>{label}</Text>
        </View>
        <View style={[styles.pctPill, { backgroundColor: exceeded ? color : color + '1A' }]}>
          {exceeded && (
            <Ionicons name="warning" size={9} color="#fff" style={{ marginRight: 2 }} />
          )}
          <Text style={[styles.pctText, { color: exceeded ? '#fff' : color }]}>
            {Math.min(Math.round(pct), 999)}%
          </Text>
        </View>
      </View>

      <Text style={[styles.heroAmount, { color: heroColor }]}>
        {formatCompact(spent)}<Text style={styles.heroUnit}> ₫</Text>
      </Text>

      <View style={[styles.track, { backgroundColor: colors.border }]}>
        <Animated.View style={[styles.fill, { width: barW, backgroundColor: color }]} />
      </View>

      <View style={styles.insightRow}>
        {exceeded ? (
          <>
            <Ionicons name="trending-up-outline" size={12} color={color} />
            <Text style={[styles.insightText, { color: insightColor }]}>
              Vượt <Text style={styles.insightBold}>{formatCompact(overAmount)} ₫</Text>
              {' '}· mục tiêu {formatCompact(limit)} ₫
            </Text>
          </>
        ) : (
          <Text style={[styles.insightText, { color: insightColor }]}>
            Còn lại{' '}
            <Text style={[styles.insightBold, { color: insightColor }]}>
              {formatCompact(remaining)} ₫
            </Text>
            {' '}· mục tiêu {formatCompact(limit)} ₫
          </Text>
        )}
      </View>
    </View>
  );
};

export const GoalTracker: React.FC<Props> = ({ report, year }) => {
  const { colors } = useTheme();
  const { goal }   = useGoal();
  const router     = useRouter();
  const { data: stats } = useReportStatistics();

  const monthAnim = useRef(new Animated.Value(0)).current;
  const yearAnim  = useRef(new Animated.Value(0)).current;

  const monthTotal = report?.totalAmount ?? 0;
  const yearTotal  = stats?.yearTotal ?? 0;

  useEffect(() => {
    if (!goal) return;
    const { monthly, yearly } = getGoalLimits(goal.sourceField, goal.sourceValue);

    const mPct = Math.min(spentPercent(monthTotal, monthly), 100);
    const yPct = Math.min(spentPercent(yearTotal,  yearly),  100);

    monthAnim.setValue(0);
    yearAnim.setValue(0);
    Animated.stagger(90, [
      Animated.spring(monthAnim, { toValue: mPct, damping: 20, stiffness: 110, useNativeDriver: false }),
      Animated.spring(yearAnim,  { toValue: yPct, damping: 20, stiffness: 110, useNativeDriver: false }),
    ]).start();
  }, [goal, monthTotal, yearTotal]);

  // ── No goal state ─────────────────────────────────────────────────────────
  if (!goal) {
    return (
      <TouchableOpacity
        style={[styles.emptyBanner, { backgroundColor: colors.primaryLight, borderColor: colors.primary + '33' }]}
        onPress={() => router.push('/(onboarding)/goal-setup')}
        activeOpacity={0.85}
      >
        <View style={[styles.emptyIconWrap, { backgroundColor: colors.primary + '22' }]}>
          <Ionicons name="flag-outline" size={18} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.emptyTitle, { color: colors.primary }]}>Chưa có mục tiêu</Text>
          <Text style={[styles.emptySub, { color: colors.primary + 'BB' }]}>
            Thiết lập để theo dõi chi tiêu
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.primary + '88'} />
      </TouchableOpacity>
    );
  }

  const limits = getGoalLimits(goal.sourceField, goal.sourceValue);

  const anyExceeded =
    spentPercent(monthTotal, limits.monthly) >= 100 ||
    spentPercent(yearTotal,  limits.yearly)  >= 100;

  const rows = [
    { icon: 'calendar-outline'    as const, label: 'Tháng này', spent: monthTotal, limit: limits.monthly, anim: monthAnim },
    { icon: 'stats-chart-outline' as const, label: `Năm ${year || new Date().getFullYear()}`, spent: yearTotal, limit: limits.yearly, anim: yearAnim },
  ];

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {/* ── Section header ────────────────────────────────────────────────── */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Mục tiêu chi tiêu</Text>
        {anyExceeded ? (
          <View style={styles.exceededChip}>
            <Ionicons name="warning" size={11} color="#EF4444" />
            <Text style={styles.exceededChipText}>Đã vượt mức</Text>
          </View>
        ) : (
          <View style={styles.safeChip}>
            <Ionicons name="checkmark-circle" size={11} color="#10B981" />
            <Text style={styles.safeChipText}>Đang kiểm soát</Text>
          </View>
        )}
      </View>

      {/* ── Month + Year cards ────────────────────────────────────────────── */}
      <View style={styles.cardsWrapper}>
        {rows.map(row => (
          <PeriodCard key={row.label} {...row} />
        ))}
      </View>
    </View>
  );
};
