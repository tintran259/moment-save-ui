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
});
