import { useStore } from '@contexts/store/useStore';
import type { IReviewPayload } from '@models/review.types';
import { reviewService } from '@services/reviewService';

export const useReview = () => {
  const { reviewStore } = useStore();

  const reviewCards = reviewStore.getReviewCards;
  const review = reviewStore.getReview;

  const getReviewCardsStudent = async (id: number) => {
    try {
      const response = await reviewService.getReviewCardsStudent(id);
      reviewStore.setReviewCards(response);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getReviewCardsCompany = async (id: number) => {
    try {
      const response = await reviewService.getReviewCardsCompany(id);
      reviewStore.setReviewCards(response);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getReview = async (id: number) => {
    try {
      const response = await reviewService.getReview(id);
      reviewStore.setReview(response);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createReview = async (id: number, review: IReviewPayload) => {
    try {
      const response = await reviewService.createReview(id, review);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateReview = async (id: number, review: IReviewPayload) => {
    try {
      const response = await reviewService.updateReview(id, review);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteReview = async (id: number) => {
    try {
      const response = await reviewService.deleteReview(id);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    reviewCards,
    review,
    getReviewCardsStudent,
    getReviewCardsCompany,
    getReview,
    createReview,
    updateReview,
    deleteReview,
  };
};
