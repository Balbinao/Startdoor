import { AuthStore } from './AuthStore';
import { CompanyRegistrationStore } from './CompanyRegistrationStore';
import { ExperienceStore } from './ExperienceStore';
import { ReviewStore } from './ReviewStore';
import { SectorStore } from './SectorStore';
import { StudentStore } from './StudentRegistrationStore';

export class RootStore {
  authStore: AuthStore;
  sectorStore: SectorStore;
  companyRegistrationStore: CompanyRegistrationStore;
  experienceStore: ExperienceStore;
  reviewStore: ReviewStore;
  studentStore: StudentStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.sectorStore = new SectorStore(this);
    this.companyRegistrationStore = new CompanyRegistrationStore(this);
    this.experienceStore = new ExperienceStore(this);
    this.reviewStore = new ReviewStore(this);
    this.studentStore = new StudentStore(this);
  }
}

export const rootStore = new RootStore();
