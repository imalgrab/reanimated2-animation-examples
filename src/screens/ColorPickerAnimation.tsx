import React from 'react';
import {View, StyleSheet} from 'react-native';
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

const BACKGROUND_COLOR = 'rgba(1,1,1,.9)';

interface ColorPickerAnimationProps {}

const ColorPickerAnimation: React.FC<ColorPickerAnimationProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}></View>

      <View style={styles.bottom}>
        <ColorPicker colors={COLORS} start={{x: 0, y: 0}} end={{x: 1, y: 0}} />
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
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
});
export default ColorPickerAnimation;
