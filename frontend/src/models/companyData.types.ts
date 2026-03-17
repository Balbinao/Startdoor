export interface ICompany {
  id: number;
  nomeFantasia: string;
  cnpj: string;
  username: string;
  email: string;
  senha: string;
  mediaNotaGeral?: number;
  biografia?: string;
  paisOrigem?: string;
  receitaAnual?: string;
  dataFundacao?: string;
  tamanhoEmpresa?: string;
  estadoSede?: string;
  mediaSalarial?: number;
  areaAtuacao?: string;
  linkSite?: string;
  linkLinkedin?: string;
  linkGupy?: string;
}

export interface IUpdateCompanyPassword {
  senhaAtual: string;
  novaSenha: string;
}
