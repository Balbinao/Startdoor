import { STORAGEKEYS_CONST } from '@constants';
import type { IStudentData } from '@models/studentData.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class AuthStore {
  root: RootStore;

  user: IStudentData | null = null;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    return !!this.user;
  }

  login(token: string) {
    localStorage.setItem(STORAGEKEYS_CONST.ACCESS_TOKEN, token);
  }

  logout() {
    localStorage.removeItem(STORAGEKEYS_CONST.ACCESS_TOKEN);
    this.user = null;
  }

  setUser(userData: IStudentData) {
    this.user = userData;
  }
}
