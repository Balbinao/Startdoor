import { ROUTES_CONST, STORAGEKEYS_CONST } from '@constants';
import { useStore } from '@contexts/store/useStore';
import type { IUserLogin } from '@models/registrationLogin.types';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const useAuth = () => {
  const { authStore } = useStore();
  const navigate = useNavigate();

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

  const getUserId = (): number | null => {
    const id = localStorage.getItem(STORAGEKEYS_CONST.USER_ID);
    if (id && id !== 'undefined' && id !== 'null' && id !== '[object Object]') {
      return Number(id);
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

  const clearFullLocalStorage = () => {
    authStore.clear();
  };

  const logout = () => {
    clearFullLocalStorage();
    navigate(ROUTES_CONST.LOGIN, { replace: true });
  };

  return {
    login,
    getUserId,
    getUserRole,
    clearFullLocalStorage,
    logout,
  };
};
