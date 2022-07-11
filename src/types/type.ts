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

export interface DocListProp {
  id: number;
  doctor_name: string;
  doctor_department: string;
  doctor_hospital: string;
  doctor_profile_img: string;
  appointment_date: string;
  appointment_id: number;
}

export type AppointmentListProp = {
  doctor_image: string;
  doctor_name: string;
  hospital_name: string;
  date: string;
  reservation_id: number;
  status_name: string;
  subject_name: string;
  time: string;
};

export type TimeTableProp = {
  docWorkingTime: number[];
  goAppointmentSubmit: (time: any) => void;
};

export interface appointmentsDataProp {
  id: number;
  appointment_id: number;
  appointment_date: string;
  doctor_department: string;
  doctor_hospital: string;
  doctor_name: string;
  doctor_profile_img: string;
  state_name: string;
}

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
