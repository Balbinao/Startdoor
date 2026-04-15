import { AuthStore } from './AuthStore';
import { CommentStore } from './CommentStore';
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
  commentStore: CommentStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.sectorStore = new SectorStore(this);
    this.companyStore = new CompanyStore(this);
    this.experienceStore = new ExperienceStore(this);
    this.reviewStore = new ReviewStore(this);
    this.studentStore = new StudentStore(this);
    this.commentStore = new CommentStore(this);
  }
}

export const rootStore = new RootStore();
