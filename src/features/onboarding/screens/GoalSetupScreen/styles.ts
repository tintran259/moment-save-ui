import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    padding: 24,
    paddingTop: 60,
    gap: 24,
  },

  // Header
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#F3EFFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
  },

  // Cards
  cards: { gap: 12 },
  card: {
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  autoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  autoBadgeText: { fontSize: 10, fontWeight: '700' },
  resetBtn: { padding: 2 },

  // Input
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
    padding: 0,
  },
  inputUnit: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },

  // Calculated display
  calcDisplay: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    gap: 2,
  },
  calcValue: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  calcPeriod: {
    fontSize: 11,
    fontWeight: '400',
  },

  // Summary
  summary: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: 12,
    padding: 12,
  },
  summaryText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },

  // Actions
  actions: { gap: 12 },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 17,
  },
  saveBtnDisabled: { opacity: 0.45 },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  skipBtn: { alignItems: 'center', paddingVertical: 4 },
  skipText: { fontSize: 13, fontWeight: '500' },

  backBtn: {
    alignSelf: 'flex-start',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
