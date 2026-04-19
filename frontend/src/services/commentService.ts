import { api } from '@config';
import { API_CONST } from '@constants';
import type { CommentData } from '@schemas/commentSchema';

export const commentService = {
  getCommentsStudents: async (reviewId: number) => {
    const response = await api.get(
      API_CONST.COMMENT.REVIEW_BY_ID_COMMENTS_STUDENT(reviewId),
    );
    return response.data;
  },

  getCommentsCompanies: async (reviewId: number) => {
    const response = await api.get(
      API_CONST.COMMENT.REVIEW_BY_ID_COMMENTS_COMPANIES(reviewId),
    );
    return response.data;
  },

  createCommentStudent: async (
    reviewId: number,
    comment: CommentData,
  ) => {
    const response = await api.post(
      API_CONST.COMMENT.REVIEW_BY_ID_COMMENTS_STUDENT(reviewId),
      comment,
    );
    return response.data;
  },

  createCommentCompany: async (
    reviewId: number,
    comment: CommentData,
  ) => {
    const response = await api.post(
      API_CONST.COMMENT.REVIEW_BY_ID_COMMENTS_COMPANIES(reviewId),
      comment,
    );
    return response.data;
  },

  updateCommentStudent: async (commentId: number, comment: CommentData) => {
    const response = await api.put(
      API_CONST.COMMENT.REVIEW_COMMENTS_STUDENTS_BY_ID(commentId),
      comment,
    );
    return response.data;
  },

  updateCommentCompany: async (commentId: number, comment: CommentData) => {
    const response = await api.put(
      API_CONST.COMMENT.REVIEW_COMMENTS_COMPANIES_BY_ID(commentId),
      comment,
    );
    return response.data;
  },

  deleteCommentStudent: async (commentId: number) => {
    const response = await api.delete(
      API_CONST.COMMENT.REVIEW_COMMENTS_STUDENTS_BY_ID(commentId),
    );
    return response.data;
  },

  deleteCommentCompany: async (commentId: number) => {
    const response = await api.delete(
      API_CONST.COMMENT.REVIEW_COMMENTS_COMPANIES_BY_ID(commentId),
    );
    return response.data;
  },
};
