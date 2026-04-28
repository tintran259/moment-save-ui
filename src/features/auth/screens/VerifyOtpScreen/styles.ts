import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  toggleWrapper: {
    position: 'absolute',
    top: 52,
    right: 24,
    zIndex: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40,
  },
  header: { marginBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  phone: { fontWeight: '600' },
  button: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendLabel: { fontSize: 14 },
  countdown: { fontSize: 14 },
  resendLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  resendError: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },
});
