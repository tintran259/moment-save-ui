import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
  },
  totalCurrency: {
    fontSize: 18,
    fontWeight: '500',
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 10,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  txInfo: {
    fontSize: 12,
    fontWeight: '400',
  },

  // ── Today header ──────────────────────────────────────────────────────────
  todayHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todayLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  todayDateText: {
    fontSize: 12,
    fontWeight: '500',
  },

  // ── Progress bar ──────────────────────────────────────────────────────────
  progressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    minWidth: 4,
  },

  // ── Status banner ─────────────────────────────────────────────────────────
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 8,
  },
  statusBannerText: {
    fontSize: 12,
    fontWeight: '600',
    flexShrink: 1,
  },

  // ── Empty state ───────────────────────────────────────────────────────────
  emptyDay: {
    fontSize: 13,
    fontWeight: '400',
    marginTop: 6,
  },

  // ── Legacy (kept for safety) ──────────────────────────────────────────────
  todayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  todayLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  todaySeparator: {
    fontSize: 12,
  },
  todayAmount: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
