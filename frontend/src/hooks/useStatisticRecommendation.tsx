import { statisticRecommendationService } from '@services/statisticRecommendationService';

export const useStatisticRecommendation = () => {
  const getStrongWeakPoints = async (companyId: number) => {
    try {
      const response =
        await statisticRecommendationService.getStrongWeakPoints(companyId);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getCompanyRecommendations = async () => {
    try {
      const response =
        await statisticRecommendationService.getCompanyRecommendations();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    getStrongWeakPoints,
    getCompanyRecommendations,
  };
};
