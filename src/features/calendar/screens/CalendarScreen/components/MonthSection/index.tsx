import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Expense } from '@/types/expense.types';
import { useExpensesByMonth } from '@/features/expense/hooks/useExpensesByMonth';
import { DayCell } from './components/DayCell';
import { styles } from './styles';

function buildRows(year: number, month: number): (number | null)[][] {
  const firstDow    = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const flat: (number | null)[] = Array(firstDow).fill(null);
  for (let d = 1; d <= daysInMonth; d++) flat.push(d);
  while (flat.length % 7 !== 0) flat.push(null);
  const rows: (number | null)[][] = [];
  for (let i = 0; i < flat.length; i += 7) rows.push(flat.slice(i, i + 7));
  return rows;
}

interface MonthSectionProps {
  year:       number;
  month:      number;
  /** Called when user taps a day that has expenses */
  onDayPress: (expenses: Expense[], startIndex: number) => void;
}

export const MonthSection: React.FC<MonthSectionProps> = ({ year, month, onDayPress }) => {
  const { colors, isDark } = useTheme();
  const { data, isLoading } = useExpensesByMonth(year, month);

  const rows = useMemo(() => buildRows(year, month), [year, month]);

  const { dayMap, totalAmount, sortedExpenses } = useMemo(() => {
    const items  = data?.items ?? [];
    const map    = new Map<number, Expense[]>();

    for (const exp of items) {
      const d = parseInt(exp.expenseDate.split('-')[2], 10);
      if (!map.has(d)) map.set(d, []);
      map.get(d)!.push(exp);
    }

    const total  = items.reduce((s, e) => s + e.amount, 0);
    const sorted = [...items].sort((a, b) => a.expenseDate.localeCompare(b.expenseDate));

    return { dayMap: map, totalAmount: total, sortedExpenses: sorted };
  }, [data]);

  const handleDayPress = (day: number) => {
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const idx     = sortedExpenses.findIndex(e => e.expenseDate === dateKey);
    if (idx !== -1) onDayPress(sortedExpenses, idx);
  };

  const totalStr  = totalAmount.toLocaleString('vi-VN') + ' ₫';
  const label     = `tháng ${month} ${year}`;
  const skeletonBg = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)';

  return (
    <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        {isLoading ? (
          <>
            <View style={[styles.skeletonLabel, { backgroundColor: skeletonBg }]} />
            <View style={[styles.skeletonTotal, { backgroundColor: skeletonBg }]} />
          </>
        ) : (
          <>
            <Text style={[styles.monthLabel, { color: colors.text }]}>{label}</Text>
            <Text style={[styles.totalLabel, { color: colors.textTertiary }]}>{totalStr}</Text>
          </>
        )}
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        {rows.map((row, ri) => (
          <View key={ri} style={styles.row}>
            {row.map((day, ci) =>
              isLoading ? (
                <View key={ci} style={styles.skeletonCell}>
                  {day !== null && (
                    <View style={[styles.skeletonPhoto, { backgroundColor: skeletonBg }]} />
                  )}
                </View>
              ) : (
                <DayCell
                  key={ci}
                  day={day}
                  expenses={day !== null ? (dayMap.get(day) ?? []) : []}
                  onPress={() => day !== null && handleDayPress(day)}
                />
              ),
            )}
          </View>
        ))}
      </View>
    </View>
  );
};
