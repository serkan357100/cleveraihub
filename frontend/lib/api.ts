import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cleveraihub-8.onrender.com/api',
  withCredentials: true,
});

export const paymentsApi = api;
export const packagesApi = api;
export const authApi = api;
export const dashboardApi = api;

export default api;
