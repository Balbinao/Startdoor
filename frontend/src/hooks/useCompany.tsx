import { useStore } from '@contexts/store/useStore';
import type {
  ICompanySectorPayload,
  ICompanyUpdatePayload,
} from '@models/companyData.types';
import type { IInputOption } from '@models/input.types';
import type { ICompanyRegistration } from '@models/registrationLogin.types';
import { companyService } from '@services/companyService';

export const useCompany = () => {
  const { companyStore } = useStore();

  const company = companyStore.getCompany;
  const companies = companyStore.getCompanies;
  const companiesOptions = companyStore.getCompaniesOptions;
  const companySectors = companyStore.getCompaniesSectors;

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

  const updateCompanyProfilePicture = async (
    id: number,
    formData: FormData,
  ) => {
    try {
      const response = await companyService.updateCompanyProfilePicture(
        id,
        formData,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteCompanyProfilePicture = async (id: number) => {
    try {
      const response = await companyService.deleteCompanyProfilePicture(id);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getCompanySectors = async (id: number) => {
    try {
      const response = await companyService.getCompanySectors(id);
      const formatted: IInputOption[] = [
        { label: 'Selecione...', value: '' },
        ...response.map(item => ({
          label: item.nomeSetor,
          value: item.setorId,
        })),
      ];

      companyStore.setCompaniesSectors(formatted);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createCompanySector = async (
    id: number,
    setor: ICompanySectorPayload,
  ) => {
    try {
      const response = await companyService.createCompanySector(id, setor);
      companyStore.setCompany(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteCompanySector = async (id: number, idSector: number) => {
    try {
      const response = await companyService.deleteCompanySector(id, idSector);
      companyStore.setCompany(response);
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
    companySectors,
    getCompany,
    getCompanies,
    companyRegistration,
    updateCompany,
    updateCompanyPassword,
    deleteCompany,
    updateCompanyProfilePicture,
    deleteCompanyProfilePicture,
    getCompanySectors,
    createCompanySector,
    deleteCompanySector,
  };
};
