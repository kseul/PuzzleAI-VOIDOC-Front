import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Splash from './src/screens/Splash/Splash';
import Entry from './src/screens/Entry/Entry';
import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';
import Main from './src/screens/Main/Main';
import RsrvtList from './src/screens/Main/RsrvtList';
import RsrvtDetail from './src/screens/RsrvtDetail/RsrvtDetail';
import RsrvtCalendar from './src/screens/RsrvtCalendar/RsrvtCalendar';
import RsrvtSubmit from './src/screens/RsrvtSubmit/RsrvtSubmit';

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
          <Stack.Screen name="Entry" component={Entry} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
          <Stack.Screen name="RsrvtList" component={RsrvtList} />
          <Stack.Screen name="RsrvtDetail" component={RsrvtDetail} />
          <Stack.Screen name="RsrvtCalendar" component={RsrvtCalendar} />
          <Stack.Screen name="RsrvtSubmit" component={RsrvtSubmit} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
