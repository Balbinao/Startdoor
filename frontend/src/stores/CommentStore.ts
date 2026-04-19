import type { IComment } from '@models/comment.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class CommentStore {
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  comments: IComment[] = [];

  setComments = (items: IComment[]) => {
    this.comments = items;
  };

  get getComments() {
    return this.comments;
  }
}
