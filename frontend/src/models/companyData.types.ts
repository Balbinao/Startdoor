import type { DROPDOWN_VALUES_CONST } from '@constants';

export interface ICompany {
  id: number;
  nomeFantasia: string;
  cnpj: string;
  username: string;
  email: string;
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
}
