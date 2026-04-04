import type {
  IAcademicExperience,
  IProfessionalExperience,
} from '@models/experience.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class ExperienceStore {
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  academicExperienceCard: IAcademicExperience | null = null;
  academicExperienceCards: IAcademicExperience[] = [];
  professionalExperienceCard: IProfessionalExperience | null = null;
  academicProfessionalCards: IProfessionalExperience[] = [];

  setAcademicExperienceCard = (items: IAcademicExperience) => {
    this.academicExperienceCard = items;
  };

  get getAcademicExperienceCard() {
    return this.academicExperienceCard;
  }

  setAcademicExperienceCards = (items: IAcademicExperience[]) => {
    this.academicExperienceCards = items;
  };

  get getAcademicExperienceCards() {
    return this.academicExperienceCards;
  }

  setProfessionalExperienceCard = (items: IProfessionalExperience) => {
    this.professionalExperienceCard = items;
  };

  get getProfessionalExperienceCard() {
    return this.professionalExperienceCard;
  }

  setProfessionalExperienceCards = (items: IProfessionalExperience[]) => {
    this.academicProfessionalCards = items;
  };

  get getProfessionalExperienceCards() {
    return this.academicProfessionalCards;
  }
}
