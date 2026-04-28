import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');

const CARD_PADDING = 14;
const BAR_DAY_W   = 48;
const BAR_AMT_W   = 40;

export const BAR_MAX_W   = SCREEN_W - 16 - CARD_PADDING * 2 - BAR_DAY_W - BAR_AMT_W - 16;
export const MAX_BARS    = 7;
export const N_BAR_ANIMS = 7;

export const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: CARD_PADDING,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 14,
  },
  barList: {
    gap: 10,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  barDayLabel: {
    width: BAR_DAY_W,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'left',
  },
  barTrack: {
    flex: 1,
    height: 28,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  barFill: {
    height: '100%',
    borderRadius: 8,
    minWidth: 4,
  },
  barAmount: {
    width: BAR_AMT_W,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
  },
  emptyChart: {
    textAlign: 'center',
    fontSize: 13,
    paddingVertical: 20,
  },
});
