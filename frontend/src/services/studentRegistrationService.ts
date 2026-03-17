import { api } from '@config';
import { API_CONST } from '@constants';
import type { IStudentRegistration } from '@models/registrationLogin.types';
import type {
  IStudent,
  IUpdateStudentPassword,
} from '@models/studentData.types';
import type { StudentProfileUpdateData } from '@schemas/studentProfileUpdateSchema';

export const studentRegistrationService = {
  getStudent: async (id: number): Promise<IStudent> => {
    const response = await api.get(API_CONST.STUDENT.BY_ID(id));
    return response.data;
  },

  studentRegistration: async (data: IStudentRegistration) => {
    const response = await api.post(API_CONST.STUDENT.REGISTRATION, data);
    return response.data;
  },

  updateStudent: async (id: number, student: StudentProfileUpdateData) => {
    const response = await api.put(API_CONST.STUDENT.BY_ID(id), student);
    return response.data;
  },

  updateStudentPassword: async (
    id: number,
    passwordData: IUpdateStudentPassword,
  ) => {
    const response = await api.patch(
      API_CONST.STUDENT.BY_ID_PASSWORD(id),
      passwordData,
    );
    return response.data;
  },

  deleteStudent: async (id: number) => {
    const response = await api.delete(API_CONST.STUDENT.BY_ID(id));
    return response.data;
  },
};
