import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    paddingVertical: 14,
  },
  currency: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  error: { fontSize: 12, marginTop: 4 },
});
