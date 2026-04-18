import type { DROPDOWN_VALUES_CONST } from '@constants';

export interface IStudent {
  id: number;
  nome: string;
  user: string;
  email: string;
  fotoUrl?: string | null;
  biografia: string | null;
  paisOrigem:
    | (typeof DROPDOWN_VALUES_CONST.PAIS_ORIGEM)[number]['value']
    | null;
  mediaNotaGeral: number | null;
  dataNascimento: string | null;
  modeloTrabalho:
    | (typeof DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO)[number]['value']
    | null;
  estadoAtuacao:
    | (typeof DROPDOWN_VALUES_CONST.ESTADO_ATUACAO)[number]['value']
    | null;
  setorInteresse: number | '' | null;
  habilidadesPrincipais: string | null;
  linkSite: string | null;
  linkLinkedin: string | null;
}

export interface IStudentUpdatePayload {
  nome: string;
  user: string;
  email: string;
  biografia: string | null;
  paisOrigem:
    | (typeof DROPDOWN_VALUES_CONST.PAIS_ORIGEM)[number]['value']
    | null;
  dataNascimento: string | null;
  modeloTrabalho:
    | (typeof DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO)[number]['value']
    | null;
  estadoAtuacao:
    | (typeof DROPDOWN_VALUES_CONST.ESTADO_ATUACAO)[number]['value']
    | null;
  setorInteresse: number | '' | null;
  habilidadesPrincipais: string | null;
  linkSite: string | null;
  linkLinkedin: string | null;
}

export interface IConditionalScore {
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
