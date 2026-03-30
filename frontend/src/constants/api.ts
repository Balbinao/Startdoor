export const API_CONST = {
  GENERAL: {
    BACKEND_URL: 'http://localhost:8080',
  },
  AUTH: {
    LOGIN_URL: '/auth/login',
  },
  STUDENT: {
    REGISTRATION: '/estudantes/cadastrar/estudante',
    BY_ID: (id: number) => `/estudantes/${id}`,
    BY_ID_PASSWORD: (id: number) => `/estudantes/${id}/senha`,
  },
  COMPANY: {
    REGISTRATION: '/empresas/cadastrar/empresa',
    BY_ID: (id: number) => `/empresas/${id}`,
    BY_ID_PASSWORD: (id: number) => `/empresas/${id}/senha`,
  },
  EXPERIENCE: {
    ACADEMIC_BY_ID: (id: number) => `/experiencias/academico/${id}`,
    PROFESSIONAL_BY_ID: (id: number) => `/experiencias/professional/${id}`,
  },
} as const;
