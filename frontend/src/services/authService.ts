import { api } from '@config';
import { API_CONST } from '@constants';
import type {
  ICompanyRegistration,
  IStudentRegistration,
  IUserLogin,
  IUserLoginResponse,
} from '@models/registrationLogin.types';

export const authService = {
  login: async (data: IUserLogin): Promise<IUserLoginResponse> => {
    const response = await api.post(API_CONST.AUTH.LOGIN_URL, data);
    return response.data;
  },

  studentRegistration: async (data: IStudentRegistration) => {
    const response = await api.post(
      API_CONST.AUTH.REGISTRATION_STUDENT_URL,
      data,
    );
    return response.data;
  },

  companyRegistration: async (data: ICompanyRegistration) => {
    const response = await api.post(
      API_CONST.AUTH.REGISTRATION_COMPANY_URL,
      data,
    );
    return response.data;
  },
};
