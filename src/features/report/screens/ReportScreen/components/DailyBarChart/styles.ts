import { StyleSheet } from 'react-native';

export const BAR_COL_W  = 32;
export const BAR_W      = 14;
export const BAR_MAX_H  = 100;
export const N_DAYS_MAX = 31;

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
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 2,
  },
  col: {
    width: BAR_COL_W,
    alignItems: 'center',
  },
  barArea: {
    height: BAR_MAX_H,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  bar: {
    width: BAR_W,
    borderRadius: 4,
  },
  barFloor: {
    width: BAR_W,
    height: 2,
    borderRadius: 1,
  },
  dayLabel: {
    fontSize: 9,
    fontWeight: '500',
    marginTop: 4,
  },
  emptyChart: {
    textAlign: 'center',
    fontSize: 13,
    paddingVertical: 20,
  },
});
