import React, { PropsWithChildren, useImperativeHandle } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
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
};

const BottomModal = React.forwardRef<
  BottomModalRef,
  PropsWithChildren<BottomModalProps>
>(({ height, backdropColor, style, easing, children, duration }, ref) => {
  const top = useSharedValue(screen.height);

  useImperativeHandle(ref, () => ({
    show: () => {
      top.value = screen.height - height;
    },
    dismiss: () => {
      top.value = screen.height;
    },
  }));

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startHeight: number }
  >({
    onStart: (_, context) => {
      context.startHeight = top.value;
    },
    onActive: (event, context) => {
      top.value = context.startHeight + event.translationY;
    },
    onEnd: () => {
      if (top.value > screen.height - height / 2) {
        top.value = screen.height;
      } else {
        top.value = screen.height - height;
      }
    },
  });

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    top: withTiming(top.value, {
      easing,
      duration,
    }),
  }));

  return (
    <View style={[styles.fullScreen, { backgroundColor: backdropColor }]}>
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
    position: 'absolute',
    width: screen.width,
    height: screen.height,
    justifyContent: 'center',
    alignItems: 'center',
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
