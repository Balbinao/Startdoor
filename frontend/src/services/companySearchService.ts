import { api } from '@config';
import { API_CONST } from '@constants';
import type {
  ICompanySearchFilters,
  IEmpresaResumoBackend,
  IPaginatedResponse,
} from '@models/companySearchData.types';
import { COMPETENCIAS_FILTERS } from '@models/companySearchData.types';

const mapEmpresaResumo = (
  empresa: IEmpresaResumoBackend,
): IEmpresaResumoBackend => ({
  id: empresa.id,
  nomeFantasia: empresa.nomeFantasia,
  fotoUrl: empresa.fotoUrl ?? null,
  areaAtuacao: empresa.areaAtuacao,
  tamanhoEmpresa: empresa.tamanhoEmpresa,
  paisOrigem: empresa.paisOrigem ?? undefined,
  estadoSede: empresa.estadoSede ?? undefined,
  biografia: empresa.biografia ?? undefined,
  mediaGeral: empresa.mediaGeral ?? undefined,
});

export const companySearchService = {
  searchCompanies: async (
    filters: ICompanySearchFilters,
  ): Promise<IPaginatedResponse<IEmpresaResumoBackend>> => {
    const params = new URLSearchParams();

    if (filters.searchText) {
      params.append('nome', filters.searchText);
    }

    if (filters.notaGeralMin > 0) {
      params.append('nota', String(filters.notaGeralMin));
    }
    if (filters.receitaAnual) {
      params.append('receita', filters.receitaAnual);
    }
    if (filters.tamanhoEmpresa) {
      params.append('tamanho', filters.tamanhoEmpresa);
    }

    (COMPETENCIAS_FILTERS as readonly string[]).forEach(key => {
      const value = filters[key as keyof ICompanySearchFilters];
      if (typeof value === 'number' && value > 0) {
        params.append(key, String(value));
      }
    });

    params.append('page', String(filters.page));
    params.append('size', String(filters.size));

    const response = await api.get(`${API_CONST.COMPANY.SEARCH}?${params}`);
    return {
      content: response.data.content.map(mapEmpresaResumo),
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPages,
      number: response.data.number,
      size: response.data.size,
    };
  },
};
