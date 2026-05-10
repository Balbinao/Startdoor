import { api } from '@config';
import { API_CONST } from '@constants';
import type { IStrongWeakPoint } from '@models/statisticRecommendation.types';

export const statisticRecommendationService = {
  getStrongWeakPoints: async (companyId: number): Promise<IStrongWeakPoint> => {
    const response = await api.get(
      API_CONST.RECOMMENDATION.COMPANY_RECOMMENDATION_ANALYSIS(companyId),
    );
    return response.data;
  },
};
