import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');

export const PEEK         = 28;
export const CARD_W       = SCREEN_W - PEEK * 2;
export const THUMB_BOX    = 72;
export const THUMB_GAP    = 6;
export const THUMB_STRIDE = THUMB_BOX + THUMB_GAP;

// Padding that puts item-0's centre exactly at SCREEN_W/2
// so scrollX = idx * THUMB_STRIDE always centres item idx
export const THUMB_H_PAD = Math.round(SCREEN_W / 2 - THUMB_BOX / 2 - THUMB_GAP / 2);

export const styles = StyleSheet.create({
  viewerRoot: { zIndex: 9999 },
  // kept for compat; new background uses bgBase + bgOverlay
  backdrop:  { backgroundColor: '#111' },
  bgBase:    { backgroundColor: '#0a0a0a' },
  bgOverlay: { backgroundColor: 'rgba(0,0,0,0.55)' },
  container: { flex: 1 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconBtn:   { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  closeIcon: { color: '#fff', fontSize: 18, fontWeight: '600' },
  dateBlock: { alignItems: 'center' },
  yearText:  { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '400' },
  dayText:   { color: '#fff', fontSize: 16, fontWeight: '700' },

  photoList: {
    paddingHorizontal: PEEK,
  },
  photoPage: {
    width: CARD_W,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  photoCard: {
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
    marginHorizontal: 12,
  },

  // Wrapper that constrains absoluteFill skeleton to photo area only
  photoContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  photo: { width: '100%', height: '100%' },

  // Pulsing skeleton that covers the photo area while loading
  photoSkeleton: {
    backgroundColor: '#2A2A2A',
  },

  captionWrapper: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
    gap: 6,
  },
  captionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  captionAmount: { color: '#fff', fontSize: 17, fontWeight: '700', letterSpacing: 0.2 },
  captionDate:   { color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: '400' },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '400',
    flexShrink: 1,
  },

  thumbStrip: {
    paddingHorizontal: THUMB_H_PAD,
    paddingVertical: 10,
    alignItems: 'center',
  },
  thumbBox: {
    width: THUMB_BOX,
    height: THUMB_BOX,
    borderRadius: 14,
    overflow: 'hidden',
    marginHorizontal: THUMB_GAP / 2,
  },
  thumbImg:    { width: '100%', height: '100%' },
  thumbBorder: { borderRadius: 14, borderWidth: 2.5, borderColor: '#fff' },

  backBtn: {
    alignSelf: 'flex-start',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
