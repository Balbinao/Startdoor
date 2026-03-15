import { useStore } from '@contexts/store/useStore';
import type {
  ICompanyRegister,
  IStudentRegister,
  IUserLogin,
} from '@models/registerLogin.types';
import { authService } from '../services/authService';

export const useAuth = () => {
  const { authStore } = useStore();

  const login = async (data: IUserLogin) => {
    try {
      const response = await authService.login(data);

      if (!response || !response.data) {
        throw new Error('Resposta inválida do Servidor ao efetuar login!');
      }

      authStore.login(response.data.toker);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    authStore.logout();
  };

  const studentRegister = async (studentRegisterData: IStudentRegister) => {
    try {
      const response = await authService.studentRegister(studentRegisterData);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const companyRegister = async (companyRegisterData: ICompanyRegister) => {
    try {
      const response = await authService.companyRegister(companyRegisterData);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { login, logout, studentRegister, companyRegister };
};
