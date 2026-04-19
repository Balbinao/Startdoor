import type { IInputOption } from '@models/input.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class SectorStore {
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  sectorsOptions: IInputOption[] = [];

  setSectorsOptions = (items: IInputOption[]) => {
    this.sectorsOptions = items;
  };

  get getSectorsOptions() {
    return this.sectorsOptions;
  }
}
