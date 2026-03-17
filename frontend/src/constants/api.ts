export const API_CONST = {
  GENERAL: {
    BACKEND_URL: 'http://localhost:8080',
  },
  AUTH: {
    LOGIN_URL: '/auth/login',
    REGISTRATION_STUDENT_URL: '/estudantes/cadastrar/estudante',
    REGISTRATION_COMPANY_URL: '/empresas/cadastrar/empresa',
  },
  STUDENT: {
    BY_ID: (id: number) => `/estudantes/${id}`,
  },
  COMPANY: {
    BY_ID: (id: number) => `/empresas/${id}`,
  },
};
