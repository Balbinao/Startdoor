export interface IStudent {
  id: number;
  nome: string;
  user: string;
  email: string;
  senha: string;
  biografia?: string;
  paisOrigem?: string;
  mediaNotaGeral?: number;
  dataNascimento?: string;
  modeloTrabalho?: string;
  estadoAtuacao?: string;
  setorInteresse: string;
  habilidadesPrincipais?: string;
  linkSite?: string;
  linkLinkedin?: string;
}
