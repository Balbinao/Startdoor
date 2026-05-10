import { api } from '@config';
import { API_CONST } from '@constants';
import type {
  CompanySearchResponse,
  ICompanySearchFilters,
} from '@models/companySearchData.types';

export const companySearchService = {
  getCompaniesSearch: async (
    filter: ICompanySearchFilters,
  ): Promise<CompanySearchResponse> => {
    const params = Object.fromEntries(
      Object.entries(filter).filter(([, value]) => {
        return (
          value !== undefined && value !== null && value !== '' && value !== 0
        );
      }),
    );

    const response = await api.get(API_CONST.COMPANY.SEARCH, {
      params,
    });

    return response.data;
  },
};
