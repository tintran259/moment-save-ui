import React from 'react';
import { Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MonthlyReport } from '@/features/report/api/report.api';
import { formatCompact } from '@/utils/format';
import { SemanticColors } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  report: MonthlyReport | undefined;
}

export const TopExpenseCard: React.FC<Props> = ({ report }) => {
  const topExpense = report?.topExpense;
  if (!topExpense) return null;

  const [, m, d] = topExpense.expenseDate.split('-');

  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: topExpense.imageUrl }} style={styles.image} resizeMode="cover" />

        <View style={[styles.scrim, { backgroundColor: 'transparent' }]}>
          <View style={{ flex: 1, backgroundColor: SemanticColors.scrimTop }} />
          <View style={{ flex: 1, backgroundColor: SemanticColors.scrimBottom }} />
        </View>

        <View style={[styles.badge, { backgroundColor: SemanticColors.dangerOverlay }]}>
          <Ionicons name="flame" size={12} color="#FFF" />
          <Text style={[styles.badgeText, { color: '#FFF' }]}>Chi tiêu cao nhất</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.amount}>
            {topExpense.amount.toString().length > 10
              ? formatCompact(topExpense.amount)
              : topExpense.amount.toLocaleString('vi-VN')}
            <Text style={styles.unit}> ₫</Text>
          </Text>
          <View style={styles.dateBadge}>
            <Ionicons name="calendar-outline" size={12} color="#FFF" />
            <Text style={styles.dateText}>{d}/{m}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
