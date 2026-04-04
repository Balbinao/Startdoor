import { AuthStore } from './AuthStore';
import { CompanyStore } from './CompanyStore';
import { ExperienceStore } from './ExperienceStore';
import { ReviewStore } from './ReviewStore';
import { SectorStore } from './SectorStore';
import { StudentStore } from './StudentStore';

export class RootStore {
  authStore: AuthStore;
  sectorStore: SectorStore;
  companyStore: CompanyStore;
  experienceStore: ExperienceStore;
  reviewStore: ReviewStore;
  studentStore: StudentStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.sectorStore = new SectorStore(this);
    this.companyStore = new CompanyStore(this);
    this.experienceStore = new ExperienceStore(this);
    this.reviewStore = new ReviewStore(this);
    this.studentStore = new StudentStore(this);
  }
}

export const rootStore = new RootStore();
