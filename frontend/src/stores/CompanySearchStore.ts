import type { ICompany } from '@models/companyData.types';
import type { ICompanySearchFilters } from '@models/companySearchData.types';
import { COMPETENCIAS_FILTERS, COMPETENCIAS_LABELS } from '@models/companySearchData.types';
import {RootStore} from '@stores/RootStore'
import { makeAutoObservable } from 'mobx';
import { companySearchService } from '@services/companySearchService';

export type { ICompanySearchFilters };
export { COMPETENCIAS_FILTERS, COMPETENCIAS_LABELS };

export class CompanySearchStore {
  companies: ICompany[] = [];
  isLoading = false;
  hasMore = true;
  root: RootStore;

  filters: ICompanySearchFilters = {
    searchText: '',
    notaGeralMin: 0,
    notaGeralMax: 0,
    paisOrigem:'',
    estadoSede:'',
    setorId: 0,
    biografia:"",
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
    page: 0,
    size: 8,
  };

  constructor(root: RootStore) {
      this.root = root
    makeAutoObservable(this);
  }

  setCompanies = (companies: ICompany[]) => {
    this.companies = companies;
  };

  setHasMore = (value: boolean) => {
    this.hasMore = value;
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

  get getHasMore() {
    return this.hasMore;
  }

  searchCompaniesApi = async () => {
    this.filters.page = 0;
    this.setCompanies([]);
    this.setHasMore(true);
    this.setLoading(true);
    try {
      const response = await companySearchService.searchCompanies(this.filters);
     
      this.setCompanies(response.content);
      this.setHasMore(response.number + 1 < response.totalPages);
    } catch (error) {
      console.error('Error searching companies:', error);
    } finally {
      this.setLoading(false);
    }
  };

  loadMoreCompanies = async () => {
    if (!this.hasMore || this.isLoading) return;
    this.filters.page += 1;
    this.setLoading(true);
    try {
      const response = await companySearchService.searchCompanies(this.filters);
      this.setCompanies([...this.companies, ...response.content]);
      this.setHasMore(response.number + 1 < response.totalPages);
    } catch (error) {
      console.error('Error loading more companies:', error);
    } finally {
      this.setLoading(false);
    }
  };

  setFilter = <K extends keyof ICompanySearchFilters>(
    key: K,
    value: ICompanySearchFilters[K],
  ) => {
    this.filters[key] = value;
  };

  get getFilters() {
    return this.filters;
  }

  getFilteredCompanies = (): ICompany[] => {
    return this.companies;
  }
}
