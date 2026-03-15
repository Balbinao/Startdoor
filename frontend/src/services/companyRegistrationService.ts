import { api } from '@config';
import { API_CONST } from '@constants';
import type { ICompany } from '@models/companyData.types';
import type { CompanyProfileUpdateData } from '@schemas/companyProfileUpdateSchema';

export const companyRegistrationService = {
  getCompany: async (id: number): Promise<ICompany> => {
    const response = await api.get(API_CONST.COMPANY.BY_ID(id));
    return response.data;
  },

  updateCompany: async (id: number, company: CompanyProfileUpdateData) => {
    const response = await api.put(API_CONST.COMPANY.BY_ID(id), company);
    return response.data;
  },
};
