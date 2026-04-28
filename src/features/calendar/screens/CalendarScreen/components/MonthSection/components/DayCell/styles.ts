import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4,
  },
  photo: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    borderWidth: 2,
    borderRadius: 10,
  },
  photoBack: {
    transform: [{ translateX: 3 }, { translateY: 3 }, { rotate: '5deg' }],
  },
  photoFront: {
    transform: [{ rotate: '-1.5deg' }],
  },
  // Skeleton overlay that sits on top of the front photo while it loads
  skeletonOverlay: {
    zIndex: 2,
    borderWidth: 0,
  },
  badge: {
    position: 'absolute',
    top: 1,
    right: 1,
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    zIndex: 3,
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '700' },
});
