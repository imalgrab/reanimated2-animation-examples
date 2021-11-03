import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';
import ColorPicker from '../components/ColorPicker';

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

const {width} = Dimensions.get('window');

const CIRCLE_SIZE = width * 0.8;

type Color = string | number;

const parseColorToHex = (color: Color) => {
  'worklet';
  if (typeof color === 'number') {
    return `#${color.toString(16).substr(2)}`;
  }
  return color;
};

interface ColorPickerAnimationProps {}

const ColorPickerAnimation: React.FC<ColorPickerAnimationProps> = () => {
  const pickedColor = useSharedValue<Color>(COLORS[0]);
  const [colorName, setColorName] = useState<Color>(COLORS[0]);
  const [fontColor, setFontColor] = useState<Color>('#000');

  const handleBrightnessChange = (color: Color) => {
    const hexColor = parseColorToHex(color);
    const rgbColor = parseInt(hexColor.substr(1), 16);
    const red = (rgbColor >> 16) & 0xff;
    const green = (rgbColor >> 8) & 0xff;
    const blue = (rgbColor >> 0) & 0xff;

    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
    setFontColor(brightness > 125 ? '#000' : '#fff');
  };

  const handleColorChange = useWorkletCallback((color: Color) => {
    pickedColor.value = color;
    runOnJS(setColorName)(parseColorToHex(color));
    runOnJS(handleBrightnessChange)(color);
  }, []);

  const handleColorNameTap =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: () => {},
      onActive: () => {},
      onEnd: () => {},
    });

  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });

  const labelAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });

  const labelTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: fontColor,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Animated.View style={[styles.circle, circleAnimatedStyle]} />
        <Animated.View style={[styles.colorLabel, labelAnimatedStyle]}>
          <TapGestureHandler onGestureEvent={handleColorNameTap}>
            <Animated.Text style={[styles.colorText, labelTextAnimatedStyle]}>
              {colorName}
            </Animated.Text>
          </TapGestureHandler>
        </Animated.View>
      </View>

      <View style={styles.bottom}>
        <ColorPicker
          colors={COLORS}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          onColorChanged={handleColorChange}
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
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 8,
  },
  colorLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingTop: 10,
  },
  colorText: {
    fontSize: 24,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});
export default ColorPickerAnimation;
