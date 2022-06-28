import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Image} from 'react-native';

import Splash from '@screens/Splash';
import Entry from '@screens/Entry';
import SignIn from '@screens/SignIn';
import SignUp from '@screens/SignUp';
import MainHome from '@screens/Main/MainHome';
import MainList from '@screens/Main/MainList';
import DocList from '@screens/DocList';
import AppointmentCalendar from '@screens/AppointmentCalendar';
import AppointmentSubmit from '@screens/AppointmentSubmit';
import AppointmentDetail from '@screens/AppointmentDetail';

const Stack = createStackNavigator();

function App() {
  const [ready, setReady] = useState(true);

  useEffect(()=>{
    setTimeout(() => {
      setReady(false)
    }, 1000)
  },[])

  function BackBtn() {
    return (
      <Image
        source={require('@assets/images/icon_feather_arrow_left.png')}
        style={{marginLeft: 21}}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {ready ? <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          /> : <Stack.Screen
            name="Entry"
            component={Entry}
            options={{headerShown: false}}
          />}
          
          <Stack.Screen 
            name="SignIn"
            component={SignIn} 
            options={{ 
              title : '',  
              headerBackTitleVisible: false,
              headerStyle: {shadowColor: 'white'},
              headerBackImage: ()=>(<BackBtn />),
            }}
          />

          <Stack.Screen
            name="회원가입"
            component={SignUp}
            options={{
              headerTitleAlign: 'center',
              headerStyle: {shadowColor: 'white'},
            }}
          />
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
