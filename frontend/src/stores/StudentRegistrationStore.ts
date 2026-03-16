import type { IStudent } from '@models/studentData.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class StudentRegistrationStore {
  root: RootStore;

  student: IStudent | null = null;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setStudent = (student: IStudent) => {
    this.student = student;
  };

  get getStudent() {
    return this.student;
  }
}
