import { api } from '@config';
import { API_CONST } from '@constants';
import type { IEmpresaResumoBackend } from '@models/companySearchData.types';

export const studentFavoriteService = {
  getFavorites: async (): Promise<IEmpresaResumoBackend[]> => {
    const response = await api.get(API_CONST.STUDENT.FAVORITES);
    return response.data;
  },

  isFavorite: async (empresaId: number): Promise<boolean> => {
    const response = await api.post(API_CONST.STUDENT.BY_ID_FAVORITE(empresaId));
    return response.data;
  },

  toggleFavorite: async (empresaId: number): Promise<boolean> => {
    const response = await api.post(API_CONST.STUDENT.BY_ID_FAVORITE(empresaId));
    return response.data;
  },
};