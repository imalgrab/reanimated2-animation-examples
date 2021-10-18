import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 100.0;

const handleRotation = (progress: Animated.SharedValue<number>) => {
  'worklet';
  return `${progress.value * 2 * Math.PI}rad`;
};

const SimpleAnimation: React.FC = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{scale: scale.value}, {rotate: handleRotation(progress)}],
    };
  });

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  }, [progress, scale]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.square, reanimatedStyle]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'blue',
  },
});

export default SimpleAnimation;
