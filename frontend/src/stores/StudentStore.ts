import type { IInputOption } from '@models/input.types';
import type { IConditionalScore, IStudent } from '@models/studentData.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class StudentStore {
  root: RootStore;

  student: IStudent | null = null;
  students: IStudent[] = [];
  studentsOptions: IInputOption[] = [];
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

  setStudents = (students: IStudent[]) => {
    this.students = students;
  };

  get getStudents() {
    return this.students;
  }

  setStudentsOptions = (studentsOptions: IInputOption[]) => {
    this.studentsOptions = studentsOptions;
  };

  get getStudentsOptions() {
    return this.studentsOptions;
  }

  setConditionalScore = (conditinalScore: IConditionalScore) => {
    this.conditinalScore = conditinalScore;
  };

  get getConditionalScore() {
    return this.conditinalScore;
  }
}
