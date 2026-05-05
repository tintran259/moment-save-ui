import { StyleSheet } from 'react-native';
import { SemanticColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  // ── Outer wrapper ─────────────────────────────────────────────────────────
  wrapper: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },

  // ── Section header ────────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  exceededChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SemanticColors.dangerBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  exceededChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: SemanticColors.danger,
  },
  safeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SemanticColors.successBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  safeChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: SemanticColors.success,
  },

  // ── Cards list ────────────────────────────────────────────────────────────
  cardsWrapper: {
    gap: 8,
  },

  // ── Period card ───────────────────────────────────────────────────────────
  periodCard: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 7,
  },
  periodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  periodLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  periodLabel: {
    fontSize: 11,
    fontWeight: '600',
  },

  // ── Percentage pill ───────────────────────────────────────────────────────
  pctPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  pctText: {
    fontSize: 10,
    fontWeight: '700',
  },

  // ── Hero amount ───────────────────────────────────────────────────────────
  heroAmount: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 24,
  },
  heroUnit: {
    fontSize: 12,
    fontWeight: '500',
  },

  // ── Progress bar ──────────────────────────────────────────────────────────
  track: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
    minWidth: 4,
  },

  // ── Insight line ──────────────────────────────────────────────────────────
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  insightText: {
    fontSize: 11,
    fontWeight: '400',
    flexShrink: 1,
  },
  insightBold: {
    fontWeight: '700',
  },

  // ── Today hero ────────────────────────────────────────────────────────────
  todaySection: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 6,
  },
  todayLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  todayLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  todayAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todayHeroAmount: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  todayHeroUnit: {
    fontSize: 13,
    fontWeight: '500',
  },
  todayTrack: {
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  todayFill: {
    height: '100%',
    borderRadius: 2,
    minWidth: 4,
  },

  // ── No-goal empty banner ──────────────────────────────────────────────────
  emptyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  emptyIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  emptySub: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
});
