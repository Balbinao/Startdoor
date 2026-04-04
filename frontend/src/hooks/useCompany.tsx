import { useStore } from '@contexts/store/useStore';
import type { ICompanyUpdatePayload } from '@models/companyData.types';
import type { ICompanyRegistration } from '@models/registrationLogin.types';
import { companyService } from '@services/companyService';

export const useCompany = () => {
  const { companyRegistrationStore } = useStore();

  const company = companyRegistrationStore.getCompany;

  const getCompany = async (id: number) => {
    try {
      const response = await companyService.getCompany(id);
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
      const response = await companyService.companyRegistration(
        companyRegistrationData,
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateCompany = async (id: number, company: ICompanyUpdatePayload) => {
    try {
      const response = await companyService.updateCompany(id, company);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateCompanyPassword = async (id: number, novaSenha: string) => {
    try {
      const response = await companyService.updateCompanyPassword(
        id,
        novaSenha,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteCompany = async (id: number) => {
    try {
      const response = await companyService.deleteCompany(id);
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
