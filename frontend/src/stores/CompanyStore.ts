import type { ICompany } from '@models/companyData.types';
import type { IInputOption } from '@models/input.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class CompanyStore {
  root: RootStore;

  company: ICompany | null = null;
  statisticsFirstCompany: ICompany | null = null;
  statisticsSecondCompany: ICompany | null = null;

  companies: ICompany[] = [];
  companiesOptions: IInputOption[] = [];
  companySectors: IInputOption[] = [];
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

  setStatisticsFirstCompany = (company: ICompany) => {
    this.statisticsFirstCompany = company;
  };

  get getStatisticsFirstCompany() {
    return this.statisticsFirstCompany;
  }

  setStatisticsSecondCompany = (company: ICompany) => {
    this.statisticsSecondCompany = company;
  };

  get getStatisticsSecondCompany() {
    return this.statisticsSecondCompany;
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

  setCompaniesSectors = (companiesSectors: IInputOption[]) => {
    this.companySectors = companiesSectors;
  };

  get getCompaniesSectors() {
    return this.companySectors;
  }
}
