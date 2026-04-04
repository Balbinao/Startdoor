import type { IConditionalScore, IStudent } from '@models/studentData.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class StudentStore {
  root: RootStore;

  student: IStudent | null = null;
  conditinalScore: IConditionalScore | null = null;

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

  setConditionalScore = (conditinalScore: IConditionalScore) => {
    this.conditinalScore = conditinalScore;
  };

  get getConditionalScore() {
    return this.conditinalScore;
  }
}
