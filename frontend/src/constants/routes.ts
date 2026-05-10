export const ROUTES_CONST = {
  LOGIN: '/login',

  HOME: '/home',
  SEARCH: '/pesquisar',

  STATISTICS_RECOMMENDATION: {
    COMPANY_RECOMMENDATION: `/recomendacao`,
    COMPANY_RECOMMENDATION_ANALYSIS_URL: `/recomendacao/analise/:studentId/empresa/:companyId`,
    COMPANY_RECOMMENDATION_ANALYSIS: (studentId: number, companyId: number) =>
      `/recomendacao/analise/${studentId}/empresa/${companyId}`,
    COMPANY_STATISTIC_ANALYSIS: '/estatistica',
  },

  STUDENT: {
    REGISTRATION: '/cadastro-estudante',
    UNIQUE: 'estudante',
    PROFILE_URL: '/perfil-estudante/:id',
    PROFILE_BY_ID: (id: string | number) => `/perfil-estudante/${id}`,
    PROFILE_UPDATE_URL: '/perfil-estudante/:id/alterar',
    PROFILE_UPDATE: (id: string | number) => `/perfil-estudante/${id}/alterar`,
    PROFILE_FAVORITE_URL: '/perfil-estudante/:id/favoritos',
    PROFILE_FAVORITE: (id: string | number) =>
      `/perfil-estudante/${id}/favoritos`,
  },

  COMPANY: {
    REGISTRATION: '/cadastro-empresa',
    UNIQUE: 'empresa',
    PROFILE_URL: '/perfil-empresa/:id',
    PROFILE_BY_ID: (id: string | number) => `/perfil-empresa/${id}`,
    PROFILE_UPDATE_URL: '/perfil-empresa/:id/alterar',
    PROFILE_UPDATE: (id: string | number) => `/perfil-empresa/${id}/alterar`,
  },

  REVIEW: {
    REVIEW_VIEW_URL: '/perfil-estudante/:id/avaliacao/:reviewId',
    REVIEW_VIEW_BY_ID: (id: string | number, reviewId: string | number) =>
      `/perfil-estudante/${id}/avaliacao/${reviewId}`,
    REVIEW_CREATE_URL: `/perfil/estudante/:id/avaliacao`,
    REVIEW_CREATE: (id: number) => `/perfil/estudante/${id}/avaliacao`,
    REVIEW_UPDADE_URL: '/perfil-estudante/:id/avaliacao/:reviewId/alterar',
    REVIEW_UPDADE_BY_ID: (id: string | number, reviewId: string | number) =>
      `/perfil-estudante/${id}/avaliacao/${reviewId}/alterar`,
  },

  ROOT_PRIVATE: '/',
  ROOT_PUBLIC: '/',
} as const;
