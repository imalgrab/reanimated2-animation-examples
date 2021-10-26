import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SimpleAnimation from '../screens/SimpleAnimation';
import GestureHandler from '../screens/GestureHandler';
import InterpolateScrollView from '../screens/InterpolateScrollView';
import ColorsInterpolation from '../screens/ColorsInterpolation';
import PinchGesture from '../screens/PinchGesture';
import DoubleTapGesture from '../screens/DoubleTapGesture';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Simple animation" component={SimpleAnimation} />
      <Drawer.Screen name="Gesture handler" component={GestureHandler} />
      <Drawer.Screen
        name="Interpolate ScrollView"
        component={InterpolateScrollView}
      />
      <Drawer.Screen
        name="Colors interpolation"
        component={ColorsInterpolation}
      />
      <Drawer.Screen name="Pinch gesture" component={PinchGesture} />
      <Drawer.Screen name="Double tap gesture" component={DoubleTapGesture} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
