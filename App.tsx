import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Splash from '@screens/Splash/Splash';
import Entry from '@screens/Entry/Entry';
import SignIn from '@screens/SignIn/SignIn';
import SignUp from '@screens/SignUp/SignUp';
import Main from '@screens/Main/Main';
import RsrvtList from '@screens/Main/RsrvtList';
import DocList from '@screens/DocList/DocList';
import RsrvtCalendar from '@screens/RsrvtCalendar/RsrvtCalendar';
import RsrvtSubmit from '@screens/RsrvtSubmit/RsrvtSubmit';
import RsrvtDetail from '@screens/RsrvtDetail/RsrvtDetail';

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
          <Stack.Screen name="RsrvtList" component={RsrvtList} />
          <Stack.Screen name="DocList" component={DocList} />
          <Stack.Screen name="RsrvtCalendar" component={RsrvtCalendar} />
          <Stack.Screen name="RsrvtSubmit" component={RsrvtSubmit} />
          <Stack.Screen name="RsrvtDetail" component={RsrvtDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
