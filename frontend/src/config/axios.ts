import { API_CONST, STORAGEKEYS_CONST } from '@constants';
import axios from 'axios';

export const api = axios.create({
  baseURL: API_CONST.GENERAL.BACKEND_URL,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem(STORAGEKEYS_CONST.ACCESS_TOKEN);
    if (
      token &&
      typeof token === 'string' &&
      token !== 'undefined' &&
      token !== 'null' &&
      token !== '[object Object]'
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGEKEYS_CONST.ACCESS_TOKEN);
      window.location.href = '/login';
    }
  },
);
