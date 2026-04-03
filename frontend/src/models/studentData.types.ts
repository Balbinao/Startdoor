import type { DROPDOWN_VALUES_CONST } from '@constants';

export interface IStudent {
  id: number;
  nome: string;
  user: string;
  email: string;
  senha: string;
  biografia?: string;
  paisOrigem?: (typeof DROPDOWN_VALUES_CONST.PAIS_ORIGEM)[number]['value'];
  mediaNotaGeral?: number;
  dataNascimento?: string;
  modeloTrabalho?: (typeof DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO)[number]['value'];
  estadoAtuacao?: (typeof DROPDOWN_VALUES_CONST.ESTADO_ATUACAO)[number]['value'];
  setorInteresse: number | '';
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
