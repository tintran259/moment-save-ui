import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useWeather } from '@/features/weather/hooks/useWeather';
import { WeatherColors } from '@/constants/colors';
import type { WeatherCondition } from '@/types/weather.types';

const ICON_MAP: Record<
  WeatherCondition,
  { name: React.ComponentProps<typeof Ionicons>['name']; color: string }
> = {
  sunny:           { name: 'sunny-outline',        color: WeatherColors.sunny },
  'partly-cloudy': { name: 'partly-sunny-outline',  color: WeatherColors.partlyCloudy },
  cloudy:          { name: 'cloudy-outline',        color: WeatherColors.cloudy },
  rainy:           { name: 'rainy-outline',         color: WeatherColors.rainy },
  stormy:          { name: 'thunderstorm-outline',  color: WeatherColors.stormy },
};

export const WeatherPill: React.FC = () => {
  const { colors } = useTheme();
  const { temp, condition, city, isLoading, isError } = useWeather();

  const icon = condition ? ICON_MAP[condition] : null;

  return (
    <View style={[styles.pill, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {isLoading ? (
        <>
          <ActivityIndicator size={14} color={colors.textTertiary} />
          <Text style={[styles.city, { color: colors.textTertiary }]}>Đang tải...</Text>
        </>
      ) : isError || !icon ? (
        <>
          <Ionicons name="cloud-offline-outline" size={16} color={colors.textTertiary} />
          <Text style={[styles.city, { color: colors.textTertiary }]}>Không khả dụng</Text>
        </>
      ) : (
        <>
          <Ionicons name={icon.name} size={16} color={icon.color} />
          <Text style={[styles.temp, { color: colors.text }]}>{temp}°C</Text>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Text style={[styles.city, { color: colors.textSecondary }]}>{city}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  temp:    { fontSize: 14, fontWeight: '700', letterSpacing: -0.3 },
  divider: { width: 1, height: 12, borderRadius: 1 },
  city:    { fontSize: 13, fontWeight: '500' },
});
