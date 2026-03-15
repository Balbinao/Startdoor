import { api } from '@config';
import { API_CONST } from '@constants';
import type {
  ICompanyRegister,
  IStudentRegister,
  IUserLogin,
} from '@models/registerLogin.types';

export const authService = {
  login: async (data: IUserLogin) => {
    const response = await api.post(API_CONST.AUTH.LOGIN_URL, data);
    return response;
  },

  studentRegister: async (data: IStudentRegister) => {
    const response = await api.post(API_CONST.AUTH.REGISTER_STUDENT_URL, data);
    return response.data;
  },

  companyRegister: async (data: ICompanyRegister) => {
    const response = await api.post(API_CONST.AUTH.REGISTER_COMPANY_URL, data);
    return response.data;
  },
};
