import type { DROPDOWN_VALUES_CONST } from '@constants';

export interface IAcademicExperience {
  id: number;
  idEstudante: number;
  tituloEnsino: string;
  nomeEscola: string;
  estadoAtuacao: (typeof DROPDOWN_VALUES_CONST.ESTADO_ATUACAO)[number]['value'];
  modeloEnsino: (typeof DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO)[number]['value'];
  dataInicio: string;
  dataFim: string | null;
  descricao: string | null;
}

export interface IAcademicExperiencePayload {
  tituloEnsino: string;
  nomeEscola: string;
  estadoAtuacao: (typeof DROPDOWN_VALUES_CONST.ESTADO_ATUACAO)[number]['value'];
  modeloEnsino: (typeof DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO)[number]['value'];
  dataInicio: string;
  dataFim: string | null;
  descricao: string | null;
}

export type INewAcademicExperience = IAcademicExperiencePayload & {
  tempId: string;
};
