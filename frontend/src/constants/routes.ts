export const ROUTES_CONST = {
  LOGIN: '/login',

  STUDENT: {
    REGISTRATION: '/cadastro-estudante',
    UNIQUE: 'estudante',
    PROFILE_URL: '/perfil-estudante/:id',
    PROFILE: (id: string | number) => `/perfil-estudante/${id}`,
    PROFILE_UPDATE_URL: '/perfil-estudante-alterar/:id',
    PROFILE_UPDATE: (id: string | number) => `/perfil-estudante-alterar/${id}`,
  },

  COMPANY: {
    REGISTRATION: '/cadastro-empresa',
    UNIQUE: 'empresa',
    PROFILE_URL: '/perfil-empresa/:id',
    PROFILE: (id: string | number) => `/perfil-empresa/${id}`,
    PROFILE_UPDATE_URL: '/perfil-empresa-alterar/:id',
    PROFILE_UPDATE: (id: string | number) => `/perfil-empresa-alterar/${id}`,
  },

  ROOT_PRIVATE: '/',
  ROOT_PUBLIC: '/',
} as const;
