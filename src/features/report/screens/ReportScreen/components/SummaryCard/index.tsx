import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useGoal } from '@/contexts/GoalContext';
import { MonthlyReport } from '@/features/report/api/report.api';
import { getGoalLimits, spentPercent, goalStatus } from '@/utils/calculateGoal';
import { formatCompact } from '@/utils/format';
import { SemanticColors } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  year:   number;
  month:  number;
  report: MonthlyReport | undefined;
}

export const SummaryCard: React.FC<Props> = ({ year, month, report }) => {
  const { colors } = useTheme();
  const { goal }   = useGoal();
  const heroAnim   = useRef(new Animated.Value(0)).current;
  const barAnim    = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  const now            = new Date();
  const isCurrentMonth = year === now.getFullYear() && month === (now.getMonth() + 1);
  const todayStr       = now.toLocaleDateString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' });
  const todayTotal     = report?.dailyGroups.find(g => g.date === todayStr)?.total ?? 0;
  const heroValue      = isCurrentMonth ? todayTotal : (report?.totalAmount ?? 0);

  useEffect(() => {
    const id = heroAnim.addListener(({ value }) => setDisplayValue(Math.round(value)));
    return () => heroAnim.removeListener(id);
  }, []);

  useEffect(() => {
    if (report == null) return;
    heroAnim.setValue(0);
    Animated.timing(heroAnim, { toValue: heroValue, duration: 900, useNativeDriver: false }).start();
  }, [heroValue]);

  const dailyLimitForBar = goal && isCurrentMonth
    ? getGoalLimits(goal.sourceField, goal.sourceValue).daily
    : 0;
  const barPctValue = Math.min(spentPercent(todayTotal, dailyLimitForBar), 100);

  useEffect(() => {
    if (!goal || dailyLimitForBar === 0) return;
    barAnim.setValue(0);
    Animated.spring(barAnim, { toValue: barPctValue, damping: 18, stiffness: 100, useNativeDriver: false }).start();
  }, [todayTotal, goal]);

  const changePercent = !isCurrentMonth && report && report.previousMonthTotal > 0
    ? Math.round(((report.totalAmount - report.previousMonthTotal) / report.previousMonthTotal) * 100)
    : null;

  const formattedValue = displayValue.toString().length > 9
    ? formatCompact(displayValue)
    : displayValue.toLocaleString('vi-VN');

  // ── Current month: today only ─────────────────────────────────────────────
  if (isCurrentMonth) {
    const todayDate   = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' });
    const dailyLimit  = dailyLimitForBar;
    const todayPct    = spentPercent(todayTotal, dailyLimit);
    const todayStatus = goalStatus(todayPct);
    const exceeded    = todayStatus === 'exceeded';
    const overAmount  = todayTotal - dailyLimit;
    const remaining   = dailyLimit - todayTotal;

    const barColor = exceeded ? SemanticColors.danger
      : todayStatus === 'warning' ? SemanticColors.warning
      : SemanticColors.success;

    const barW = barAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });

    return (
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {/* ── Header ────────────────────────────────────────────────────── */}
        <View style={styles.todayHeaderRow}>
          <View style={styles.todayLabelGroup}>
            <Ionicons name="sunny-outline" size={13} color={colors.textTertiary} />
            <Text style={[styles.cardLabel, { color: colors.textTertiary, marginBottom: 0 }]}>Hôm nay</Text>
          </View>
          <Text style={[styles.todayDateText, { color: colors.textTertiary }]}>{todayDate}</Text>
        </View>

        {/* ── Hero amount ───────────────────────────────────────────────── */}
        <Text style={[styles.totalAmount, { color: colors.text, marginTop: 8 }]}>
          {todayTotal > 0 ? formattedValue : '—'}
          {todayTotal > 0 && (
            <Text style={[styles.totalCurrency, { color: colors.textSecondary }]}> ₫</Text>
          )}
        </Text>

        {/* ── Progress bar (only with goal + spending) ──────────────────── */}
        {goal && dailyLimit > 0 && todayTotal > 0 && (
          <View style={[styles.progressTrack, { backgroundColor: colors.border, marginTop: 10 }]}>
            <Animated.View style={[styles.progressFill, { width: barW, backgroundColor: barColor }]} />
          </View>
        )}

        {/* ── Status banner ─────────────────────────────────────────────── */}
        {goal && todayTotal > 0 && (
          <View style={[
            styles.statusBanner,
            { backgroundColor: exceeded ? SemanticColors.dangerBg : SemanticColors.successBg },
          ]}>
            <Ionicons
              name={exceeded ? 'warning-outline' : 'checkmark-circle-outline'}
              size={14}
              color={exceeded ? SemanticColors.danger : SemanticColors.success}
            />
            <Text style={[styles.statusBannerText, { color: exceeded ? SemanticColors.danger : SemanticColors.success }]}>
              {exceeded
                ? `Vượt ${formatCompact(overAmount)} ₫ · mục tiêu ${formatCompact(dailyLimit)} ₫`
                : `Đang kiểm soát · còn lại ${formatCompact(remaining)} ₫`}
            </Text>
          </View>
        )}

        {/* ── Empty state ───────────────────────────────────────────────── */}
        {todayTotal === 0 && (
          <Text style={[styles.emptyDay, { color: colors.textTertiary }]}>
            Chưa có khoản chi nào hôm nay
          </Text>
        )}
      </View>
    );
  }

  // ── Past month: monthly total ─────────────────────────────────────────────
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.cardLabel, { color: colors.textTertiary }]}>
        Tháng {String(month).padStart(2, '0')} · {year}
      </Text>

      <View style={styles.summaryRow}>
        <Text style={[styles.totalAmount, { color: colors.text }]}>
          {formattedValue}
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
    </View>
  );
};
