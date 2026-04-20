import type { DROPDOWN_VALUES_CONST } from '@constants';

// export interface IReviewCardCompanyView {
//   idAvaliacao: number;
//   idEstudante: number;
//   tituloCargo: string;
//   notaMedia: number;
//   textoAvaliacao: string;
//   dataPublicacao: string;
// }

// export interface IReviewCardStudentView {
//   idAvaliacao: number;
//   idEmpresa: number;
//   tituloCargo: string;
//   notaMedia: number;
//   textoAvaliacao: string;
//   dataPublicacao: string;
// }

export interface IReview {
  id: number;
  estudanteId: number;
  nomeEstudante: string | null;
  fotoUrlEstudante: string | null;
  userEstudante: string | null;
  empresaId: number;
  fotoUrlEmpresa: string | null;
  nomeEmpresa: string;
  setorId: number;
  nomeSetor: string;
  estadoAtuacao: (typeof DROPDOWN_VALUES_CONST.ESTADO_ATUACAO)[number]['value'];
  modeloTrabalho: (typeof DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO)[number]['value'];
  dataInicio: string;
  dataFim?: string | null;
  tituloCargo: string;
  textoAvaliacao: string;
  salarioMin: number;
  salarioMax: number;
  anonima: boolean;
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
  createdAt: string;
  updatedAt: string;
}

export interface IReviewPayload {
  idEmpresa: number;
  idSetor: number;
  estadoAtuacao: (typeof DROPDOWN_VALUES_CONST.ESTADO_ATUACAO)[number]['value'];
  modeloTrabalho: (typeof DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO)[number]['value'];
  dataInicio: string;
  dataFim?: string | null;
  tituloCargo: string;
  textoAvaliacao: string;
  salarioMin: number;
  salarioMax: number;
  anonima: boolean;
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
