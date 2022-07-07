export const BASE_URL = 'http://18.221.14.73:8000';
const API = {
  signUp: `${BASE_URL}/users/signup`,
  signIn: `${BASE_URL}/users/login`,
  emailCheck: `${BASE_URL}/users/check_duplicate`,
  departmentList: `${BASE_URL}/appointments/departments`,
  appointments: `${BASE_URL}/appointments/list`,
};
export default API;
