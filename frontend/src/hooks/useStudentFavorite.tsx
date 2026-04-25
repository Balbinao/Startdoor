import { useCallback } from 'react';
import { useStore } from '@contexts/store/useStore';
import type { ICompany } from '@models/companyData.types';
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

  const toggleFavorite =useCallback((empresa: ICompany) => {
  if (!userId) return;
  
  if (isFavorite(empresa.id)) {
    studentFavoriteStore.removeFavorite(empresa.id, userId);
  } else {
    studentFavoriteStore.addFavorite(empresa, userId);
  }
}, [userId, isFavorite]);

  const loadFavorites = useCallback(() => {
  if (!userId) return;
  studentFavoriteStore.loadFavorites(userId);
}, [userId]);

  return {
    favorites,
    isLoading,
    isFavorite,
    toggleFavorite,
    loadFavorites,
  };
};