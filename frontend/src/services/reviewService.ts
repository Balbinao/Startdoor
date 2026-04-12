import { api } from '@config';
import { API_CONST } from '@constants';
import type { IReview, IReviewCard } from '@models/review.types';
import type { ReviewData } from '@schemas/reviewSchema';

export const reviewService = {
  getReviewCards: async (id: number): Promise<IReviewCard[]> => {
    const response = await api.get(API_CONST.REVIEW.CARD_BY_ID(id));
    return response.data;
  },

  getReview: async (id: number): Promise<IReview> => {
    const response = await api.get(API_CONST.REVIEW.BY_ID(id));
    return response.data;
  },

  createReview: async (id: number, review: ReviewData) => {
    const response = await api.post(API_CONST.REVIEW.BY_ID(id), review);
    return response.data;
  },

  updateReview: async (id: number, review: ReviewData) => {
    const response = await api.put(API_CONST.REVIEW.BY_ID(id), review);
    return response.data;
  },

  deleteReview: async (id: number) => {
    const response = await api.delete(API_CONST.REVIEW.BY_ID(id));
    return response.data;
  },
};
