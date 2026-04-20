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
    SEARCH: '/empresas/pesquisa',
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
    STUDENT_REVIEW_BY_ID: (id: number) => `/avaliacoes/estudante/${id}`,
    COMPANY_BY_ID_REVIEW: (id: number) => `/avaliacoes/empresa/${id}`,
  },
  COMMENT: {
    REVIEW_BY_ID_COMMENTS_STUDENT: (id: number) =>
      `/avaliacoes/${id}/comentarios-estudante`,
    REVIEW_BY_ID_COMMENTS_COMPANIES: (id: number) =>
      `/avaliacoes/${id}/comentarios-empresa`,
    REVIEW_COMMENTS_STUDENTS_BY_ID: (id: number) =>
      `/avaliacoes/comentarios-estudante/${id}`,
    REVIEW_COMMENTS_COMPANIES_BY_ID: (id: number) =>
      `/avaliacoes/comentarios-empresa/${id}`,
  },
} as const;
