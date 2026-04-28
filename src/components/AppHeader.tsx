import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { Drawer } from '@/components/Drawer';
import { WeatherPill } from '@/components/WeatherPill';

const CARD_MARGIN = 18;

export const AppHeader: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { colors } = useTheme();
  const { logout } = useLogout();
  const router = useRouter();

  return (
    <>
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <WeatherPill />

        <TouchableOpacity
          style={[styles.menuBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => setDrawerOpen(true)}
        >
          <Ionicons name="menu" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Drawer
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onLogout={() => {
          setDrawerOpen(false);
          logout();
        }}
        onGoalSetup={() => {
          setDrawerOpen(false);
          router.push('/(onboarding)/goal-setup');
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CARD_MARGIN,
    paddingTop: 8,
    paddingBottom: 12,
  },
  menuBtn: {
    width: 44,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
