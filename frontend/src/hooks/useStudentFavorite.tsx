import { studentFavoriteService } from '@services/studentFavoriteService';

export const useStudentFavorite = () => {
  const getFavorites = async () => {
    try {
      const response = await studentFavoriteService.getFavorites();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const toggleFavorite = async (empresaId: number) => {
    try {
      const response = await studentFavoriteService.toggleFavorite(empresaId);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    getFavorites,
    toggleFavorite,
  };
};
