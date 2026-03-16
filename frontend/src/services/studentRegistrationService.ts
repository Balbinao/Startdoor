import { api } from '@config';
import { API_CONST } from '@constants';
import type { IStudent } from '@models/studentData.types';
import type { StudentProfileUpdateData } from '@schemas/studentProfileUpdateSchema';

export const studentRegistrationService = {
  getStudent: async (id: number): Promise<IStudent> => {
    const response = await api.get(API_CONST.STUDENT.BY_ID(id));
    return response.data;
  },

  updateStudent: async (id: number, student: StudentProfileUpdateData) => {
    const response = await api.put(API_CONST.STUDENT.BY_ID(id), student);
    return response.data;
  },

  deleteStudent: async (id: number) => {
    const response = await api.delete(API_CONST.STUDENT.BY_ID(id));
    return response.data;
  },
};
