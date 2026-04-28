import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  title: { fontSize: 13, fontWeight: '700' },
  sub: { fontSize: 12, fontWeight: '400', marginTop: 2, opacity: 0.75 },
});
