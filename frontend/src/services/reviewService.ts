import { api } from '@config';
import { API_CONST } from '@constants';
import type { IReviewCard } from '@models/review.types';

export const reviewService = {
  getReviewCards: async (id: number): Promise<IReviewCard[]> => {
    const response = await api.get(API_CONST.REVIEW.BY_ID(id));
    return response.data;
  },
};
