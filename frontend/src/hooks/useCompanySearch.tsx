import { useStore } from '@contexts/store/useStore';
import type { ICompanySearchFilters } from '@models/companySearchData.types';
import { companySearchService } from '@services/companySearchService';

export const useCompanySearch = () => {
  const { companySearchStore } = useStore();

  const storedFilters = companySearchStore.getStoredFilters;

  const getCompaniesSearch = async (filter: ICompanySearchFilters) => {
    try {
      companySearchStore.setStoredFilters(filter);
      const response = await companySearchService.getCompaniesSearch(filter);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    storedFilters,
    getCompaniesSearch,
  };
};
