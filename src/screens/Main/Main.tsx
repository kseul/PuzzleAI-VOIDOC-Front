import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import MainHome from 'screens/Main/MainHome';
import MainList from 'screens/Main/MainList';
import {RootStackParamList} from 'types/type';
import homeIcon from 'assets/images/home_icon.png';
import homeIconActive from 'assets/images/home_icon_active.png';
import listIcon from 'assets/images/list_icon.png';
import listIconActive from 'assets/images/list_icon_active.png';
import {theme} from 'styles/theme';

const Tab = createBottomTabNavigator<RootStackParamList>();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="MainHome"
      screenOptions={() => ({
        tabBarStyle: {
          height: 105,
          paddingTop: 15,
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
          headerTitleStyle: {
            fontSize: theme.fontSizes.fontMedium,
          },
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
  homeIcon: {width: 28, height: 26},

  listIcon: {width: 20, height: 26},
});

export default Main;
