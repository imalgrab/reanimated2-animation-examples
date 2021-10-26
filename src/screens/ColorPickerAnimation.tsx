import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ColorPickerAnimationProps {}

const ColorPickerAnimation: React.FC<ColorPickerAnimationProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Color picker animation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ColorPickerAnimation;
