import type { ICompany } from '@models/companyData.types';
import Fuse from 'fuse.js'
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export interface ICompanySearchFilters {
  searchText: string;
  notaGeralMin: number;
  notaGeralMax: number;
  setorId: number;
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

export class CompanySearchStore {
  root: RootStore;

  companies: ICompany[] = [];
  isLoading = false;

  filters: ICompanySearchFilters = {
    searchText: '',
    notaGeralMin: 0,
    notaGeralMax: 0,
    setorId: 0,
    tamanhoEmpresa: '',
    receitaAnual: '',
    competenciaMin: 0,
    competenciaMax: 5,
    ambiente: 0,
    aprendizado: 0,
    beneficios: 0,
    cultura: 0,
    efetivacao: 0,
    entrevista: 0,
    feedback: 0,
    infraestrutura: 0,
    integracao: 0,
    remuneracao: 0,
    rotina: 0,
    lideranca: 0,
  };

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setCompanies = (companies: ICompany[]) => {
    this.companies = companies;
  };

  get getCompanies() {
    return this.companies;
  }

  setLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  get getIsLoading() {
    return this.isLoading;
  }

  setFilter = <K extends keyof ICompanySearchFilters>(
    key: K,
    value: ICompanySearchFilters[K],
  ) => {
    this.filters[key] = value;
  };

  get getFilters() {
    return this.filters;
  }

  resetFilters = () => {
    this.filters = {
      searchText: '',
      notaGeralMin: 0,
      notaGeralMax: 0,
      setorId: 0,
      tamanhoEmpresa: '',
      receitaAnual: '',
      competenciaMin: 0,
      competenciaMax: 5,
      ambiente: 0,
      aprendizado: 0,
      beneficios: 0,
      cultura: 0,
      efetivacao: 0,
      entrevista: 0,
      feedback: 0,
      infraestrutura: 0,
      integracao: 0,
      remuneracao: 0,
      rotina: 0,
      lideranca: 0,
    };
  };
  getFilteredCompanies = (): ICompany[] => {
  console.log('filters.searchText:', this.filters.searchText);
  console.log('filters.notaGeralMin:', this.filters.notaGeralMin);
  console.log('filters.notaGeralMax:', this.filters.notaGeralMax);

  let filtered = this.companies;

  if (this.filters.searchText) {
    const fuse = new Fuse(filtered, {
      keys: ['nomeFantasia'],
      threshold: 0.3,
    });

    filtered = fuse.search(this.filters.searchText).map(r => r.item);
  }
  return filtered.filter(company => {
    const matchesNota =
      (this.filters.notaGeralMin === 0 && this.filters.notaGeralMax === 0) ||
      (company.mediaNotaGeral !== undefined &&
        company.mediaNotaGeral >= this.filters.notaGeralMin &&
        company.mediaNotaGeral <= this.filters.notaGeralMax);

    const matchesSetor =
      this.filters.setorId === 0 || company.setor !== undefined;

    const matchesTamanho =
      !this.filters.tamanhoEmpresa ||
      company.tamanhoEmpresa === this.filters.tamanhoEmpresa;

    const matchesReceita =
      !this.filters.receitaAnual ||
      company.receitaAnual === this.filters.receitaAnual;

    let matchesCompetencias = true;
    if (this.filters.competenciaMin > 0 && company.competencias) {
      const values = Object.values(company.competencias).filter(
        v => v !== undefined,
      ) as number[];

      const avgCompetencia =
        values.length > 0
          ? values.reduce((a, b) => a + b, 0) / values.length
          : 0;

      matchesCompetencias =
        avgCompetencia >= this.filters.competenciaMin &&
        avgCompetencia <= this.filters.competenciaMax;
    }

    const matchesIndividualCompetencias = COMPETENCIAS_FILTERS.every(key => {
      const filterValue = this.filters[key];
      if (filterValue === 0) return true;

      const companyValue = company.competencias?.[key];
      if (companyValue === undefined) return true;

      return companyValue >= filterValue;
    });

    return (
      matchesNota &&
      matchesSetor &&
      matchesTamanho &&
      matchesReceita &&
      matchesCompetencias &&
      matchesIndividualCompetencias
    );
  });
}
}
