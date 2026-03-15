import type { StudentProfileUpdateData } from '@schemas/studentProfileUpdateSchema';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class StudentRegistrationStore {
  root: RootStore;

  student: StudentProfileUpdateData | null = null;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setStudent = (student: StudentProfileUpdateData) => {
    this.student = student;
  };

  get getStudent() {
    return this.student;
  }
}
