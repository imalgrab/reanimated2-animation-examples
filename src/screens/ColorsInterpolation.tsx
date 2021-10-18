import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const COLORS = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    background: '#F8F8F8',
    circle: '#FFFFFF',
    text: '#1E1E1E',
  },
};

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256,0,256,.2)',
  false: 'rgba(0,0,0,0,1)',
};

const SIZE = Dimensions.get('window').width * 0.7;

type Theme = 'light' | 'dark';

const ColorsInterpolation = () => {
  const [theme, setTheme] = useState<Theme>('light');

  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const reanimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.background, COLORS.dark.background],
    );

    return {
      backgroundColor,
    };
  });

  const reanimatedCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.circle, COLORS.dark.circle],
    );
    return {
      backgroundColor,
    };
  });

  const reanimatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.text, COLORS.dark.text],
    );
    return {
      color,
    };
  });

  return (
    <SafeAreaView style={styles.flex1}>
      <Animated.View style={[styles.container, reanimatedStyle]}>
        <Animated.View style={[styles.circle, reanimatedCircleStyle]}>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggled => {
              setTheme(toggled ? 'dark' : 'light');
            }}
            trackColor={SWITCH_TRACK_COLOR}
          />
          <Animated.View>
            <Animated.Text style={[styles.label, reanimatedTextStyle]}>
              {theme === 'dark' ? 'Light' : 'Dark'} mode
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 8,
  },
  label: {
    fontSize: 17,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginTop: 35,
  },
});

export default ColorsInterpolation;
