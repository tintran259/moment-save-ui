import { Dimensions, StyleSheet } from 'react-native';
import { SemanticColors } from '@/constants/colors';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_W = SCREEN_W - 32;                   // matches parent padding
const IMAGE_H = 180;

export const styles = StyleSheet.create({
  // ── Outer card ──────────────────────────────────────────────────────────────
  card: {
    borderRadius: 20,
    overflow: 'hidden',
  },

  // ── Hero image area ─────────────────────────────────────────────────────────
  imageWrap: {
    width: '100%',
    height: IMAGE_H,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // Gradient scrim over image (bottom → transparent)
  scrim: {
    ...StyleSheet.absoluteFillObject,
  },

  // ── Badge "Chi tiêu cao nhất" — floats top-left ────────────────────────────
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  // ── Bottom info row (sits on gradient scrim) ───────────────────────────────
  infoRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  amount: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#FFFFFF',
    textShadowColor: SemanticColors.overlay,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  unit: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.85)',
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
