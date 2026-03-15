import type { ICompany } from '@models/companyData.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class CompanyRegistrationStore {
  root: RootStore;

  company: ICompany | null = null;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setCompany = (comapny: ICompany) => {
    this.company = comapny;
  };

  get getCompany() {
    return this.company;
  }
}
