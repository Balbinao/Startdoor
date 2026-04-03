import type { IInputOption } from '@models/input.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class SectorStore {
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  sectors: IInputOption[] = [];

  setSectors = (items: IInputOption[]) => {
    this.sectors = items;
  };

  get getSectors() {
    return this.sectors;
  }
}
