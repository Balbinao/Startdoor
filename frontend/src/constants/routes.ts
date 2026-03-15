export const ROUTES_CONST = {
  LOGIN: '/login',
  STUDENT_REGISTER: '/cadastro-estudante',
  COMPANY_REGISTER: '/cadastro-empresa',

  STUDENT_PROFILE: (id: string | number) => `/perfil-estudante/${id}`,
  STUDENT_PROFILE_UPDATE: (id: string | number) =>
    `/perfil-estudante-alterar/${id}`,

  ROOT_PRIVATE: '/',
  ROOT_PUBLIC: '/',
};
