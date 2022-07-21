export const BASE_URL = 'http://18.221.14.73:8000';
const API = {
  signUp: `${BASE_URL}/users/signup`,
  signIn: `${BASE_URL}/users/login`,
  emailCheck: `${BASE_URL}/users/check_duplicate`,
  departmentList: `${BASE_URL}/appointments/departments`,
  WorkingDayView: `${BASE_URL}/appointments/doctor`,
  WorkingTimeView: `${BASE_URL}/appointments/doctor`,
  appointments: `${BASE_URL}/appointments/list`,
  appointmentDetail: `${BASE_URL}/appointments/`,
  appointmentPost: `${BASE_URL}/appointments/create`,
};
export default API;
