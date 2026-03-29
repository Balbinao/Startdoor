import { api } from '@config';
import { API_CONST } from '@constants';
import type { IAcademicExperience } from '@models/experience.types';
import type { AcademicExperienceCardData } from '@schemas/academicExperienceCardSchema';

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
};
