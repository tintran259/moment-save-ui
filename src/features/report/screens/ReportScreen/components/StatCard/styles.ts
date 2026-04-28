import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    width: (SCREEN_W - 32 - 20) / 3,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 4,
  },
  icon: {
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  label: {
    fontSize: 11,
    fontWeight: '400',
  },
});
