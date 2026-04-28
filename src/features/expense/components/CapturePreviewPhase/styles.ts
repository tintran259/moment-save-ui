import { StyleSheet } from 'react-native';
import { CARD_MARGIN, CARD_WIDTH, CARD_HEIGHT, CARD_RADIUS } from '../../constants/captureLayout';

export const styles = StyleSheet.create({
  // ─── Photo card ────────────────────────────────────────────
  card: {
    alignSelf: 'center',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    backgroundColor: '#0A0A0A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 16,
    borderWidth: 1,
  },
  cardImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },

  // ─── Top controls ─────────────────────────────────────────
  topRow: {
    position: 'absolute',
    top: 14, left: 14, right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleBtn: {
    width: 38, height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.52)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBtnSaved: {
    backgroundColor: 'rgba(34,197,94,0.25)',
    borderColor: 'rgba(34,197,94,0.55)',
  },

  // ─── Timestamp overlay ────────────────────────────────────
  timestampOverlay: {
    position: 'absolute',
    bottom: 90, right: 16,
    alignItems: 'flex-end',
    gap: 2,
  },
  timestampLocation: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    maxWidth: 160,
  },
  timestampDate: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  timestampTime: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // ─── Amount pill ──────────────────────────────────────────
  amountPill: {
    position: 'absolute',
    bottom: 22,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.52)',
    borderRadius: 32,
    paddingHorizontal: 22,
    paddingVertical: 13,
    gap: 8,
    minWidth: 170,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  amountPillFilled: {
    backgroundColor: 'rgba(99,102,241,0.75)',
    borderColor: 'rgba(99,102,241,0.0)',
  },
  currencySign: { color: 'rgba(255,255,255,0.8)', fontSize: 17, fontWeight: '700' },
  amountInput: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    minWidth: 80,
    textAlign: 'center',
  },

  // ─── Action bar ───────────────────────────────────────────
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CARD_MARGIN + 20,
    paddingTop: 22,
    paddingBottom: 6,
  },
  sideActionBtn: {
    width: 58, height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  saveCircle: {
    width: 76, height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
  },
  saveCircleDisabled: { opacity: 0.6 },

  // ─── Loading label ────────────────────────────────────────
  loadingLabel: { fontSize: 13, textAlign: 'center', marginTop: 4 },
});
