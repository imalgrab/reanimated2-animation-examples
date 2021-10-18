import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const IMG_SOURCE = '../../assets/shrimp.jpg';

export default function PinchGesture() {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        //transforming to be in the focal point
        {translateX: -width / 2},
        {translateY: -height / 2},
        //centering the image around the focal point
        {scale: scale.value},
        //scaling
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        //moving back to the original postition of focal point
        {translateX: width / 2},
        {translateY: height / 2},
        //centering around the focal point after scaling
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: focalX.value}, {translateY: focalY.value}],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={styles.flex1}>
          <Animated.Image
            style={[styles.image, rStyle]}
            source={require(IMG_SOURCE)}
          />
          <Animated.View style={[styles.focalPoint, focalPointStyle]} />
        </Animated.View>
      </PinchGestureHandler>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width,
    height,
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
