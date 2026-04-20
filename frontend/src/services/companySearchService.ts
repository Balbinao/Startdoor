import { api } from '@config';
import { API_CONST } from '@constants';
import type { ICompanySearchFilters, IEmpresaResumoBackend } from '@models/companySearchData.types';
import { COMPETENCIAS_FILTERS } from '@models/companySearchData.types';
import type { ICompany } from '@models/companyData.types';



const mapEmpresaResumo = (empresa: IEmpresaResumoBackend): ICompany => ({
  id: empresa.id,
  nomeFantasia: empresa.nomeFantasia,
  fotoUrl: empresa.fotoUrl,
  areaAtuacao: empresa.areaAtuacao ?? undefined,
  tamanhoEmpresa: empresa.tamanhoEmpresa as ICompany['tamanhoEmpresa'],
  mediaNotaGeral: empresa.mediaGeral ,
  paisOrigem: empresa.paisOrigem as ICompany['paisOrigem'],
  estadoSede: empresa.estadoSede as ICompany['estadoSede'],
  biografia: empresa.biografia,
  cnpj: '',
  username: '',
  email: '',
  senha: '',
});

export const companySearchService = {
  searchCompanies: async (
    filters: ICompanySearchFilters,
  ): Promise<ICompany[]> => {
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
    return response.data.content.map(mapEmpresaResumo);
  },
};