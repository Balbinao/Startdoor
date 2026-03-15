export const API_CONST = {
  GENERAL: {
    BACKEND_URL: 'http://localhost:8080',
  },
  AUTH: {
    LOGIN_URL: '/auth/login',
    REGISTER_STUDENT_URL: '/auth/cadastrar/estudante',
    REGISTER_COMPANY_URL: '/auth/cadastrar/empresa',
  },
  STUDENT: {
    BY_ID: (id: number) => `/estudante/${id}`,
  },
  COMPANY: {
    BY_ID: (id: number) => `/empresas/${id}`,
  },
};
