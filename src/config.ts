export const BASE_URL = 'http://10.58.4.68:8000';
const API = {
  signUp: `${BASE_URL}/users/signup`,
  signIn: `${BASE_URL}/users/login`,
  emailCheck: `${BASE_URL}/users/check_duplicate`,
  mainAppointments: `${BASE_URL}/appointments/departments`,
};
export default API;
