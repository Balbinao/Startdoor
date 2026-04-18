export const API_CONST = {
  GENERAL: {
    BACKEND_URL: 'http://localhost:8080',
  },
  AUTH: {
    LOGIN_URL: '/auth/login',
  },
  SECTOR: {
    BASE: '/setores',
  },
  STUDENT: {
    BASE: '/estudantes',
    REGISTRATION: '/estudantes/cadastrar/estudante',
    BY_ID: (id: number) => `/estudantes/${id}`,
    BY_ID_PASSWORD: (id: number) => `/estudantes/${id}/senha`,
    BY_ID_PICTURE: (id: number) => `/estudantes/${id}/foto`,
  },
  CONDITIONAL_SCORE: {
    BASE: '/estudantes/notas-condi',
    BY_ID_STUDENT: (id: number) => `/estudantes/notas-condi/${id}`,
  },
  COMPANY: {
    BASE: '/empresas',
    REGISTRATION: '/empresas/cadastrar/empresa',
    BY_ID: (id: number) => `/empresas/${id}`,
    BY_ID_PASSWORD: (id: number) => `/empresas/${id}/senha`,
    BY_ID_PICTURE: (id: number) => `/empresas/${id}/foto`,
  },
  EXPERIENCE: {
    ACADEMIC_BY_ID: (id: number) => `/experiencias-academicas/${id}`,
    ACADEMIC_STUDENT_BY_ID: (id: number) =>
      `/experiencias-academicas/estudante/${id}`,
    PROFESSIONAL_BY_ID: (id: number) => `/experiencias-profissionais/${id}`,
    PROFESSIONAL_STUDENT_BY_ID: (id: number) =>
      `/experiencias-profissionais/estudante/${id}`,
  },
  REVIEW: {
    BY_ID: (id: number) => `/avaliacoes/${id}`,
    CARD_BY_ID: (id: number) => `/avaliacoes/card/${id}`,
  },
  COMMENT: {
    BY_ID: (id: number) => `/comentarios/${id}`,
    STUDENT_BY_ID: (id: number) => `/comentarios/estudante/${id}`,
  },
} as const;
