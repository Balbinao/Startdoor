import type { ICompany } from '@models/companyData.types';
import type { RootStore } from './RootStore';
import { makeAutoObservable } from 'mobx';
import type { IStudentFavorite } from '@models/studentFavoriteData.types';

export class StudentFavoriteStore {
  root: RootStore;
  favorites: IStudentFavorite[] = [];
  favoriteCompanies: ICompany[] = [];
  isLoading = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  private getStoredFavorites(): IStudentFavorite[] {
    const stored = localStorage.getItem('student_favorites');
    return stored ? JSON.parse(stored) : [];
  }

  private getStoredCompanies(): ICompany[] {
    const stored = localStorage.getItem('student_favorite_companies');
    return stored ? JSON.parse(stored) : [];
  }

  private saveFavorites(favorites: IStudentFavorite[], companies: ICompany[]) {
    localStorage.setItem('student_favorites', JSON.stringify(favorites));
    localStorage.setItem('student_favorite_companies', JSON.stringify(companies));
  }

  loadFavorites(estudanteId: number) {
    this.favorites = this.getStoredFavorites().filter(f => f.estudanteId === estudanteId);
    this.favoriteCompanies = this.getStoredCompanies();
  }

  addFavorite(empresa: ICompany, estudanteId: number) {
    const exists = this.favorites.some(f => f.empresaId === empresa.id && f.estudanteId === estudanteId);
    if (exists) return;

    const newFavorite: IStudentFavorite = {
      id: Date.now(),
      empresaId: empresa.id,
      estudanteId,
    };

    this.favorites = [...this.favorites, newFavorite];
    this.favoriteCompanies = [...this.favoriteCompanies, empresa];
    this.saveFavorites(this.favorites, this.favoriteCompanies);
  }

  removeFavorite(empresaId: number, estudanteId: number) {
    this.favorites = this.favorites.filter(
      f => !(f.empresaId === empresaId && f.estudanteId === estudanteId)
    );
    this.favoriteCompanies = this.favoriteCompanies.filter(c => c.id !== empresaId);
    this.saveFavorites(this.favorites, this.favoriteCompanies);
  }

  isFavorite(empresaId: number): boolean {
    return this.favorites.some(f => f.empresaId === empresaId);
  }

  getFavorites(): ICompany[] {
    return this.favoriteCompanies;
  }

  get isFavoriteLoading() {
    return this.isLoading;
  }
}