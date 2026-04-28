import { StyleSheet } from 'react-native';
import { SemanticColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  // ── Month navigator ───────────────────────────────────────────────────────
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  monthNavCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  monthNavBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthNavLabel: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
    minWidth: 110,
    textAlign: 'center',
  },

  // ── Year filter ───────────────────────────────────────────────────────────
  yearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  yearBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // ── Year picker modal ─────────────────────────────────────────────────────
  yearOverlay: {
    flex: 1,
    backgroundColor: SemanticColors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  yearDropdown: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 8,
    minWidth: 200,
    overflow: 'hidden',
  },
  yearDropdownTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  yearDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  yearDropdownItemText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // ── Scroll content ────────────────────────────────────────────────────────
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 12,
  },

  // ── Empty / loading states ────────────────────────────────────────────────
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
