import { api } from '@config';
import { API_CONST } from '@constants';
import type { ICompany } from '@models/companyData.types';
import type { ICompanyRegistration } from '@models/registrationLogin.types';
import type { CompanyProfileUpdateData } from '@schemas/companyProfileUpdateSchema';

export const companyRegistrationService = {
  getCompany: async (id: number): Promise<ICompany> => {
    const response = await api.get(API_CONST.COMPANY.BY_ID(id));
    return response.data;
  },

  companyRegistration: async (data: ICompanyRegistration) => {
    const response = await api.post(API_CONST.COMPANY.REGISTRATION, data);
    return response.data;
  },

  updateCompany: async (id: number, company: CompanyProfileUpdateData) => {
    const response = await api.put(API_CONST.COMPANY.BY_ID(id), company);
    return response.data;
  },

  updateCompanyPassword: async (id: number, novaSenha: string) => {
    const response = await api.patch(API_CONST.COMPANY.BY_ID_PASSWORD(id), {
      novaSenha,
    });
    return response.data;
  },

  deleteCompany: async (id: number) => {
    const response = await api.delete(API_CONST.COMPANY.BY_ID(id));
    return response.data;
  },
};
