export const MESSAGES_RESPONSE = {
  SUCCESS: {
    CREATE: 'Item criado com sucesso!',
    REGISTRATION: 'Cadastro efetuado com sucesso!',
    UPDATE: 'Dados atualizados com sucesso!',
    DELETE: 'Dados deletados com sucesso!',
  },
  WARNING: {
    USER_ID_NOT_FOUND: 'Nenhum userId encontrado!',
    USER_ROLE_NOT_FOUND: 'Nenhum userRole encontrado!',
    REVIEW_ID_NOT_FOUND: 'Nenhum reviewId encontrado!',
    DELETE_ACCOUNT: 'Deseja realmente deletar a conta?',
    DELETE_ACADEMIC_EXPERIENCE:
      'Deseja realmente deletar esta experiência academica?',
    DELETE_PROFESSIONAL_EXPERIENCE:
      'Deseja realmente deletar esta experiência profissional?',
  },
  ERROR: {
    SERVER: 'Parece que houve um erro no servidor!',
  },
} as const;
