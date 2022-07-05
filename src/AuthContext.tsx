import React, {createContext, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from 'config';
import {Alert} from 'react-native';

type AuthContextType = {
  userState: {loggedIn: boolean; isLoading: boolean};
  login: (email: string, password: string) => void;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const defaultValue = {
  userState: {loggedIn: false, isLoading: true},
  login: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

type State = {loggedIn: boolean; isLoading: boolean};
type Action = {type: 'LOGGED_IN' | 'LOADING_DONE' | 'LOADING'};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loggedIn: false,
        isLoading: true,
      };
    case 'LOADING_DONE':
      return {
        ...state,
        isLoading: false,
      };
    case 'LOGGED_IN':
      return {
        ...state,
        loggedIn: true,
        isLoading: false,
      };
  }
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [userState, dispatch] = useReducer(reducer, {
    loggedIn: false,
    isLoading: true,
  });

  const authContext = {
    login: async (email: string, password: string) => {
      const response = await fetch(`${API.signIn}`, {
        method: 'POST',
        headers: {
          'Type-Of-Application': 'app',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const res = await response.json();
      const message = await res.message;
      if (response.status === 200) {
        setToken('access_token', res.access_token);
        dispatch({type: 'LOGGED_IN'});
      } else if (message === 'WRONG_EMAIL_OR_PASSWORD') {
        return Alert.alert('알림', '잘못된 이메일 또는 비밀번호 입니다!');
      } else if (message === 'DOCTOR_CAN_NOT_LOGIN_ON_APP') {
        return Alert.alert('알림', '의사는 로그인할 수 없습니다.');
      }
    },
    userState,
  };

  const setToken = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error('token 저장 실패');
    }
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
