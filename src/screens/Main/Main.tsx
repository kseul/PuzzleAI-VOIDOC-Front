import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import MainHome from 'screens/Main/MainHome';
import MainList from 'screens/Main/MainList';
import homeIcon from 'assets/images/home_icon.png';
import homeIconActive from 'assets/images/home_icon_active.png';
import listIcon from 'assets/images/list_icon.png';
import listIconActive from 'assets/images/list_icon_active.png';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="MainHome"
      screenOptions={() => ({
        tabBarStyle: {
          height: 95,
          paddingTop: 10,
        },
        headerStyle: {shadowColor: 'white'},
      })}>
      <Tab.Screen
        name="MainHome"
        component={MainHome}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image source={homeIconActive} style={{width: 27, height: 25}} />
            ) : (
              <Image source={homeIcon} style={{width: 27, height: 25}} />
            ),
        }}
      />
      <Tab.Screen
        name="MainList"
        component={MainList}
        options={{
          title: '예약 목록',
          headerTitleAlign: 'center',
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image source={listIconActive} style={{width: 20, height: 25}} />
            ) : (
              <Image source={listIcon} style={{width: 20, height: 25}} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
