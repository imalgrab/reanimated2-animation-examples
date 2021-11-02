import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  useWorkletCallback,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const COLOR_PICKER_WIDTH = 0.9 * width;
const CIRCLE_PICKER_SIZE = 45;
const INNER_CIRCLE_SIZE = 35;

const MAX_WIDTH = COLOR_PICKER_WIDTH - CIRCLE_PICKER_SIZE;

type PositionContext = {
  translateX: number;
  translateY: number;
};

interface ColorPickerProps extends LinearGradientProps {
  colors: string[];
  onColorChanged: (color: string | number) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  start,
  end,
  onColorChanged,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value, 0), MAX_WIDTH);
  });

  const pickerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: adjustedTranslateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  });

  const innerPickerAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = colors.map(
      (_, index) => (index / colors.length) * COLOR_PICKER_WIDTH,
    );
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      colors,
    );

    onColorChanged(backgroundColor);

    return {
      backgroundColor,
    };
  });

  const onEnd = useWorkletCallback(() => {
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
  }, [scale, translateY]);

  const handleTap = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: event => {
      translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
      scale.value = withSpring(1.2);
      translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE);
    },
    onEnd,
  });

  const handleDrag = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PositionContext
  >({
    onStart: (_, context) => {
      context.translateX = adjustedTranslateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
    },
    onEnd,
  });

  return (
    <TapGestureHandler onGestureEvent={handleTap}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={handleDrag}>
          <Animated.View style={styles.container}>
            <LinearGradient
              style={styles.gradient}
              colors={colors}
              start={start}
              end={end}
            />
            <Animated.View style={[styles.picker, pickerAnimatedStyle]}>
              <Animated.View
                style={[styles.innerPicker, innerPickerAnimatedStyle]}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  gradient: {
    width: COLOR_PICKER_WIDTH,
    height: 40,
    borderRadius: 20,
  },
  picker: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerPicker: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.2)',
    width: INNER_CIRCLE_SIZE,
    height: INNER_CIRCLE_SIZE,
    borderRadius: INNER_CIRCLE_SIZE / 2,
  },
});
export default ColorPicker;
