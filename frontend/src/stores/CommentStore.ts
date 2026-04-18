import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';
import type { ICommentStudent } from '@models/comment.types';

export class CommentStore {
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  comments: ICommentStudent[] = [];

  setComments = (items: ICommentStudent[]) => {
    this.comments = items;
  };

  get getComments() {
    return this.comments;
  }
}
