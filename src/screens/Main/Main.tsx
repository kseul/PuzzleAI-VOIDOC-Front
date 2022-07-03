import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
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
              <Image source={homeIconActive} style={styles.homeIcon} />
            ) : (
              <Image source={homeIcon} style={styles.homeIcon} />
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
              <Image source={listIconActive} style={styles.listIcon} />
            ) : (
              <Image source={listIcon} style={styles.listIcon} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  homeIcon: {width: 27, height: 25},

  listIcon: {width: 20, height: 25},
});

export default Main;
