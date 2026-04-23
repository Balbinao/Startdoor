import { api } from '@config';
import { API_CONST } from '@constants';
import type { ICompany } from '@models/companyData.types';
import type {
  ICompanySearchFilters,
  IEmpresaResumoBackend,
  IPaginatedResponse,
} from '@models/companySearchData.types';
import { COMPETENCIAS_FILTERS } from '@models/companySearchData.types';

const mapEmpresaResumo = (empresa: IEmpresaResumoBackend): ICompany => ({
  id: empresa.id,
  nomeFantasia: empresa.nomeFantasia,
  fotoUrl: empresa.fotoUrl ?? null,

  areaAtuacao: empresa.areaAtuacao ?? undefined,
  tamanhoEmpresa: empresa.tamanhoEmpresa ?? undefined,
  paisOrigem: empresa.paisOrigem ?? undefined,
  estadoSede: empresa.estadoSede ?? undefined,
  biografia: empresa.biografia ?? undefined,

  cnpj: '',
  username: '',
  email: '',

  createdAt: '',

  medias: {
    mediaGeral: 0,
    mediaAmbiente: 0,
    mediaAprendizado: 0,
    mediaBeneficios: 0,
    mediaCultura: 0,
    mediaEfetivacao: 0,
    mediaEntrevista: 0,
    mediaFeedback: 0,
    mediaInfraestrutura: 0,
    mediaIntegracao: 0,
    mediaRemuneracao: 0,
    mediaRotina: 0,
    mediaLideranca: 0,
  },

  salarios: {
    minimo: 0,
    maximo: 0,
    media: 0,
  },
});

export const companySearchService = {
  searchCompanies: async (
    filters: ICompanySearchFilters,
  ): Promise<IPaginatedResponse<ICompany>> => {
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
