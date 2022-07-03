import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  AppointmentCalendar: undefined;
  AppointmentDetail: undefined;
  AppointmentSubmit: undefined;
  DocList: {
    id: number;
    name: string;
    thumbnails: string;
  };
  Entry: undefined;
  Main: undefined;
  MainHome: undefined;
  MainList: undefined;
  Splash: undefined;
};

export type SignUpScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;

export type SignInScreenProps = StackScreenProps<RootStackParamList, 'SignIn'>;

export type AppointmentCalendarScreenProps = StackScreenProps<
  RootStackParamList,
  'AppointmentCalendar'
>;

export type AppointmentDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'AppointmentDetail'
>;

export type AppointmentSubmitScreenProps = StackScreenProps<
  RootStackParamList,
  'AppointmentSubmit'
>;

export type DocListScreenProps = StackScreenProps<
  RootStackParamList,
  'DocList'
>;

export type EntryScreenProps = StackScreenProps<RootStackParamList, 'Entry'>;

export type MainHomeScreenProps = StackScreenProps<
  RootStackParamList,
  'MainHome'
>;

export type MainListScreenProps = StackScreenProps<
  RootStackParamList,
  'MainList'
>;

export type SplashScreenProps = StackScreenProps<RootStackParamList, 'Splash'>;
