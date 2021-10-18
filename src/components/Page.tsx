import React from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface PageProps {
  translateX: Animated.SharedValue<number>;
  title: string;
  index: number;
}

const {width, height} = Dimensions.get('window');
const SIZE = width * 0.7;

const Page: React.FC<PageProps> = ({title, index, translateX}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const reanimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
      borderRadius,
      opacity,
    };
  });

  const reanimatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height, 0, -height],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-1, 1, -1],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY}],
      opacity,
    };
  });

  return (
    <View
      key={index}
      style={{...styles.page, backgroundColor: `rgba(0,0,256,0.${index + 2})`}}>
      <Animated.View key={index} style={[styles.square, reanimatedStyle]}>
        <Animated.View style={[styles.labelWrapper, reanimatedTextStyle]}>
          <Text style={styles.label}>{title}</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrapper: {
    position: 'absolute',
  },
  label: {
    fontSize: 70,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page;
