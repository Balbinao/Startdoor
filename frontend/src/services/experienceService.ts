import { api } from '@config';
import { API_CONST } from '@constants';
import type { IAcademicExperience } from '@models/experience.types';
import type { AcademicExperienceCardData } from '@schemas/academicExperienceCardSchema';
import type { ProfessionalExperienceCardData } from '@schemas/professionalExperienceCardSchema';

export const experienceService = {
  getAcademicExperienceCards: async (
    id: number,
  ): Promise<IAcademicExperience[]> => {
    const response = await api.get(API_CONST.EXPERIENCE.ACADEMIC_BY_ID(id));
    return response.data;
  },

  createAcademicExperienceCard: async (
    id: number,
    company: AcademicExperienceCardData,
  ) => {
    const response = await api.post(
      API_CONST.EXPERIENCE.ACADEMIC_BY_ID(id),
      company,
    );
    return response.data;
  },

  updateAcademicExperienceCard: async (
    id: number,
    company: AcademicExperienceCardData,
  ) => {
    const response = await api.put(
      API_CONST.EXPERIENCE.ACADEMIC_BY_ID(id),
      company,
    );
    return response.data;
  },

  getProfessionalExperienceCards: async (
    id: number,
  ): Promise<IAcademicExperience[]> => {
    const response = await api.get(API_CONST.EXPERIENCE.PROFESSIONAL_BY_ID(id));
    return response.data;
  },

  createProfessionalExperienceCard: async (
    id: number,
    company: ProfessionalExperienceCardData,
  ) => {
    const response = await api.post(
      API_CONST.EXPERIENCE.PROFESSIONAL_BY_ID(id),
      company,
    );
    return response.data;
  },

  updateProfessionalExperienceCard: async (
    id: number,
    company: ProfessionalExperienceCardData,
  ) => {
    const response = await api.put(
      API_CONST.EXPERIENCE.PROFESSIONAL_BY_ID(id),
      company,
    );
    return response.data;
  },
};
