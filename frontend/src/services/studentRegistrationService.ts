import { api } from '@config';
import { API_CONST } from '@constants';
import type { IStudentRegistration } from '@models/registrationLogin.types';
import type {
  IConditionalScore,
  IStudent,
  IStudentUpdatePayload,
} from '@models/studentData.types';

export const studentService = {
  getStudent: async (id: number): Promise<IStudent> => {
    const response = await api.get(API_CONST.STUDENT.BY_ID(id));
    return response.data;
  },

  getStudents: async (): Promise<IStudent[]> => {
    const response = await api.get(API_CONST.STUDENT.BASE);
    return response.data;
  },

  studentRegistration: async (data: IStudentRegistration) => {
    const response = await api.post(API_CONST.STUDENT.REGISTRATION, data);
    return response.data;
  },

  updateStudent: async (id: number, student: IStudentUpdatePayload) => {
    const response = await api.put(API_CONST.STUDENT.BY_ID(id), student);
    return response.data;
  },

  updateStudentPassword: async (id: number, novaSenha: string) => {
    const response = await api.patch(API_CONST.STUDENT.BY_ID_PASSWORD(id), {
      novaSenha,
    });
    return response.data;
  },

  deleteStudent: async (id: number) => {
    const response = await api.delete(API_CONST.STUDENT.BY_ID(id));
    return response.data;
  },

  getConditionalScore: async (
    idStudent: number,
  ): Promise<IConditionalScore> => {
    const response = await api.get(
      API_CONST.CONDITIONAL_SCORE.BY_ID_STUDENT(idStudent),
    );
    return response.data;
  },

  updateConditionalScore: async (
    idStudent: number,
    conditionalScore: IConditionalScore,
  ): Promise<IConditionalScore> => {
    const response = await api.put(
      API_CONST.CONDITIONAL_SCORE.BY_ID_STUDENT(idStudent),
      conditionalScore,
    );
    return response.data;
  },
};
