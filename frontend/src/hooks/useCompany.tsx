import { useStore } from '@contexts/store/useStore';
import type { ICompanyUpdatePayload } from '@models/companyData.types';
import type { IInputOption } from '@models/input.types';
import type { ICompanyRegistration } from '@models/registrationLogin.types';
import { companyService } from '@services/companyService';

export const useCompany = () => {
  const { companyStore } = useStore();

  const company = companyStore.getCompany;
  const companies = companyStore.getCompanies;
  const companiesOptions = companyStore.getCompaniesOptions;

  const getCompany = async (id: number) => {
    try {
      const response = await companyService.getCompany(id);
      companyStore.setCompany(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getCompanies = async () => {
    try {
      const response = await companyService.getCompanies();
      const formatted: IInputOption[] = [
        { label: 'Selecione...', value: '' },
        ...response.map(item => ({
          label: item.nomeFantasia,
          value: item.id,
        })),
      ];

      companyStore.setCompanies(response);
      companyStore.setCompaniesOptions(formatted);
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
    companies,
    companiesOptions,
    getCompany,
    getCompanies,
    companyRegistration,
    updateCompany,
    updateCompanyPassword,
    deleteCompany,
  };
};
