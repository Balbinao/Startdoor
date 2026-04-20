import type { DROPDOWN_VALUES_CONST } from '@constants';

export interface ICompany {
  id: number;
  nomeFantasia: string;
  cnpj: string;
  username: string;
  email: string;
  fotoUrl?: string | null;
  senha: string;
  mediaNotaGeral?: number;
  biografia?: string;
  paisOrigem?: (typeof DROPDOWN_VALUES_CONST.PAIS_ORIGEM)[number]['value'];
  receitaAnual?: (typeof DROPDOWN_VALUES_CONST.RECEITA_ANUAL)[number]['value'];
  dataFundacao?: string;
  tamanhoEmpresa?: (typeof DROPDOWN_VALUES_CONST.TAMANHO_EMPRESA)[number]['value'];
  estadoSede?: (typeof DROPDOWN_VALUES_CONST.ESTADO_ATUACAO)[number]['value'];
  mediaSalarial?: number;
  areaAtuacao?: string;
  linkSite?: string;
  linkLinkedin?: string;
  linkGupy?: string;
  competencias?: {
    ambiente?: number;
    aprendizado?: number;
    beneficios?: number;
    cultura?: number;
    efetivacao?: number;
    entrevista?: number;
    feedback?: number;
    infraestrutura?: number;
    integracao?: number;
    remuneracao?: number;
    rotina?: number;
    lideranca?: number;
  };
  setor?: string;
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

export interface ICompanySectorPayload{
  setorId: number
}
