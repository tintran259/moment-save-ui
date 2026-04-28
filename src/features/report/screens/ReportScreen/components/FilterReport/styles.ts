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
  }
});
