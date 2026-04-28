import { useRef } from 'react';
import { PanResponder } from 'react-native';
import { useRouter } from 'expo-router';

const MIN_DISTANCE = 50;
const MIN_VELOCITY = 0.25;

/**
 * Returns PanResponder handlers for horizontal swipe navigation.
 * leftRoute  — navigate here when user swipes LEFT  (dx < 0, finger → left)
 * rightRoute — navigate here when user swipes RIGHT (dx > 0, finger → right)
 */
export const useSwipeNavigation = (
  leftRoute?: string,
  rightRoute?: string,
) => {
  const router = useRouter();

  // Refs so the closure inside PanResponder always sees the latest props
  const leftRef  = useRef(leftRoute);
  const rightRef = useRef(rightRoute);
  leftRef.current  = leftRoute;
  rightRef.current = rightRoute;

  const panResponder = useRef(
    PanResponder.create({
      // Only capture gesture when it is clearly more horizontal than vertical
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > Math.abs(dy) * 1.8 && Math.abs(dx) > 10,

      onPanResponderRelease: (_, { dx, vx }) => {
        const speed = Math.abs(vx);
        if (dx < -MIN_DISTANCE && speed > MIN_VELOCITY && leftRef.current) {
          router.replace(leftRef.current as never);
        } else if (dx > MIN_DISTANCE && speed > MIN_VELOCITY && rightRef.current) {
          router.replace(rightRef.current as never);
        }
      },
    }),
  ).current;

  if (!leftRoute && !rightRoute) return undefined;
  return panResponder.panHandlers;
};
