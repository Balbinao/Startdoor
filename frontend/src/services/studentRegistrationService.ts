import { api } from '@config';
import { API_CONST } from '@constants';
import type { StudentProfileUpdateData } from '@schemas/studentProfileUpdateSchema';

export const studentRegistrationService = {
  getStudent: async (id: number): Promise<StudentProfileUpdateData> => {
    const response = await api.get(API_CONST.STUDENT.STUDENT_BY_ID(id));
    return response.data;
  },

  updateStudent: async (id: number, student: StudentProfileUpdateData) => {
    const response = await api.put(
      API_CONST.STUDENT.STUDENT_BY_ID(id),
      student,
    );
    return response.data;
  },
};
