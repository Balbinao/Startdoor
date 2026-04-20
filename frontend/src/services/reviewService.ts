import { api } from '@config';
import { API_CONST } from '@constants';
import type { IReview, IReviewPayload } from '@models/review.types';

export const reviewService = {
  getReviewCardsStudent: async (id: number): Promise<IReview[]> => {
    const response = await api.get(API_CONST.REVIEW.STUDENT_REVIEW_BY_ID(id));
    return response.data;
  },

  getReviewCardsCompany: async (id: number): Promise<IReview[]> => {
    const response = await api.get(API_CONST.REVIEW.COMPANY_BY_ID_REVIEW(id));
    return response.data;
  },

  getReview: async (id: number): Promise<IReview> => {
    const response = await api.get(API_CONST.REVIEW.BY_ID(id));
    return response.data;
  },

  createReview: async (id: number, review: IReviewPayload) => {
    const response = await api.post(
      API_CONST.REVIEW.STUDENT_REVIEW_BY_ID(id),
      review,
    );
    return response.data;
  },

  updateReview: async (id: number, review: IReviewPayload) => {
    const response = await api.put(API_CONST.REVIEW.BY_ID(id), review);
    return response.data;
  },

  deleteReview: async (id: number) => {
    const response = await api.delete(API_CONST.REVIEW.BY_ID(id));
    return response.data;
  },
};
