import type { USER_ROLES_CONST } from '@constants';

export interface IComment {
  id: number;
  type: (typeof USER_ROLES_CONST)[keyof typeof USER_ROLES_CONST];
  authorId: number;
  authorName: string;
  authorPhotoUrl?: string;
  authorUsername?: string;
  reviewId: number;
  text: string;
  anonymous?: boolean;
  createdAt: string;
}

export interface ICommentStudent {
  id: number;
  estudanteId: number;
  nomeEstudante: string;
  fotoUrlEstudante: string;
  userEstudante: string;
  avaliacaoId: number;
  texto: string;
  anonima: boolean;
  createdAt: string;
}

export interface ICommentCompany {
  id: number;
  empresaId: number;
  nomeEmpresa: string;
  fotoUrlEmpresa: string;
  usernameEmpresa: string;
  avaliacaoId: number;
  texto: string;
  createdAt: string;
}

export interface ICommentPayload {
  texto: string;
  anonima: boolean;
}

export interface ICompanyScores {
  mediaGeral: number;
  mediaAmbiente: number;
  mediaAprendizado: number;
  mediaBeneficios: number;
  mediaCultura: number;
  mediaEfetivacao: number;
  mediaEntrevista: number;
  mediaFeedback: number;
  mediaInfraestrutura: number;
  mediaIntegracao: number;
  mediaRemuneracao: number;
  mediaRotina: number;
  mediaLideranca: number;
}
