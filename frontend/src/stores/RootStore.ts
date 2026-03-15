import { AuthStore } from './AuthStore';
import { StudentRegistrationStore } from './StudentRegistrationStore';

export class RootStore {
  authStore: AuthStore;
  studentRegistrationStore: StudentRegistrationStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.studentRegistrationStore = new StudentRegistrationStore(this);
  }
}

export const rootStore = new RootStore();
