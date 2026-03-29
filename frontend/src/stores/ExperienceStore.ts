import type { IAcademicExperience } from '@models/experience.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class ExperienceStore {
  root: RootStore;

  academicExperienceItems: IAcademicExperience[] = [];

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setAcademicExperienceItems = (items: IAcademicExperience[]) => {
    this.academicExperienceItems = items;
  };

  get getAcademicExperienceItems() {
    return this.academicExperienceItems;
  }
}
