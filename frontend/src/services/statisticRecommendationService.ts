import { api } from '@config';
import { API_CONST } from '@constants';
import type {
  ICompanyRecommendation,
  ICompanyRecommendationAnalysis,
  IStrongWeakPoint,
} from '@models/statisticRecommendation.types';

export const statisticRecommendationService = {
  getStrongWeakPoints: async (companyId: number): Promise<IStrongWeakPoint> => {
    const response = await api.get(
      API_CONST.RECOMMENDATION.COMPANY_STATISTIC_STRONG_WEAK_POINT(companyId),
    );
    return response.data;
  },

  getCompanyRecommendations: async (): Promise<ICompanyRecommendation[]> => {
    const response = await api.get(
      API_CONST.RECOMMENDATION.COMPANY_RECOMMENDATION,
    );
    return response.data;
  },

  getCompanyRecommendationAnalysis: async (
    studentId: number,
    companyId: number,
  ): Promise<ICompanyRecommendationAnalysis> => {
    const response = await api.post(
      API_CONST.RECOMMENDATION.COMPANY_RECOMMENDATION_ANALYSIS,
      { estudanteId: studentId, empresaId: companyId },
    );
    return response.data;
  },
};
