export const ROUTES_CONST = {
  LOGIN: '/login',

  SEARCH: '/pesquisar',

  STUDENT: {
    REGISTRATION: '/cadastro-estudante',
    UNIQUE: 'estudante',
    PROFILE_URL: '/perfil-estudante/:id',
    PROFILE: (id: string | number) => `/perfil-estudante/${id}`,
    PROFILE_UPDATE_URL: '/perfil-estudante/:id/alterar',
    PROFILE_UPDATE: (id: string | number) => `/perfil-estudante/${id}/alterar`,
  },

  COMPANY: {
    REGISTRATION: '/cadastro-empresa',
    UNIQUE: 'empresa',
    PROFILE_URL: '/perfil-empresa/:id',
    PROFILE: (id: string | number) => `/perfil-empresa/${id}`,
    PROFILE_UPDATE_URL: '/perfil-empresa/:id/alterar',
    PROFILE_UPDATE: (id: string | number) => `/perfil-empresa/${id}/alterar`,
  },

  REVIEW: {
    REVIEW_VIEW_URL: '/perfil-estudante/:id/avaliacao/:reviewId',
    REVIEW_VIEW_BY_ID: (id: string | number, reviewId: string | number) =>
      `/perfil-estudante/${id}/avaliacao/${reviewId}`,
    REVIEW_UPDADE_URL: '/perfil-estudante/:id/avaliacao/:reviewId/alterar',
    REVIEW_UPDADE_BY_ID: (id: string | number, reviewId: string | number) =>
      `/perfil-estudante/${id}/avaliacao/${reviewId}/alterar`,
  },

  ROOT_PRIVATE: '/',
  ROOT_PUBLIC: '/',
} as const;
