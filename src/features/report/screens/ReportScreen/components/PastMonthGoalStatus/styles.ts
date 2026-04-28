import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  monthChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  monthChipText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Result highlight box ─────────────────────────────────────────────────────
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    padding: 14,
  },
  resultIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  resultAmount: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  resultPct: {
    fontSize: 15,
    fontWeight: '700',
  },

  // ── Progress bar ─────────────────────────────────────────────────────────────
  trackWrap: {
    paddingHorizontal: 2,
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
    minWidth: 4,
  },

  // ── Spent / Limit / Diff stats ───────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  sep: {
    width: 1,
    height: 28,
  },

  // ── Motivational footer ──────────────────────────────────────────────────────
  footer: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 17,
    textAlign: 'center',
  },
});
