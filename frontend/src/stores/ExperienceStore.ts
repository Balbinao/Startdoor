import type {
  IAcademicExperience,
  IProfessionalExperience,
} from '@models/experience.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class ExperienceStore {
  root: RootStore;

  academicExperienceCards: IAcademicExperience[] = [];
  academicProfessionalCards: IProfessionalExperience[] = [];

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setAcademicExperienceCards = (items: IAcademicExperience[]) => {
    this.academicExperienceCards = items;
  };

  get getAcademicExperienceCards() {
    return this.academicExperienceCards;
  }

  setProfessionalExperienceCards = (items: IProfessionalExperience[]) => {
    this.academicProfessionalCards = items;
  };

  get getProfessionalExperienceCards() {
    return this.academicProfessionalCards;
  }
}
