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

export interface IStudentNotaCondi {
  id_estudante: number;
  ambiente: number;
  aprendizado: number;
  beneficios: number;
  cultura: number;
  efetivacao: number;
  entrevista: number;
  feedback: number;
  infraestrutura: number;
  integracao: number;
  remuneracao: number;
  rotina: number;
  lideranca: number;
}
