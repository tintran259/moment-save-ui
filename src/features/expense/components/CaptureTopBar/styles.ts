import { StyleSheet } from 'react-native';
import { CARD_MARGIN } from '../../constants/captureLayout';

export const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CARD_MARGIN,
    paddingTop: 8,
    paddingBottom: 12,
  },
  pill: {
    width: 44,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  centerText: { fontSize: 14, fontWeight: '600' },
});
