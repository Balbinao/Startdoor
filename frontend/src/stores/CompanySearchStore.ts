import type { ICompanySearchFilters } from '@models/companySearchData.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class CompanySearchStore {
  root: RootStore;

  storedFilters: ICompanySearchFilters = {};

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setStoredFilters = (filters: ICompanySearchFilters) => {
    this.storedFilters = filters;
  };

  get getStoredFilters() {
    return this.storedFilters;
  }
}
