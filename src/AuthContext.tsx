import React, {createContext, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from 'config';
import {Alert} from 'react-native';

type AuthContextType = {
  userState: {loggedIn: boolean; registered: boolean; userName: string};
  signIn: (email: string, password: string) => void;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => void;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const defaultValue = {
  userState: {loggedIn: false, registered: true, userName: null},
  signIn: () => {},
  signUp: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

type State = {loggedIn: boolean; registered: boolean; userName: string};
type Action = {
  type: 'LOGGED_IN' | 'LOADING_DONE' | 'LOADING' | 'CREATE_USER';
  nameData: string;
};

function reducer(state: State, {type, nameData}: Action): State {
  switch (type) {
    case 'LOADING':
      return {
        ...state,
        loggedIn: false,
      };
    case 'LOADING_DONE':
      return {
        ...state,
      };
    case 'LOGGED_IN':
      return {
        ...state,
        loggedIn: true,
        userName: nameData,
      };
    case 'CREATE_USER':
      return {
        ...state,
        registered: true,
      };
  }
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [userState, dispatch] = useReducer(reducer, {
    loggedIn: false,
    registered: false,
    userName: '',
  });

  const authContext = {
    signUp: async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
    ) => {
      const response = await fetch(`${API.signUp}`, {
        method: 'POST',
        body: JSON.stringify({
          name: lastName + firstName,
          email,
          password,
          is_doctor: false,
        }),
      });
      const res = await response.json();
      const message = await res.message;
      if (message === 'SUCCESS') {
        Alert.alert('회원가입 되었습니다.');
        dispatch({type: 'CREATE_USER'});
      }
    },
    signIn: async (email: string, password: string) => {
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
        dispatch({type: 'LOGGED_IN', nameData: res.user_name});
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

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    return String(token);
  } catch (error) {
    throw new Error('token 저장 실패');
  }
};
