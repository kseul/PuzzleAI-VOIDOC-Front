import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Splash from 'src/screens/Splash';
import Entry from 'src/screens/Entry';
import SignIn from 'src/screens/SignIn';
import SignUp from 'src/screens/SignUp';
import MainHome from 'src/screens/Main/MainHome';
import MainList from 'src/screens/Main/MainList';
import DocList from 'src/screens/DocList';
import AppointmentCalendar from 'src/screens/AppointmentCalendar';
import AppointmentSubmit from 'src/screens/AppointmentSubmit';
import AppointmentDetail from 'src/screens/AppointmentDetail';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Entry"
            component={Entry}
            options={{headerShown: false}}
          />

          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen
            name="MainHome"
            component={MainHome}
            options={{headerShown: false}}
          />
          <Stack.Screen name="MainList" component={MainList} />
          <Stack.Screen name="DocList" component={DocList} />
          <Stack.Screen
            name="AppointmentCalendar"
            component={AppointmentCalendar}
          />
          <Stack.Screen
            name="AppointmentSubmit"
            component={AppointmentSubmit}
          />
          <Stack.Screen
            name="AppointmentDetail"
            component={AppointmentDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
