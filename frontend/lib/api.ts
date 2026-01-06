import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cleveraihub-8.onrender.com/api',
});

export const packagesApi = {
  list: () => api.get('/packages'),
  getById: (id: string) => api.get(`/packages/${id}`),
};

export const dashboardApi = {
  get: () => api.get('/dashboard'),
};

export const paymentsApi = {
  createCheckout: (data: any) => api.post('/payments/checkout', data),
};

export default api;
