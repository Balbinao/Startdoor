import type { IReviewCard } from '@models/review.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class ReviewStore {
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  reviewCards: IReviewCard[] = [];

  setReviewCards = (items: IReviewCard[]) => {
    this.reviewCards = items;
  };

  get getReviewCards() {
    return this.reviewCards;
  }
}
