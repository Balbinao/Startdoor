import {
  FilterCompetence,
  FilterSelect,
  Search,
  StarFilled,
} from '@assets/icons';
import { FormField } from '@components/layout/FormField/FormField';
import { CompanyCard } from '@components/ui/CompanyCard';
import { PageTitle } from '@components/ui/PageTitle';
import { Spinner } from '@components/ui/Spinner/Spinner';
import { DROPDOWN_VALUES_CONST, MESSAGES_LOADING } from '@constants';
import { useCompanySearch } from '@hooks/useCompanySearch';
import { useDebounce } from '@hooks/useDebounce';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStudentFavorite } from '@hooks/useStudentFavorite';
import {
  type ICompanySearchFilters,
  type ICompanySearchItem,
} from '@models/companySearchData.types';
import { useEffect, useState } from 'react';

const ICON = 18;

const COMPETENCIES_LABELS = {
  ambiente: 'Ambiente',
  aprendizado: 'Aprendizado',
  beneficios: 'Benefícios',
  cultura: 'Cultura',
  efetivacao: 'Efetivação',
  entrevista: 'Entrevista',
  feedback: 'Feedback',
  infra: 'Infraestrutura',
  integracao: 'Integração',
  remuneracao: 'Remuneração',
  rotina: 'Rotina',
  lideranca: 'Liderança',
};

const competenciasFilters = [
  'ambiente',
  'aprendizado',
  'beneficios',
  'cultura',
  'efetivacao',
  'entrevista',
  'feedback',
  'infra',
  'integracao',
  'remuneracao',
  'rotina',
  'lideranca',
] as const;

export const CompanySearch = () => {
  const { storedFilters, getCompaniesSearch } = useCompanySearch();
  const { getFavorites, toggleFavorite } = useStudentFavorite();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError } = useModalMessageDefault();

  const [initialLoading, setInitialLoading] = useState(true);
  const [searchingLoading, setSearchingLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchedCompanies, setSearchedCompanies] = useState<
    ICompanySearchItem[]
  >([]);
  const [filters, setFilters] = useState<ICompanySearchFilters>(storedFilters);
  const [showCompetenciesFilters, setShowCompetenciesFilters] = useState(false);
  const [nomeInput, setNomeInput] = useState(filters.nome || '');
  const debouncedNome = useDebounce(nomeInput, 400);

  const [favorites, setFavorites] = useState<{ id: number }[]>([]);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const response = await modalLoadingAuto(
          () => getCompaniesSearch(filters),
          MESSAGES_LOADING.GET,
        );
        const favorites = await modalLoadingAuto(
          () => getFavorites(),
          MESSAGES_LOADING.GET,
        );
        setSearchedCompanies(response.content);
        setFavorites(favorites.map(item => ({ id: item.id })));
      } catch (error) {
        setIsError(true);
        await modalMessageError(error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchInitial();
  }, []);

  useEffect(() => {
    if (initialLoading) return;
    const fetchReactive = async () => {
      try {
        setSearchingLoading(true);
        const response = await getCompaniesSearch(filters);
        setSearchedCompanies(response.content);
      } catch (error) {
        await modalMessageError(error);
      } finally {
        setSearchingLoading(false);
      }
    };

    fetchReactive();
  }, [filters]);

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      nome: debouncedNome || undefined,
    }));
  }, [debouncedNome]);

  const handleFilterCompetenceScore =
    (key: keyof ICompanySearchFilters) => (value: string | number) => {
      setFilters(prev => ({
        ...prev,
        [key]: value === '' ? undefined : Number(value),
      }));
    };

  const handleToggleFavorite = async (companyId: number) => {
    try {
      await modalLoadingAuto(
        () => toggleFavorite(companyId),
        MESSAGES_LOADING.UPDATE,
      );
      const favorites = await modalLoadingAuto(
        () => getFavorites(),
        MESSAGES_LOADING.GET,
      );
      setFavorites(favorites);
    } catch (error) {
      await modalMessageError(error);
    }
  };

  if (initialLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="flex min-h-full w-full flex-col gap-6">
      <PageTitle title="Pesquisar Empresas" />

      <div className="flex gap-3">
        <div className="flex-1">
          <FormField
            type="text"
            name="search"
            classNames={{
              input: 'p-6',
            }}
            value={nomeInput}
            onChange={setNomeInput}
            placeholder="Pesquise o nome da empresa..."
            iconLeft={
              <Search
                width={22}
                height={22}
                className="text-(--grey-400)"
                strokeWidth={1.5}
              />
            }
          />
        </div>

        <button
          onClick={() => setShowCompetenciesFilters(prev => !prev)}
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-(--grey-600) bg-(--grey-900) text-(--grey-100)"
        >
          <FilterCompetence
            width={22}
            height={22}
            className={showCompetenciesFilters ? 'fill-zinc-300' : 'fill-none'}
          />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <div className="max-w-55 min-w-40 flex-1">
          <FormField
            type="select"
            name="nota"
            options={[...DROPDOWN_VALUES_CONST.NOTA]}
            value={filters.nota || ''}
            onChange={(value: string | number) =>
              setFilters(prev => ({
                ...prev,
                ['nota']: value === '' ? undefined : Number(value),
              }))
            }
            iconLeft={
              <FilterSelect
                width={ICON}
                height={ICON}
                className="text-(--yellow-100)"
              />
            }
          />
        </div>
        <div className="max-w-55 min-w-40 flex-1">
          <FormField
            type="select"
            name="receitaAnual"
            options={[...DROPDOWN_VALUES_CONST.RECEITA_ANUAL]}
            value={filters.receita || ''}
            onChange={(value: string | number) =>
              setFilters(prev => ({
                ...prev,
                ['receita']: value === '' ? undefined : String(value),
              }))
            }
            iconLeft={
              <FilterSelect
                width={ICON}
                height={ICON}
                className="text-(--yellow-100)"
              />
            }
          />
        </div>
        <div className="max-w-55 min-w-40 flex-1">
          <FormField
            type="select"
            name="tamanhoEmpresa"
            options={[...DROPDOWN_VALUES_CONST.TAMANHO_EMPRESA]}
            value={filters.tamanho || ''}
            onChange={(value: string | number) =>
              setFilters(prev => ({
                ...prev,
                ['tamanho']: value === '' ? undefined : String(value),
              }))
            }
            iconLeft={
              <FilterSelect
                width={ICON}
                height={ICON}
                className="text-(--yellow-100)"
              />
            }
          />
        </div>
      </div>

      {showCompetenciesFilters && (
        <div className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 md:grid-cols-4">
          {competenciasFilters.map(key => (
            <div key={key} className="w-36">
              <FormField
                type="select"
                name={key}
                label={COMPETENCIES_LABELS[key]}
                options={DROPDOWN_VALUES_CONST.NOTA.map(option => ({
                  ...option,
                }))}
                value={filters[key] || ''}
                onChange={handleFilterCompetenceScore(key)}
                iconLeft={
                  <StarFilled
                    width={ICON}
                    height={ICON}
                    className="text-(--yellow-100)"
                  />
                }
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4">
        <span className="text-sm text-(--grey-400)">
          {searchedCompanies.length}{' '}
          {searchedCompanies.length === 1
            ? 'empresa encontrada'
            : 'empresas encontradas'}
        </span>
        {!searchingLoading && (
          <div className="flex flex-1 flex-col justify-center">
            {searchedCompanies.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4">
                <Search
                  width={48}
                  height={48}
                  className="text-(--grey-500)"
                  strokeWidth={1}
                />
                <p className="text-(--grey-400)">
                  Nenhuma empresa encontrada com os filtros aplicados.
                </p>
              </div>
            ) : (
              <div className="flex flex-1 flex-col gap-4">
                {searchedCompanies.map(company => (
                  <CompanyCard
                    key={company.id}
                    item={company}
                    isFavorite={favorites.some(item => item.id === company.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {searchingLoading && (
          <div className="flex flex-1 items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
