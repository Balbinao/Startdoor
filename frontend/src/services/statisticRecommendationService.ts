import { api } from '@config';
import { API_CONST } from '@constants';
import type {
  ICompanyRecommendation,
  IStrongWeakPoint,
} from '@models/statisticRecommendation.types';

export const statisticRecommendationService = {
  getStrongWeakPoints: async (companyId: number): Promise<IStrongWeakPoint> => {
    const response = await api.get(
      API_CONST.RECOMMENDATION.COMPANY_RECOMMENDATION_ANALYSIS(companyId),
    );
    return response.data;
  },

  getCompanyRecommendations: async (): Promise<ICompanyRecommendation[]> => {
    const response = await api.get(
      API_CONST.RECOMMENDATION.COMPANY_RECOMMENDATION,
    );
    return response.data;
  },
};
