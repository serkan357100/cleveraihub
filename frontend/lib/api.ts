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

export default api;

