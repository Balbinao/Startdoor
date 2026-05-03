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
