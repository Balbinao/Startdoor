import type {
  IReview,
  IReviewCardCompanyView,
  IReviewCardStudentView,
} from '@models/review.types';
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export class ReviewStore {
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  reviewCards: (IReviewCardCompanyView | IReviewCardStudentView)[] = [];
  review: IReview | null = null;

  setReviewCards = (
    items: (IReviewCardCompanyView | IReviewCardStudentView)[],
  ) => {
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
