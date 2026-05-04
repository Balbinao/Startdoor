import type { IEmpresaResumoBackend } from '@models/companySearchData.types';
import { studentFavoriteService } from '@services/studentFavoriteService';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class StudentFavoriteStore {
  root: RootStore;
  favorites: IEmpresaResumoBackend[] = [];
  isLoading = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setFavorites = (favorites: IEmpresaResumoBackend[]) => {
    this.favorites = favorites;
  };

  setLoading = (loading: boolean) => {
    this.isLoading = loading;
  };

  loadFavorites = async () => {
    this.setLoading(true);
    try {
      const companies = await studentFavoriteService.getFavorites();
      this.setFavorites(companies);
    } catch (error) {
      console.error('Error loading favorites:', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  };

  toggleFavorite = async (empresa: IEmpresaResumoBackend) => {
    try {
      const isNowFavorite = await studentFavoriteService.toggleFavorite(
        empresa.id,
      );

      if (isNowFavorite) {
        if (!this.favorites.some(f => f.id === empresa.id)) {
          this.setFavorites([...this.favorites, empresa]);
        }
      } else {
        this.setFavorites(this.favorites.filter(f => f.id !== empresa.id));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  isFavorite = (empresaId: number): boolean => {
    return this.favorites.some(f => f.id === empresaId);
  };

  getFavorites = (): IEmpresaResumoBackend[] => {
    return this.favorites;
  };

  get isFavoriteLoading() {
    return this.isLoading;
  }
}
