import type { ICompany } from '@models/companyData.types';
import type { IInputOption } from '@models/input.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class CompanyStore {
  root: RootStore;

  company: ICompany | null = null;
  companies: ICompany[] = [];
  companiesOptions: IInputOption[] = [];

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setCompany = (company: ICompany) => {
    this.company = company;
  };

  get getCompany() {
    return this.company;
  }

  setCompanies = (companies: ICompany[]) => {
    this.companies = companies;
  };

  get getCompanies() {
    return this.companies;
  }

  setCompaniesOptions = (companiesOptions: IInputOption[]) => {
    this.companiesOptions = companiesOptions;
  };

  get getCompaniesOptions() {
    return this.companiesOptions;
  }
}
