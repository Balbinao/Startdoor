export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER_ESTUDANTE: '/auth/cadastrar/estudante',
    REGISTER_EMPRESA: '/auth/cadastrar/empresa'
  },
  EMPRESAS: {
    BASE: '/empresas',
    POR_ID: (id) => `/empresas/${id}`
  },
  ESTUDANTES: {
    BASE: '/estudantes',
    POR_ID: (id) => `/estudantes/${id}`
  }
};

export const ERROR_MESSAGES = {
  GENERIC: 'Ocorreu um erro. Tente novamente.',
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.'
};