import { useCallback } from 'react';
import { useStore } from '@contexts/store/useStore';
import { COMPETENCIAS_FILTERS } from '@stores/CompanySearchStore';
import { companyService } from '@services/companyService';

// const mockCompanies: ICompanyCard[] = [
//   {
//     id: 1,
//     nomeFantasia: 'Tech Solutions',
//     mediaNotaGeral: 4.5,
//     setor: 'Tecnologia da Informação',
//     tamanhoEmpresa: '51-100',
//     estadoSede: 'São Paulo',
//     receitaAnual: 'R$50 milhões',
//     numReviews: 12,
//     competencias: {
//       ambiente: 4.5,
//       aprendizado: 4.8,
//       beneficios: 4.0,
//       cultura: 4.6,
//       efetivacao: 4.2,
//       entrevista: 4.7,
//       feedback: 4.3,
//       infraestrutura: 4.8,
//       integracao: 4.4,
//       remuneracao: 3.9,
//       rotina: 4.5,
//       lideranca: 4.1,
//     },
//   },
//   {
//     id: 2,
//     nomeFantasia: 'Inova Corp',
//     mediaNotaGeral: 4.8,
//     setor: 'Desenvolvimento de Software',
//     tamanhoEmpresa: '101-250',
//     estadoSede: 'Rio de Janeiro',
//     receitaAnual: 'R$100 milhões',
//     numReviews: 28,
//     competencias: {
//       ambiente: 4.9,
//       aprendizado: 5.0,
//       beneficios: 4.7,
//       cultura: 4.8,
//       efetivacao: 4.5,
//       entrevista: 4.8,
//       feedback: 4.9,
//       infraestrutura: 4.7,
//       integracao: 4.9,
//       remuneracao: 4.3,
//       rotina: 4.6,
//       lideranca: 4.8,
//     },
//   },
//   {
//     id: 3,
//     nomeFantasia: 'DataMind',
//     mediaNotaGeral: 3.9,
//     setor: 'Ciência de Dados',
//     tamanhoEmpresa: '11-50',
//     estadoSede: 'São Paulo',
//     receitaAnual: 'R$10 milhões',
//     numReviews: 8,
//     competencias: {
//       ambiente: 4.0,
//       aprendizado: 4.2,
//       beneficios: 3.5,
//       cultura: 4.1,
//       efetivacao: 3.8,
//       entrevista: 3.9,
//       feedback: 4.0,
//       infraestrutura: 4.3,
//       integracao: 3.7,
//       remuneracao: 3.2,
//       rotina: 4.0,
//       lideranca: 3.9,
//     },
//   },
//   {
//     id: 4,
//     nomeFantasia: 'NextGen Systems',
//     mediaNotaGeral: 4.2,
//     setor: 'Engenharia de Software',
//     tamanhoEmpresa: '251-500',
//     estadoSede: 'Minas Gerais',
//     receitaAnual: 'R$500 milhões',
//     numReviews: 45,
//     competencias: {
//       ambiente: 4.3,
//       aprendizado: 4.5,
//       beneficios: 4.0,
//       cultura: 4.2,
//       efetivacao: 4.1,
//       entrevista: 4.4,
//       feedback: 4.0,
//       infraestrutura: 4.5,
//       integracao: 4.1,
//       remuneracao: 3.8,
//       rotina: 4.2,
//       lideranca: 4.3,
//     },
//   },
//   {
//     id: 5,
//     nomeFantasia: 'CloudTech Brasil',
//     mediaNotaGeral: 4.6,
//     setor: 'Computação em Nuvem',
//     tamanhoEmpresa: '501-1000',
//     estadoSede: 'São Paulo',
//     receitaAnual: 'R$1 bilhão',
//     numReviews: 67,
//     competencias: {
//       ambiente: 4.7,
//       aprendizado: 4.8,
//       beneficios: 4.5,
//       cultura: 4.6,
//       efetivacao: 4.4,
//       entrevista: 4.7,
//       feedback: 4.6,
//       infraestrutura: 4.8,
//       integracao: 4.5,
//       remuneracao: 4.2,
//       rotina: 4.5,
//       lideranca: 4.6,
//     },
//   },
//   {
//     id: 6,
//     nomeFantasia: 'Digital Bank',
//     mediaNotaGeral: 3.5,
//     setor: 'Financeiro',
//     tamanhoEmpresa: '1001-5000',
//     estadoSede: 'São Paulo',
//     receitaAnual: 'R$10 bilhões',
//     numReviews: 156,
//     competencias: {
//       ambiente: 3.6,
//       aprendizado: 3.8,
//       beneficios: 3.3,
//       cultura: 3.5,
//       efetivacao: 3.7,
//       entrevista: 3.5,
//       feedback: 3.4,
//       infraestrutura: 3.8,
//       integracao: 3.3,
//       remuneracao: 3.2,
//       rotina: 3.6,
//       lideranca: 3.5,
//     },
//   },
//   {
//     id: 7,
//     nomeFantasia: 'EcoEnergy',
//     mediaNotaGeral: 4.1,
//     setor: 'Sustentabilidade',
//     tamanhoEmpresa: '51-100',
//     estadoSede: 'Paraná',
//     receitaAnual: 'R$50 milhões',
//     numReviews: 15,
//     competencias: {
//       ambiente: 4.3,
//       aprendizado: 4.2,
//       beneficios: 3.9,
//       cultura: 4.4,
//       efetivacao: 4.0,
//       entrevista: 4.1,
//       feedback: 4.2,
//       infraestrutura: 4.0,
//       integracao: 4.3,
//       remuneracao: 3.6,
//       rotina: 4.1,
//       lideranca: 4.2,
//     },
//   },
//   {
//     id: 8,
//     nomeFantasia: 'HealthTech',
//     mediaNotaGeral: 4.4,
//     setor: 'Saúde',
//     tamanhoEmpresa: '101-250',
//     estadoSede: 'Distrito Federal',
//     receitaAnual: 'R$100 milhões',
//     numReviews: 34,
//     competencias: {
//       ambiente: 4.5,
//       aprendizado: 4.6,
//       beneficios: 4.3,
//       cultura: 4.4,
//       efetivacao: 4.2,
//       entrevista: 4.5,
//       feedback: 4.4,
//       infraestrutura: 4.5,
//       integracao: 4.3,
//       remuneracao: 4.0,
//       rotina: 4.4,
//       lideranca: 4.3,
//     },
//   },
// ];
export const useCompanySearch = () => {
  const { companySearchStore } = useStore();

  const filteredCompanies = companySearchStore.getFilteredCompanies();
  const isLoading = companySearchStore.getIsLoading;
  const filters = companySearchStore.getFilters;

  // const getCompanies = useCallback(async () => {
  //   try {
  //     companySearchStore.setLoading(true);
  //     const response = mockCompanies;
  //     companySearchStore.setCompanies(response);
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }, [companySearchStore]);
const getCompanies = useCallback(async () => {
  try {
    //Aqui foi feito essa desestruturação porque precisava ser testado as competencias e numReviews
    companySearchStore.setLoading(true);
    const response = await companyService.getCompanies();
    // const mapped = response.map(company => ({
    //   id: company.id,
    //   nomeFantasia: company.nomeFantasia,
    //   mediaNotaGeral: company.mediaNotaGeral 
    //     ? Number(company.mediaNotaGeral) 
    //     : undefined,
    //   setor: company.areaAtuacao,
    //   tamanhoEmpresa: company.tamanhoEmpresa,
    //   estadoSede: company.estadoSede,
    //   paisOrigem: company.paisOrigem,
    //   receitaAnual: company.receitaAnual,
    //   numReviews: undefined,
    //   competencias: undefined,
    // }));
// id: number;
//   nomeFantasia: string;
//   cnpj: string;
//   username: string;
//   email: string;
//   senha: string;
//   mediaNotaGeral?: number;
//   biografia?: string;
//   paisOrigem?: (typeof DROPDOWN_VALUES_CONST.PAIS_ORIGEM)[number]['value'];
//   receitaAnual?: (typeof DROPDOWN_VALUES_CONST.RECEITA_ANUAL)[number]['value'];
//   dataFundacao?: string;
//   tamanhoEmpresa?: (typeof DROPDOWN_VALUES_CONST.TAMANHO_EMPRESA)[number]['value'];
//   estadoSede?: (typeof DROPDOWN_VALUES_CONST.ESTADO_ATUACAO)[number]['value'];
//   mediaSalarial?: number;
//   areaAtuacao?: string;
//   linkSite?: string;
//   linkLinkedin?: string;
//   linkGupy?: string;



    companySearchStore.setCompanies(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}, [companySearchStore]);



  const setSearchText = (searchText: string) => {
    companySearchStore.setFilter('searchText', searchText);
  };

  const setNotaGeralRange = (min: number, max: number) => {
    companySearchStore.setFilter('notaGeralMin', min);
    companySearchStore.setFilter('notaGeralMax', max);
  };

  const setSetorId = (setorId: number) => {
    companySearchStore.setFilter('setorId', setorId);
  };

  const setTamanhoEmpresa = (tamanhoEmpresa: string) => {
    companySearchStore.setFilter('tamanhoEmpresa', tamanhoEmpresa);
  };

  const setReceitaAnual = (receitaAnual: string) => {
    companySearchStore.setFilter('receitaAnual', receitaAnual);
  };

  const setCompetenciaRange = (min: number, max: number) => {
    companySearchStore.setFilter('competenciaMin', min);
    companySearchStore.setFilter('competenciaMax', max);
  };

  const setCompetencia = (key: string, value: number) => {
    companySearchStore.setFilter(key as keyof typeof filters, value);
  };

  const resetFilters = () => {
    companySearchStore.resetFilters();
  };



  return {
    filteredCompanies,
    isLoading,
    filters,
    getCompanies,
    setSearchText,
    setNotaGeralRange,
    setSetorId,
    setTamanhoEmpresa,
    setReceitaAnual,
    setCompetenciaRange,
    setCompetencia,
    resetFilters,
    competenciasFilters: COMPETENCIAS_FILTERS,
  };
};
