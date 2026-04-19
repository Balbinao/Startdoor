import { useStore } from '@contexts/store/useStore';
import type { ICommentPayload } from '@models/comment.types';
import { commentService } from '@services/commentService';
import {
  normalizeCompanyComment,
  normalizeStudentComment,
} from '@utils/normalizeData';

export const useComment = () => {
  const { commentStore } = useStore();

  const comments = commentStore.getComments;

  const getAllReviewComments = async (
    reviewId: number,
    order: 'Mais recentes' | 'Mais antigas' = 'Mais recentes',
  ) => {
    try {
      const [students, companies] = await Promise.all([
        commentService.getCommentsStudents(reviewId),
        commentService.getCommentsCompanies(reviewId),
      ]);

      const normalized = [
        ...students.map(normalizeStudentComment),
        ...companies.map(normalizeCompanyComment),
      ];

      const sorted = normalized.sort((a, b) => {
        const diff =
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

        return order === 'Mais recentes' ? diff : -diff;
      });

      commentStore.setComments(sorted);

      return sorted;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createCommentStudent = async (
    reviewId: number,
    comment: ICommentPayload,
  ) => {
    try {
      const response = await commentService.createCommentStudent(
        reviewId,
        comment,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createCommentCompany = async (
    reviewId: number,
    comment: ICommentPayload,
  ) => {
    try {
      const response = await commentService.createCommentCompany(
        reviewId,
        comment,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateCommentStudent = async (
    commentId: number,
    comment: ICommentPayload,
  ) => {
    try {
      const response = await commentService.updateCommentStudent(
        commentId,
        comment,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateCommentCompany = async (
    commentId: number,
    comment: ICommentPayload,
  ) => {
    try {
      const response = await commentService.updateCommentCompany(
        commentId,
        comment,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteCommentStudent = async (commentId: number) => {
    try {
      const response = await commentService.deleteCommentStudent(commentId);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteCommentCompany = async (commentId: number) => {
    try {
      const response = await commentService.deleteCommentCompany(commentId);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    comments,
    getAllReviewComments,
    createCommentStudent,
    createCommentCompany,
    updateCommentStudent,
    updateCommentCompany,
    deleteCommentStudent,
    deleteCommentCompany,
  };
};
