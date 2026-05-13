import { api } from '@config';
import { API_CONST } from '@constants';
import type {
  IUserLogin,
  IUserLoginForgotPassword,
  IUserLoginResetPassword,
  IUserLoginResponse,
} from '@models/registrationLogin.types';

export const authService = {
  login: async (data: IUserLogin): Promise<IUserLoginResponse> => {
    const response = await api.post(API_CONST.AUTH.LOGIN_URL, data);
    return response.data;
  },

  forgotPassword: async (data: IUserLoginForgotPassword) => {
    const response = await api.post(API_CONST.AUTH.FORGOT_PASSWORD, data);
    return response.data;
  },

  resetPassword: async (data: IUserLoginResetPassword) => {
    const response = await api.post(API_CONST.AUTH.RESET_PASSWORD, data);
    return response.data;
  },
};
