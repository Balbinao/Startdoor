import { STORAGEKEYS_CONST } from '@constants';
import type { IUserLoginResponse } from '@models/registerLogin.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class AuthStore {
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    const token = localStorage.getItem(STORAGEKEYS_CONST.ACCESS_TOKEN);

    if (
      token &&
      typeof token === 'string' &&
      token !== 'undefined' &&
      token !== 'null' &&
      token !== '[object Object]'
    ) {
      return true;
    }

    return false;
  }

  login(response: IUserLoginResponse) {
    localStorage.setItem(STORAGEKEYS_CONST.ACCESS_TOKEN, response.token);
    localStorage.setItem(STORAGEKEYS_CONST.USER_ROLE, response.tipo);
    localStorage.setItem(STORAGEKEYS_CONST.USER_ID, response.id.toString());
  }

  logout() {
    localStorage.removeItem(STORAGEKEYS_CONST.ACCESS_TOKEN);
    localStorage.removeItem(STORAGEKEYS_CONST.USER_ROLE);
    localStorage.removeItem(STORAGEKEYS_CONST.USER_ID);
  }
}
