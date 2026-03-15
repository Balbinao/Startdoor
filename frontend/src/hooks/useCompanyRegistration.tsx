import { useStore } from '@contexts/store/useStore';
import type { CompanyProfileUpdateData } from '@schemas/companyProfileUpdateSchema';
import { companyRegistrationService } from '@services/companyRegistrationService';

export const useCompanyRegistrations = () => {
  const { companyRegistrationStore } = useStore();

  const company = companyRegistrationStore.getCompany;

  const getCompany = async (id: number) => {
    try {
      const response = await companyRegistrationService.getCompany(id);
      companyRegistrationStore.setCompany(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateCompany = async (
    id: number,
    company: CompanyProfileUpdateData,
  ) => {
    try {
      const response = await companyRegistrationService.updateCompany(
        id,
        company,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    company,
    getCompany,
    updateCompany,
  };
};
