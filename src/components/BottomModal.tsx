import React, { PropsWithChildren, useImperativeHandle } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
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
   *
   */
  backdropColor?: string;

  /**
   * Style of modal's container
   */
  style?: ViewStyle;

  /**
   * Easing function which modal will be presented
   * @default Easing.cubic
   */
  easing?: Animated.EasingFunction;

  /**
   * Modal animation's duration in milliseconds
   * @default 350
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

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    top: withTiming(top.value, {
      easing,
      duration,
    }),
  }));

  return (
    <View style={[styles.fullScreen, { backgroundColor: backdropColor }]}>
      <Animated.View style={[styles.container, style, containerAnimatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
});

BottomModal.defaultProps = { duration: 350, easing: Easing.cubic };

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
    borderTopWidth: 2,

    borderTopColor: 'black',
  },
});

export default BottomModal;
