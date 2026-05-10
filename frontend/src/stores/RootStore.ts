import { AuthStore } from './AuthStore';
import { CommentStore } from './CommentStore';
import { CompanyStore } from './CompanyStore';
import { ExperienceStore } from './ExperienceStore';
import { ReviewStore } from './ReviewStore';
import { SectorStore } from './SectorStore';
import { StudentStore } from './StudentStore';
import { CompanySearchStore } from './CompanySearchStore';

export class RootStore {
  authStore: AuthStore;
  sectorStore: SectorStore;
  companyStore: CompanyStore;
  experienceStore: ExperienceStore;
  reviewStore: ReviewStore;
  studentStore: StudentStore;
  commentStore: CommentStore;
  companySearchStore: CompanySearchStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.sectorStore = new SectorStore(this);
    this.companyStore = new CompanyStore(this);
    this.experienceStore = new ExperienceStore(this);
    this.reviewStore = new ReviewStore(this);
    this.studentStore = new StudentStore(this);
    this.commentStore = new CommentStore(this);
    this.companySearchStore = new CompanySearchStore(this);
  }
}

export const rootStore = new RootStore();
