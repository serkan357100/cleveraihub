import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cleveraihub-8.onrender.com/api',
});

export const packagesApi = {
  list: () => api.get('/package
