import { api } from '@config';
import { API_CONST } from '@constants';
import type { CommentData } from '@schemas/commentSchema';

export const commentService = {
  getComments: async (reviewId: number) => {
    const response = await api.get(API_CONST.COMMENT.BY_ID(reviewId));
    return response.data;
  },

  createComment: async (userId: number, comment: CommentData) => {
    const response = await api.post(
      API_CONST.COMMENT.STUDENT_BY_ID(userId),
      comment,
    );
    return response.data;
  },

  updateComment: async (userId: number, comment: CommentData) => {
    const response = await api.put(
      API_CONST.COMMENT.STUDENT_BY_ID(userId),
      comment,
    );
    return response.data;
  },

  deleteComment: async (id: number) => {
    const response = await api.delete(API_CONST.COMMENT.BY_ID(id));
    return response.data;
  },
};
