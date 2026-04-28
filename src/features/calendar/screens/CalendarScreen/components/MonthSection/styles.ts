import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  section: {
    borderRadius: 18,
    borderWidth: 1,
    paddingTop: 14,
    paddingBottom: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  monthLabel: { fontSize: 16, fontWeight: '700' },
  totalLabel: { fontSize: 12, fontWeight: '500' },
  grid: { flexDirection: 'column' },
  row:  { flexDirection: 'row' },

  // ── Skeleton ─────────────────────────────────────────────────────────────
  skeletonLabel: {
    height: 16,
    width: 110,
    borderRadius: 8,
  },
  skeletonTotal: {
    height: 12,
    width: 72,
    borderRadius: 6,
  },
  skeletonCell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  skeletonPhoto: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    borderRadius: 10,
  },
});
