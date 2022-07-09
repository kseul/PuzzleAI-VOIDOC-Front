import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import Entry from 'screens/Entry';
import SignIn from 'screens/SignIn';
import SignUp from 'screens/SignUp';
import Main from 'screens/Main/Main';
import DocList from 'screens/DocList';
import AppointmentCalendar from 'screens/AppointmentCalendar';
import AppointmentSubmit from 'screens/AppointmentSubmit';
import AppointmentDetail from 'screens/AppointmentDetail';
import {RootStackParamList} from 'types/type';
import arrowLeft from 'assets/images/icon_feather_arrow_left.png';
import {AuthContext} from 'AuthContext';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const {userState} = useContext(AuthContext);

  function BackBtn() {
    return <Image source={arrowLeft} style={{marginLeft: 21}} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Entry">
          {userState.loggedIn ? (
            <>
              <Stack.Screen
                name="Main"
                component={Main}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DocList"
                component={DocList}
                options={{
                  headerBackTitleVisible: false,
                  headerStyle: {shadowColor: 'white'},
                  headerBackImage: () => <BackBtn />,
                }}
              />
              <Stack.Screen
                name="AppointmentCalendar"
                component={AppointmentCalendar}
                options={{
                  title: '테스트 선생님',
                  headerBackTitleVisible: false,
                  headerTitleAlign: 'center',
                  headerStyle: {shadowColor: 'white'},
                  headerBackImage: () => <BackBtn />,
                }}
              />
              <Stack.Screen
                name="AppointmentSubmit"
                component={AppointmentSubmit}
                options={{
                  title: '진료예약',
                  headerTitleAlign: 'center',
                  headerBackTitleVisible: false,
                  headerStyle: {shadowColor: 'white'},
                  headerBackImage: () => <BackBtn />,
                }}
              />
              <Stack.Screen
                name="AppointmentDetail"
                component={AppointmentDetail}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Entry"
                component={Entry}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                  title: '',
                  headerBackTitleVisible: false,
                  headerStyle: {shadowColor: 'white'},
                  headerBackImage: () => <BackBtn />,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  title: '회원가입',
                  headerTitleAlign: 'center',
                  headerBackTitleVisible: false,
                  headerStyle: {shadowColor: 'white'},
                  headerBackImage: () => <BackBtn />,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
