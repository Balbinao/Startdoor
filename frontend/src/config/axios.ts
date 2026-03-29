import { API_CONST, MESSAGES_RESPONSE, STORAGEKEYS_CONST } from '@constants';
import axios from 'axios';

export interface IAxiosCustomResponse extends Error {
  status?: number;
}

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
    const customError: IAxiosCustomResponse = new Error(
      error.response?.data?.message || MESSAGES_RESPONSE.ERROR.SERVER,
    );
    customError.status = error.response?.status;
    return Promise.reject(customError);
  },
);
