import { STORAGEKEYS_CONST } from '@constants';
import { useStore } from '@contexts/store/useStore';
import type {
  ICompanyRegistration,
  IStudentRegistration,
  IUserLogin,
} from '@models/registrationLogin.types';
import { authService } from '../services/authService';

export const useAuth = () => {
  const { authStore } = useStore();

  const login = async (data: IUserLogin) => {
    try {
      const response = await authService.login(data);

      if (!response) {
        throw new Error('Resposta inválida do Servidor ao efetuar login!');
      }
      authStore.login(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getUserId = (): string | null => {
    const id = localStorage.getItem(STORAGEKEYS_CONST.USER_ID);
    if (id && id !== 'undefined' && id !== 'null' && id !== '[object Object]') {
      return id;
    }
    return null;
  };

  const getUserRole = (): string | null => {
    const role = localStorage.getItem(STORAGEKEYS_CONST.USER_ROLE);
    if (
      role &&
      role !== 'undefined' &&
      role !== 'null' &&
      role !== '[object Object]'
    ) {
      return role;
    }
    return null;
  };

  const logout = () => {
    authStore.logout();
  };

  const studentRegistration = async (
    studentRegistrationData: IStudentRegistration,
  ) => {
    try {
      const response = await authService.studentRegistration(
        studentRegistrationData,
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const companyRegistration = async (
    companyRegistrationData: ICompanyRegistration,
  ) => {
    try {
      const response = await authService.companyRegistration(
        companyRegistrationData,
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    login,
    getUserId,
    getUserRole,
    logout,
    studentRegistration,
    companyRegistration,
  };
};
