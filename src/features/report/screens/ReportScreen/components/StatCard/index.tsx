import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { styles } from './styles';

type AppColors = ReturnType<typeof useTheme>['colors'];

interface Props {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: string;
  colors: AppColors;
}

export const StatCard: React.FC<Props> = ({ icon, label, value, colors }) => (
  <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
    <Ionicons name={icon} size={20} color={colors.primary} style={styles.icon} />
    <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
    <Text style={[styles.label, { color: colors.textTertiary }]}>{label}</Text>
  </View>
);
