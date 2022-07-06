export const BASE_URL = 'http://192.168.0.173:8000';
const API = {
  signUp: `${BASE_URL}/users/signup`,
  signIn: `${BASE_URL}/users/login`,
  emailCheck: `${BASE_URL}/users/check_duplicate`,
  departmentList: `${BASE_URL}/appointments/departments`,
};
export default API;
