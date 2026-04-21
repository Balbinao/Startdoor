import { useCallback } from 'react';
import { useStore } from '@contexts/store/useStore';
import { COMPETENCIAS_FILTERS } from '@stores/CompanySearchStore';

export const useCompanySearch = () => {
  const { companySearchStore } = useStore();

  const filteredCompanies = companySearchStore.getFilteredCompanies();
  const filters = companySearchStore.getFilters;

  const getCompanies = useCallback(async () => {
    try {
      await companySearchStore.searchCompaniesApi();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, [companySearchStore]);



  const setSearchText = (searchText: string) => {
    companySearchStore.setFilter('searchText', searchText);
  };

  const setNotaGeralRange = (min: number) => {
    companySearchStore.setFilter('notaGeralMin', min);
  };

  const setTamanhoEmpresa = (tamanhoEmpresa: string) => {
    companySearchStore.setFilter('tamanhoEmpresa', tamanhoEmpresa);
  };

  const setReceitaAnual = (receitaAnual: string) => {
    companySearchStore.setFilter('receitaAnual', receitaAnual);
  };

  const setCompetencia = (key: string, value: number) => {
    companySearchStore.setFilter(key as keyof typeof filters, value);
  };

  return {
    filteredCompanies,
    filters,
    getCompanies,
    setSearchText,
    setNotaGeralRange,
    setTamanhoEmpresa,
    setReceitaAnual,
    setCompetencia,
    competenciasFilters: COMPETENCIAS_FILTERS,
    isLoading: companySearchStore.getIsLoading,
    hasMore: companySearchStore.getHasMore,
    loadMoreCompanies: companySearchStore.loadMoreCompanies,
  };
};