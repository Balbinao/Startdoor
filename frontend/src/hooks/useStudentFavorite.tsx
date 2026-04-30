import { useStore } from '@contexts/store/useStore';
import type { IEmpresaResumoBackend } from '@models/companySearchData.types';
import { useAuth } from '@hooks/useAuth';

export const useStudentFavorite = () => {
  const { studentFavoriteStore } = useStore();
  const { getUserId } = useAuth();

  const userId = getUserId();

  const favorites = studentFavoriteStore.getFavorites();
  const isLoading = studentFavoriteStore.isFavoriteLoading;

  const isFavorite = (empresaId: number): boolean => {
    return studentFavoriteStore.isFavorite(empresaId);
  };

  const toggleFavorite = (empresa: IEmpresaResumoBackend) => {
    if (!userId) return;
    studentFavoriteStore.toggleFavorite(empresa);
  };

  const loadFavorites = () => {
    if (!userId) return;
    studentFavoriteStore.loadFavorites();
  };

  return {
    favorites,
    isLoading,
    isFavorite,
    toggleFavorite,
    loadFavorites,
  };
};