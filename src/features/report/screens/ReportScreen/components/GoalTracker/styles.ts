import { Dimensions, StyleSheet } from 'react-native';
import { SemanticColors } from '@/constants/colors';

const { width: SCREEN_W } = Dimensions.get('window');
export const GOAL_TRACK_W = SCREEN_W - 32 - 28;

export const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 14,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  exceedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SemanticColors.dangerBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  exceedText: {
    fontSize: 11,
    fontWeight: '700',
    color: SemanticColors.danger,
  },
  goalRows: { gap: 16 },
  goalRow: { gap: 6 },
  goalRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goalRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  goalRowLabel: { fontSize: 13, fontWeight: '600' },
  goalRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  goalSpent: { fontSize: 12, fontWeight: '700' },
  goalLimit: { fontSize: 12, fontWeight: '400' },
  pctBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  pctText: { fontSize: 10, fontWeight: '700' },
  goalTrack: {
    width: GOAL_TRACK_W,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  goalFill: {
    height: '100%',
    borderRadius: 3,
    minWidth: 4,
  },
  goalWarning: {
    fontSize: 11,
    fontWeight: '500',
  },

  // ── Result summary row ────────────────────────────────────────────────────
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  resultText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // ── No-goal banner ────────────────────────────────────────────────────────
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  bannerSub: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});
