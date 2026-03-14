import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@App:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@App:token');
      localStorage.removeItem('@App:user');
      window.location.href = '/login';
    }
    
    const errorMessage = error.response?.data?.message 
      || error.response?.data 
      || error.message 
      || 'Erro na requisição';
      
    return Promise.reject({ 
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data 
    });
  }
);

export default api;