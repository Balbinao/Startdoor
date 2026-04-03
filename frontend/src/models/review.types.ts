export interface IReviewCard {
  source: 'Empresa' | 'Estudante';
  nomeEmpresa?: string;
  nomeEstudante?: string;
  tituloCargo: string;
  notaMedia: number;
  textoAvaliacao: string;
  dataPublicacao: string;
  numApoios: number;
  numComents: number;
}
