import { api } from '@config';
import { API_CONST } from '@constants';
import type {
  IAcademicExperience,
  IAcademicExperiencePayload,
  IProfessionalExperience,
  IProfessionalExperiencePayload,
} from '@models/experience.types';

export const experienceService = {
  getAcademicExperienceCard: async (
    id: number,
  ): Promise<IAcademicExperience> => {
    const response = await api.get(API_CONST.EXPERIENCE.ACADEMIC_BY_ID(id));
    return response.data;
  },

  getAcademicExperienceCards: async (
    id: number,
  ): Promise<IAcademicExperience[]> => {
    const response = await api.get(
      API_CONST.EXPERIENCE.ACADEMIC_STUDENT_BY_ID(id),
    );
    return response.data;
  },

  createAcademicExperienceCard: async (
    id: number,
    experience: IAcademicExperiencePayload,
  ) => {
    const response = await api.post(
      API_CONST.EXPERIENCE.ACADEMIC_STUDENT_BY_ID(id),
      experience,
    );
    return response.data;
  },

  updateAcademicExperienceCard: async (
    id: number,
    experience: IAcademicExperiencePayload,
  ) => {
    const response = await api.put(
      API_CONST.EXPERIENCE.ACADEMIC_BY_ID(id),
      experience,
    );
    return response.data;
  },

  deleteAcademicExperienceCard: async (id: number) => {
    const response = await api.delete(API_CONST.EXPERIENCE.ACADEMIC_BY_ID(id));
    return response.data;
  },

  getProfessionalExperienceCard: async (
    id: number,
  ): Promise<IProfessionalExperience> => {
    const response = await api.get(API_CONST.EXPERIENCE.PROFESSIONAL_BY_ID(id));
    return response.data;
  },

  getProfessionalExperienceCards: async (
    id: number,
  ): Promise<IProfessionalExperience[]> => {
    const response = await api.get(
      API_CONST.EXPERIENCE.PROFESSIONAL_STUDENT_BY_ID(id),
    );
    return response.data;
  },

  createProfessionalExperienceCard: async (
    id: number,
    experience: IProfessionalExperiencePayload,
  ) => {
    const response = await api.post(
      API_CONST.EXPERIENCE.PROFESSIONAL_STUDENT_BY_ID(id),
      experience,
    );
    return response.data;
  },

  updateProfessionalExperienceCard: async (
    id: number,
    experience: IProfessionalExperiencePayload,
  ) => {
    const response = await api.put(
      API_CONST.EXPERIENCE.PROFESSIONAL_BY_ID(id),
      experience,
    );
    return response.data;
  },

  deleteProfessionalExperienceCard: async (id: number) => {
    const response = await api.delete(
      API_CONST.EXPERIENCE.PROFESSIONAL_BY_ID(id),
    );
    return response.data;
  },
};
