import { AuthStore } from './AuthStore';
import { CompanyRegistrationStore } from './CompanyRegistrationStore';
import { ExperienceStore } from './ExperienceStore';
import { StudentRegistrationStore } from './StudentRegistrationStore';

export class RootStore {
  authStore: AuthStore;
  companyRegistrationStore: CompanyRegistrationStore;
  experienceStore: ExperienceStore;
  studentRegistrationStore: StudentRegistrationStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.companyRegistrationStore = new CompanyRegistrationStore(this);
    this.experienceStore = new ExperienceStore(this);
    this.studentRegistrationStore = new StudentRegistrationStore(this);
  }
}

export const rootStore = new RootStore();
