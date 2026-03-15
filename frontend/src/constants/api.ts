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
    STUDENT_BY_ID: (id: number) => `/estudantes/${id}`,
  },
  COMPANY: {
    BY_ID: (id: number) => `/empresas/${id}`,
  },
};
