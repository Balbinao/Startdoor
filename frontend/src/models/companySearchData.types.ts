export interface ICompanySearchFilters {
  searchText: string;
  notaGeralMin: number;
  notaGeralMax: number;
  setorId: number;
  paisOrigem: string;
  estadoSede: string;
  biografia: string;
  tamanhoEmpresa: string;
  receitaAnual: string;
  competenciaMin: number;
  competenciaMax: number;
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
  page: number;
  size: number;
}


export interface IEmpresaResumoBackend {
  id: number;
  uuid: string;
  nomeFantasia: string;
  fotoUrl: string | null;
  areaAtuacao: string | null;
  tamanhoEmpresa: string | null;
  mediaGeral: number;
  paisOrigem: string;
  estadoSede: string;
  biografia: string;
}


export const COMPETENCIAS_FILTERS = [
  'ambiente',
  'aprendizado',
  'beneficios',
  'cultura',
  'efetivacao',
  'entrevista',
  'feedback',
  'infraestrutura',
  'integracao',
  'remuneracao',
  'rotina',
  'lideranca',
] as const;

export const COMPETENCIAS_LABELS: Record<string, string> = {
  ambiente: 'Ambiente',
  aprendizado: 'Aprendizado',
  beneficios: 'Benefícios',
  cultura: 'Cultura',
  efetivacao: 'Efetivação',
  entrevista: 'Entrevista',
  feedback: 'Feedback',
  infraestrutura: 'Infraestrutura',
  integracao: 'Integração',
  remuneracao: 'Remuneração',
  rotina: 'Rotina',
  lideranca: 'Liderança',
};

export interface IPaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
