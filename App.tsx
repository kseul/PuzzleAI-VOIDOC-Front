import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Splash from '@screens/Splash/Splash';
import Entry from '@screens/Entry/Entry';
import SignIn from '@screens/SignIn/SignIn';
import SignUp from '@screens/SignUp/SignUp';
import Main from '@screens/Main/Main';
import AppointmentList from '@screens/Main/AppointmentList';
import DocList from '@screens/DocList/DocList';
import AppointmentCalendar from '@screens/AppointmentCalendar/AppointmentCalendar';
import AppointmentSubmit from '@screens/AppointmentSubmit/AppointmentSubmit';
import AppointmentDetail from '@screens/AppointmentDetail/AppointmentDetail';

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
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
          <Stack.Screen name="AppointmentList" component={AppointmentList} />
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
