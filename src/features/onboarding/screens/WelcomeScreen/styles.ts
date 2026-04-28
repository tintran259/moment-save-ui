import { Dimensions, StyleSheet } from 'react-native';

const { height: SCREEN_H } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: SCREEN_H * 0.10,
    paddingBottom: 48,
    justifyContent: 'space-between',
  },

  // Decorative
  circle: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#fff',
  },
  circleTop:    { top: -160, right: -120 },
  circleBottom: { bottom: -200, left: -100 },

  // Logo
  logoBlock: { alignItems: 'flex-start', gap: 12 },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },

  // Tagline
  titleBlock: { gap: 6 },
  tagline: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.8,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.70)',
    lineHeight: 20,
    marginTop: 8,
  },

  // Features
  features: { gap: 16 },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: { flex: 1 },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  featureDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.60)',
    marginTop: 1,
  },

  // CTA
  ctaBlock: { gap: 14 },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 17,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6366F1',
  },
  terms: {
    textAlign: 'center',
    fontSize: 11,
    color: 'rgba(255,255,255,0.50)',
  },
  termsLink: {
    textDecorationLine: 'underline',
    color: 'rgba(255,255,255,0.70)',
  },
});
