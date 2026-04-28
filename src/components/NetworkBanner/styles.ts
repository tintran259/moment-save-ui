import { StyleSheet } from 'react-native';

export const BANNER_HEIGHT = 44;

export const OFFLINE_COLORS = {
  bg: '#1F1F1F',
  border: '#EF4444',
  icon: '#FCA5A5' as const,
  text: '#FCA5A5',
};

export const ONLINE_COLORS = {
  bg: '#1A2E22',
  border: '#22C55E',
  icon: '#4ADE80' as const,
  text: '#86EFAC',
};

export const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    zIndex: 9999,
    height: BANNER_HEIGHT,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
});
