import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from '../components/Page';

const WORDS = ['Hello', 'World', 'and', 'Mars'];

// const {width} = Dimensions.get('window');

const InterpolateScrollView: React.FC = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <SafeAreaView style={styles.wrapper}>
      <Animated.ScrollView
        pagingEnabled
        horizontal
        // decelerationRate="fast"
        // snapToAlignment="center"
        // snapToInterval={width}

        /*
        more configurable but in this case pagingEnabled is enough
        because elements are the same width as ScrollView
        */
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
        {WORDS.map((title, index) => {
          return (
            <Page
              key={index}
              title={title}
              index={index}
              translateX={translateX}
            />
          );
        })}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
});

export default InterpolateScrollView;
