import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { styles } from './styles';

type AppColors = ReturnType<typeof useTheme>['colors'];

interface Props {
  colors: AppColors;
}

export const NoGoalBanner: React.FC<Props> = ({ colors }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.banner, { backgroundColor: colors.primaryLight, borderColor: colors.primary + '44' }]}
      onPress={() => router.push('/(onboarding)/goal-setup')}
      activeOpacity={0.8}
    >
      <Ionicons name="flag-outline" size={18} color={colors.primary} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: colors.primary }]}>Chưa có mục tiêu chi tiêu</Text>
        <Text style={[styles.sub, { color: colors.primary }]}>Nhấn để thiết lập ngay →</Text>
      </View>
    </TouchableOpacity>
  );
};
