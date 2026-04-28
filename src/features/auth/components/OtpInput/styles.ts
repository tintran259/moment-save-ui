import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { marginBottom: 28 },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  box: {
    width: 48,
    height: 58,
    borderWidth: 2,
    borderRadius: 14,
    fontSize: 24,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
});
