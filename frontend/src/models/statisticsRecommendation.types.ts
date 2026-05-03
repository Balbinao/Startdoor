interface IStrongWeakPointItem {
  titulo: string;
  porcentagem: number;
  estudanteNota: number;
  empresaNota: number;
}

export interface IStrongWeakPointTable {
  pontosFortes: IStrongWeakPointItem[];
  pontosFracos: IStrongWeakPointItem[];
}

export interface ICompanyRecommendation {
  id: number;
  fotoUrl?: string | null;
  nomeFantasia: string;
  estadoSede?: string;
  dataFundacao?: string | null;
  biografia?: string;
  mediaGeral?: number;
  porcentagemCompatibilidade: number;
}
