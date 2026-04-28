import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { CARD_MARGIN } from '@/features/expense/constants/captureLayout';

type TabKey = 'calendar' | 'home' | 'report';

const TABS: { key: TabKey; icon: string; iconActive: string; route: string }[] = [
  { key: 'calendar', icon: 'calendar-outline',   iconActive: 'calendar',       route: '/(protected)/calendar' },
  { key: 'home',     icon: 'home-outline',        iconActive: 'home',           route: '/(protected)'          },
  { key: 'report',   icon: 'stats-chart-outline', iconActive: 'stats-chart',    route: '/(protected)/report'   },
];

export const AppFooter: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { colors, isDark } = useTheme();

  const activeKey: TabKey = pathname.includes('calendar')
    ? 'calendar'
    : pathname.includes('report')
    ? 'report'
    : 'home';

  const activeColor  = isDark ? '#fff' : colors.primary;
  const activeBg     = isDark ? 'rgba(255,255,255,0.12)' : colors.primaryLight;
  const inactiveColor = colors.textTertiary;

  return (
    <View style={styles.wrapper}>
      <View style={[
        styles.bar,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: isDark ? '#000' : '#6366F1',
        },
      ]}>
        {TABS.map(({ key, icon, iconActive, route }) => {
          const isActive = activeKey === key;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.item, isActive && [styles.itemActive, { backgroundColor: activeBg }]]}
              onPress={() => { if (!isActive) router.replace(route as never); }}
              activeOpacity={0.7}
            >
              <Ionicons
                name={(isActive ? iconActive : icon) as never}
                size={22}
                color={isActive ? activeColor : inactiveColor}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 100,
    paddingBottom: 12,
    paddingTop: 4,
    opacity:0.8
  },
  bar: {
    flexDirection: 'row',
    borderRadius: 22,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  itemActive: {
    paddingHorizontal: 18,
  },
});
