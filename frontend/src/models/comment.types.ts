export interface IComment {
  id: number;
  idEstudante: number;
  texto: string;
  anonimo: boolean;
  createdAt: string;
}

export interface ICommentPayload {
  texto: string;
  anonimo: boolean;
}
