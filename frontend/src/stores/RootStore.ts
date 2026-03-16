import { AuthStore } from './AuthStore';
import { CompanyRegistrationStore } from './CompanyRegistrationStore';
import { StudentRegistrationStore } from './StudentRegistrationStore';

export class RootStore {
  authStore: AuthStore;
  studentRegistrationStore: StudentRegistrationStore;
  companyRegistrationStore: CompanyRegistrationStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.studentRegistrationStore = new StudentRegistrationStore(this);
    this.companyRegistrationStore = new CompanyRegistrationStore(this);
  }
}

export const rootStore = new RootStore();
