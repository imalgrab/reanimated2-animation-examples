import React, {useCallback, useRef} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {width: SIZE} = Dimensions.get('window');
const IMG_SOURCE = '../../assets/shrimp.jpg';
const HEART_SOURCE = '../../assets/heart.png';

const DoubleTapGesture: React.FC = () => {
  const doubleTapRef = useRef();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);
  const fontSize = useSharedValue(24);

  const handleSingleTap = useCallback(() => {
    opacity.value = withTiming(0.2, undefined, isFinished => {
      if (isFinished) {
        opacity.value = withDelay(300, withTiming(1));
      }
    });
    fontSize.value = withSpring(32, undefined, isFinished => {
      if (isFinished) {
        fontSize.value = withDelay(300, withSpring(24));
      }
    });
  }, [opacity, fontSize]);

  const handleDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(300, withSpring(0));
      }
    });
  }, [scale]);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: Math.max(scale.value, 0)}],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      fontSize: fontSize.value,
    };
  });

  return (
    <SafeAreaView style={styles.flex1}>
      <View style={styles.container}>
        <TapGestureHandler waitFor={doubleTapRef} onActivated={handleSingleTap}>
          <TapGestureHandler
            maxDelayMs={300}
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={handleDoubleTap}>
            <Animated.View>
              <ImageBackground
                style={styles.image}
                source={require(IMG_SOURCE)}>
                <Animated.Image
                  resizeMode="center"
                  style={[styles.image, styles.imageShadow, animatedImageStyle]}
                  source={require(HEART_SOURCE)}
                />
              </ImageBackground>
              <Animated.Text style={[styles.label, animatedTextStyle]}>
                imalgrab
              </Animated.Text>
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  imageShadow: {
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.65,
    shadowRadius: 35,
    // elevation: 4,
  },
  label: {
    fontSize: 24,
    color: 'gray',
    marginVertical: 10,
    marginHorizontal: 5,
  },
});

export default DoubleTapGesture;
