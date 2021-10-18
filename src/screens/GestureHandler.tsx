import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

type PositionContext = {
  translateX: number;
  translateY: number;
};

const SIZE = 100.0;
const CIRCLE_RADIUS = 2 * SIZE - 10;

const GestureHandler = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PositionContext
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance > CIRCLE_RADIUS - SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.circle}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.square, reanimatedStyle]} />
          </PanGestureHandler>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256,0.5)',
    borderRadius: 20,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 2 * CIRCLE_RADIUS,
    width: 2 * CIRCLE_RADIUS,
    borderRadius: CIRCLE_RADIUS,
    borderColor: 'rgba(0,0,256,0.5)',
    borderWidth: 5,
  },
  label: {
    fontSize: 24,
    color: 'rgba(0,0,256,0.5)',
  },
});

export default GestureHandler;
