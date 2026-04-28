import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flex: { flex: 1 },

  // ─── Header ────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 54,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 40, height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: '700', letterSpacing: -0.3 },
  headerSpacer: { width: 40 },

  // ─── Step 1 — Photo picker ─────────────────────────────────
  pickerBody: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 14,
  },

  // Placeholder area
  placeholderCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    minHeight: 220,
  },
  placeholderIconRing: {
    width: 80, height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  placeholderSub: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 32,
  },

  // Action buttons
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    borderRadius: 16,
    paddingVertical: 16,
  },
  actionBtnPrimary: {
    // bg comes from colors.primary
  },
  actionBtnSecondary: {
    borderWidth: 1.5,
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
  actionBtnTextPrimary: { color: '#fff' },

  // ─── Step 2 — Form ─────────────────────────────────────────
  formScroll: { flex: 1 },
  formContent: { paddingBottom: 48 },

  // Photo preview
  photoWrapper: {
    height: 240,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  photoImage: { width: '100%', height: '100%' },
  photoChangeOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.48)',
  },
  photoChangeTxt: { color: '#fff', fontSize: 13, fontWeight: '600' },

  // Form card
  formCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 14,
  },

  // Field row
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 14,
  },
  fieldDivider: {
    height: 1,
    marginLeft: 52,
  },
  fieldIconWrap: {
    width: 34, height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldBody: { flex: 1 },
  fieldLabel: { fontSize: 12, fontWeight: '500', marginBottom: 3, letterSpacing: 0.2 },
  fieldValue: { fontSize: 16, fontWeight: '600' },
  fieldValueLarge: { fontSize: 22, fontWeight: '700', letterSpacing: -0.5 },
  fieldPlaceholder: { fontSize: 15 },

  // Amount input
  amountInput: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
    padding: 0,
    flex: 1,
  },
  amountCurrency: { fontSize: 18, fontWeight: '700' },

  // Note input
  noteInput: {
    fontSize: 15,
    padding: 0,
    flex: 1,
    minHeight: 22,
    textAlignVertical: 'top',
  },

  // Submit
  submitBtn: {
    marginHorizontal: 20,
    borderRadius: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
  submitBtnDisabled: { opacity: 0.6 },
  submitBtnText: { color: '#fff', fontSize: 17, fontWeight: '700', letterSpacing: -0.2 },
});
