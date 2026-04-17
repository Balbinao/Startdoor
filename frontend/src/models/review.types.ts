import type { DROPDOWN_VALUES_CONST } from '@constants';

export interface IReviewCard {
  source: 'Empresa' | 'Estudante';
  idEstudante: number;
  idEmpresa: number;
  tituloCargo: string;
  notaMedia: number;
  textoAvaliacao: string;
  dataPublicacao: string;
}

export interface IReview {
  id: number;
  idEstudante: number;
  idEmpresa: number;
  idSetor: number;
  estadoAtuacao: (typeof DROPDOWN_VALUES_CONST.ESTADO_ATUACAO)[number]['value'];
  modeloTrabalho: (typeof DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO)[number]['value'];
  dataInicio: string;
  dataFim?: string | null;
  tituloCargo: string;
  textoAvaliacao: string;
  faixaSalarial: {
    salarioMin: number;
    salarioMax: number;
  };
  anonima: number;
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
  created_at: string;
}
