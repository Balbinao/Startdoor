import { useStore } from '@contexts/store/useStore';
import type { IUpdateCompanyPassword } from '@models/companyData.types';
import type { ICompanyRegistration } from '@models/registrationLogin.types';
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

  const companyRegistration = async (
    companyRegistrationData: ICompanyRegistration,
  ) => {
    try {
      const response = await companyRegistrationService.companyRegistration(
        companyRegistrationData,
      );

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

  const updateCompanyPassword = async (
    id: number,
    passwordData: IUpdateCompanyPassword,
  ) => {
    try {
      const response = await companyRegistrationService.updateCompanyPassword(
        id,
        passwordData,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteCompany = async (id: number) => {
    try {
      const response = await companyRegistrationService.deleteCompany(id);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    company,
    getCompany,
    companyRegistration,
    updateCompany,
    updateCompanyPassword,
    deleteCompany,
  };
};
