import type { DROPDOWN_VALUES_CONST } from '@constants';
export interface ICompany {
  id: number;
  nomeFantasia: string;
  cnpj: string;
  username: string;
  email: string;
  fotoUrl?: string | null;
  biografia?: string;
  paisOrigem?: string;
  receitaAnual?: string;
  dataFundacao?: string | null;
  tamanhoEmpresa?: string;
  estadoSede?: string;
  areaAtuacao?: string;
  linkSite?: string;
  linkLinkedin?: string;
  linkGupy?: string;
  createdAt: string;

  medias?: {
    mediaGeral: number;
    mediaAmbiente: number;
    mediaAprendizado: number;
    mediaBeneficios: number;
    mediaCultura: number;
    mediaEfetivacao: number;
    mediaEntrevista: number;
    mediaFeedback: number;
    mediaInfraestrutura: number;
    mediaIntegracao: number;
    mediaRemuneracao: number;
    mediaRotina: number;
    mediaLideranca: number;
  };

  salarios?: {
    minimo: number;
    maximo: number;
    media: number;
  };
}

export interface ICompanyUpdatePayload {
  nomeFantasia: string;
  cnpj: string;
  email: string;
  biografia: string | null;
  paisOrigem:
    | (typeof DROPDOWN_VALUES_CONST.PAIS_ORIGEM)[number]['value']
    | null;
  receitaAnual:
    | (typeof DROPDOWN_VALUES_CONST.RECEITA_ANUAL)[number]['value']
    | null;
  dataFundacao: string | null;
  tamanhoEmpresa:
    | (typeof DROPDOWN_VALUES_CONST.TAMANHO_EMPRESA)[number]['value']
    | null;
  estadoSede:
    | (typeof DROPDOWN_VALUES_CONST.ESTADO_ATUACAO)[number]['value']
    | null;
  areaAtuacao: string | null;
  linkSite: string | null;
  linkLinkedin: string | null;
  linkGupy: string | null;
}

export interface ICompanySectors {
  empresaId: number;
  setorId: number;
  nomeSetor: string;
}

export interface ICompanySectorPayload {
  setorId: number;
}
