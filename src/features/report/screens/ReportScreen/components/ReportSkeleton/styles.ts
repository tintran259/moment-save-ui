import { StyleSheet } from 'react-native';

const CARD_PADDING = 14;
const BAR_DAY_W   = 48;
const BAR_AMT_W   = 40;

export const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 12,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: CARD_PADDING,
    gap: 10,
  },
  line: {
    borderRadius: 6,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  barLabel: {
    width: BAR_DAY_W,
    height: 14,
    borderRadius: 6,
  },
  barTrack: {
    flex: 1,
    height: 28,
    borderRadius: 8,
  },
  barAmt: {
    width: BAR_AMT_W,
    height: 14,
    borderRadius: 6,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    height: 72,
    borderRadius: 14,
  },
});
