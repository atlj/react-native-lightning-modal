import React, {
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
} from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { screen } from '../utils';

export type BottomModalProps = {
  /**
   * Height of modal's presented state. This is required for animation to behave correctly
   */
  height: number;

  /**
   * Basically the color of a fullscreen view displayed below modal
   * @example rgba(255,255,255,0.8)
   */
  backdropColor?: string;

  /**
   * Style of modal's container
   */
  style?: ViewStyle;

  /**
   * Easing function which modal will be presented.
   * Since this also affects the time between user pressing the button and seeing the effect, a faster kind of curve function is recommended.
   * @default Easing.quad
   */
  easing?: Animated.EasingFunction;

  /**
   * Modal animation's duration in milliseconds.
   * Since this also affects the time between user pressing the button and seeing the effect, a smaler number is recommended.
   * @default 300
   */
  duration?: number;
};

export type BottomModalRef = {
  /**
   * Shows modal
   */
  show: () => void;

  /**
   * Hides modal
   */
  dismiss: () => void;

  /**
   * true if modal is visible
   */
  isActive: boolean;
};

const BottomModal = React.forwardRef<
  BottomModalRef,
  PropsWithChildren<BottomModalProps>
>(({ height, backdropColor, style, easing, children, duration }, ref) => {
  const top = useSharedValue(screen.height);

  //Animates top value
  const updateTop = useCallback(
    (value: number) => {
      'worklet';
      return withTiming(value, {
        easing,
        duration,
      });
    },
    [easing, duration]
  );

  const isActive = useDerivedValue<boolean>(() => {
    if (top.value > screen.height - 10) {
      return false;
    } else {
      return true;
    }
  }, [top]);

  useImperativeHandle(ref, () => ({
    show: () => {
      top.value = updateTop(screen.height - height);
    },
    dismiss: () => {
      top.value = updateTop(screen.height);
    },
    isActive: isActive.value,
  }));

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startHeight: number }
  >({
    onStart: (_, context) => {
      context.startHeight = top.value;
    },
    onActive: (event, context) => {
      //Prevent modal to go up more than it should
      if (
        context.startHeight + event.translationY >
        screen.height - height - 50
      ) {
        top.value = context.startHeight + event.translationY;
      }
    },
    onEnd: () => {
      //Determine if modal should close or go back to its original height
      if (top.value > screen.height - height / 2) {
        top.value = updateTop(screen.height);
      } else {
        top.value = updateTop(screen.height - height);
      }
    },
  });

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    top: top.value,
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    //Less opaque if top value is larger, vice verca
    opacity: interpolate(
      top.value,
      [screen.height - height, screen.height],
      [1, 0]
    ),
    //don't show backdrop component if modal is not present, as it cancels any touch events
    top: isActive.value ? 0 : screen.height,
  }));

  return (
    <View style={styles.fullScreen}>
      <Animated.View
        style={[
          styles.backdrop,
          { backgroundColor: backdropColor },
          backdropAnimatedStyle,
        ]}
      />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[styles.container, style, containerAnimatedStyle]}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
});

BottomModal.defaultProps = { duration: 300, easing: Easing.quad };

const styles = StyleSheet.create({
  fullScreen: {
    height: screen.height,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    height: screen.height,
    width: screen.width,
  },
  container: {
    width: screen.width,
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default BottomModal;
