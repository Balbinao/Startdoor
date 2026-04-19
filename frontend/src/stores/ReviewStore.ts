import type { IReview } from '@models/review.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class ReviewStore {
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  reviewCards: IReview[] = [];
  review: IReview | null = null;

  setReviewCards = (items: IReview[]) => {
    this.reviewCards = items;
  };

  get getReviewCards() {
    return this.reviewCards;
  }

  setReview = (items: IReview) => {
    this.review = items;
  };

  get getReview() {
    return this.review;
  }
}
