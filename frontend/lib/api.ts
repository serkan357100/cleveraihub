import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cleveraihub-8.onrender.com/api',
  withCredentials: true,
});

// Basit API wrapper'ları (MVP)
export const paymentsApi = {
  checkout: (payload: any) => api.post('/payments/checkout', payload),
};

export const packagesApi = {
  list: () => api.get('/packages'),
  getById: (id: string) => api.get(`/packages/${id}`),
};

export const authApi = {
  login: (payload: any) => api.post('/auth/login', payload),
  register: (payload: any) => api.post('/auth/register', payload),
  me: () => api.get('/auth/me'),
};

export const dashboardApi = {
  get: () => api.get('/dashboard'),
};

export default api;

