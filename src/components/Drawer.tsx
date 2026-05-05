import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppLogo } from '@/components/AppLogo';
import { tokenService } from '@/services/token.service';
import { useTheme } from '@/contexts/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.72;

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
  onGoalSetup: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  visible,
  onClose,
  onLogout,
  onGoalSetup,
}) => {
  const translateX = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { isDark, toggleTheme, colors } = useTheme();

  useEffect(() => {
    tokenService.getPhoneNumber().then((p) => {
      if (p) setPhoneNumber(p);
    });
  }, []);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          damping: 22,
          stiffness: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: DRAWER_WIDTH,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => setMounted(false));
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
      </TouchableWithoutFeedback>

      {/* Drawer panel */}
      <Animated.View style={[styles.drawer, { backgroundColor: colors.card, transform: [{ translateX }] }]}>
        <SafeAreaView style={styles.inner}>
          {/* Close button */}
          <TouchableOpacity style={[styles.closeBtn, { backgroundColor: colors.surface }]} onPress={onClose}>
            <Ionicons name="close" size={20} color={colors.text} />
          </TouchableOpacity>

          {/* Profile section */}
          <View style={styles.profileSection}>
            <AppLogo size="lg" />
            <View style={styles.appNameRow}>
              <Text style={[styles.appNameSpend, { color: colors.text }]}>Spend</Text>
              <Text style={[styles.appNameLog, { color: colors.primary }]}>Log</Text>
            </View>
            {phoneNumber ? (
              <Text style={[styles.phoneText, { color: colors.textSecondary }]}>{phoneNumber}</Text>
            ) : null}
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Dark mode toggle */}
          <TouchableOpacity style={[styles.menuRow, { backgroundColor: colors.surface }]} onPress={toggleTheme} activeOpacity={0.75}>
            <View style={styles.menuRowLeft}>
              <Ionicons
                name={isDark ? 'sunny-outline' : 'moon-outline'}
                size={20}
                color={colors.text}
              />
              <Text style={[styles.menuRowLabel, { color: colors.text }]}>
                {isDark ? 'Chế độ sáng' : 'Chế độ tối'}
              </Text>
            </View>
            <View style={[styles.toggleTrack, isDark && styles.toggleTrackOn]}>
              <View style={[styles.toggleThumb, isDark && styles.toggleThumbOn]} />
            </View>
          </TouchableOpacity>

          {/* Goal setup */}
          <TouchableOpacity style={[styles.menuRow, { backgroundColor: colors.surface }]} onPress={onGoalSetup} activeOpacity={0.75}>
            <View style={styles.menuRowLeft}>
              <Ionicons name="flag-outline" size={20} color={colors.text} />
              <Text style={[styles.menuRowLabel, { color: colors.text }]}>Điều chỉnh mục tiêu</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
          </TouchableOpacity>

          {/* Spacer */}
          <View style={{ flex: 1 }} />

          {/* Logout */}
          <TouchableOpacity style={[styles.logoutBtn, { backgroundColor: colors.surface }]} onPress={onLogout} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>Đăng xuất</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 999
  },

  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#111',
    shadowColor: '#000',
    shadowOffset: { width: -6, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 20,

    padding: 20,

    zIndex: 999
  },
  inner: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  closeBtn: {
    alignSelf: 'flex-end',
    marginTop: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileSection: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    gap: 8,
  },
  appNameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 4,
  },
  appNameSpend: {
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: -0.3,
  },
  appNameLog: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  phoneText: {
    fontSize: 13,
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginHorizontal: 4,
    marginBottom: 12,
  },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  logoutText: {
    color: '#FF4D4D',
    fontSize: 15,
    fontWeight: '600',
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuRowLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  toggleTrack: {
    width: 44,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#3A3A3C',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleTrackOn: {
    backgroundColor: '#6366F1',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  toggleThumbOn: {
    alignSelf: 'flex-end',
  },
});
