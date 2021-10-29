import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';
import ColorPicker from '../components/ColorPicker';

const {width} = Dimensions.get('window');

const CIRCLE_SIZE = width * 0.8;

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'white',
  'black',
];

const BACKGROUND_COLOR = 'rgba(1,1,1,.6)';

interface ColorPickerAnimationProps {}

const ColorPickerAnimation: React.FC<ColorPickerAnimationProps> = () => {
  const pickedColor = useSharedValue<string | number>(COLORS[0]);

  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });

  const handleColorChanged = useWorkletCallback((color: string | number) => {
    pickedColor.value = color;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Animated.View style={[styles.circle, circleAnimatedStyle]} />
      </View>

      <View style={styles.bottom}>
        <ColorPicker
          colors={COLORS}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          onColorChanged={handleColorChanged}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  top: {
    flex: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.1,
    elevation: 8,
  },
});
export default ColorPickerAnimation;
