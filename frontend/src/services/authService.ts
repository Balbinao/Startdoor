import { api } from '@config';
import { API_CONST } from '@constants';
import type {
  IUserLogin,
  IUserLoginResponse,
} from '@models/registrationLogin.types';

export const authService = {
  login: async (data: IUserLogin): Promise<IUserLoginResponse> => {
    const response = await api.post(API_CONST.AUTH.LOGIN_URL, data);
    return response.data;
  },
};
