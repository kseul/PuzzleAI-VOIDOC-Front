import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainHome from 'screens/Main/MainHome';
import MainList from 'screens/Main/MainList';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MainHome"
        component={MainHome}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MainList"
        component={MainList}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Main;
