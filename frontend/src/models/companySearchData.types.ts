export interface ICompanySearchFilters {
  nome?: string;
  nota?: number;
  receita?: string;
  tamanho?: string;
  ambiente?: number;
  aprendizado?: number;
  beneficios?: number;
  cultura?: number;
  efetivacao?: number;
  entrevista?: number;
  feedback?: number;
  infra?: number;
  integracao?: number;
  remuneracao?: number;
  rotina?: number;
  lideranca?: number;
  page?: number;
  size?: number;
}

export interface ICompanySearchItem {
  id: number;
  nomeFantasia: string;
  paisOrigem: string | null;
  estadoSede: string | null;
  fotoUrl: string | null;
  biografia: string | null;
  areaAtuacao: string | null;
  tamanhoEmpresa: string | null;
  mediaGeral: number;
}

export interface CompanySearchResponse {
  content: ICompanySearchItem[];
  totalPages: number;
}
