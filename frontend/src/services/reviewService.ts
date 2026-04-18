import { api } from '@config';
import { API_CONST } from '@constants';
import type { IReview, IReviewCardCompanyView, IReviewCardStudentView } from '@models/review.types';
import type { ReviewData } from '@schemas/reviewSchema';

export const reviewService = {
  getReviewCardsStudent: async (id: number): Promise<IReviewCardStudentView[]> => {
    const response = await api.get(API_CONST.REVIEW.STUDENT_BY_ID_REVIEWS(id));
    return response.data;
  },

  getReviewCardsCompany: async (id: number): Promise<IReviewCardCompanyView[]> => {
    const response = await api.get(API_CONST.REVIEW.COMPANY_BY_ID_REVIEW(id));
    return response.data;
  },

  getReview: async (id: number): Promise<IReview> => {
    const response = await api.get(API_CONST.REVIEW.STUDENT_REVIEW_BY_ID(id));
    return response.data;
  },

  createReview: async (id: number, review: ReviewData) => {
    const response = await api.post(
      API_CONST.REVIEW.STUDENT_REVIEW_BY_ID(id),
      review,
    );
    return response.data;
  },

  updateReview: async (id: number, review: ReviewData) => {
    const response = await api.put(
      API_CONST.REVIEW.STUDENT_REVIEW_BY_ID(id),
      review,
    );
    return response.data;
  },

  deleteReview: async (id: number) => {
    const response = await api.delete(
      API_CONST.REVIEW.STUDENT_REVIEW_BY_ID(id),
    );
    return response.data;
  },
};
