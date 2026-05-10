export interface IStrongWeakPointItem {
  competencia: string;
  percentual: number;
  notaEmpresa: number;
  notaEstudante: number;
}

export interface IStrongWeakPoint {
  pontosFortes: IStrongWeakPointItem[];
  pontosFracos: IStrongWeakPointItem[];
}

export interface ICompanyRecommendation {
  id: number;
  fotoUrl?: string | null;
  nomeFantasia: string;
  estadoSede?: string;
  paisOrigem?: string;
  biografia?: string;
  mediaGeral?: number;
  percentualMatch: number;
}
