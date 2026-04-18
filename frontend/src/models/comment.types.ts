export interface ICommentStudent {
  id: number;
  idEstudante: number;
  texto: string;
  anonimo: boolean;
  createdAt: string;
}

export interface ICommentCompany {
  id: number;
  idEmpresa: number;
  texto: string;
  anonimo: boolean;
  createdAt: string;
}

export interface ICommentPayload {
  texto: string;
  anonimo: boolean;
}
