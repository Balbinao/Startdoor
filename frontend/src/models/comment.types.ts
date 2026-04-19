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
  userEmpresa: string;
  avaliacaoId: number;
  texto: string;
  createdAt: string;
}

export interface ICommentPayload {
  texto: string;
  anonima: boolean;
}
