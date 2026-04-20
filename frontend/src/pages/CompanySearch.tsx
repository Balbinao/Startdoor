import { Search, FilterSelect, FilterCompetence, StarFilled } from '@assets/icons';
import { CompanyCard } from '@components/ui/CompanyCard';
import { FormField } from '@components/layout/FormField/FormField';
import { DROPDOWN_VALUES_CONST } from '@constants';
import { useCompanySearch } from '@hooks/useCompanySearch';
import { useSector } from '@hooks/useSector';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { COMPETENCIAS_LABELS } from '@stores/CompanySearchStore';
import { useDebounce } from '@hooks/useDebounce';

const SELECT_WIDTH = 'w-36';
const ICON = 18;
const SELECT_STYLE = 'h-11 border-[var(--grey-600)] bg-[var(--grey-900)] text-[var(--grey-100)]';
const DEBOUNCE_DELAY = 100;

const CompanyCardList = observer(() => {
  const { filteredCompanies } = useCompanySearch();

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm text-(--grey-400)">
          {filteredCompanies.length} {filteredCompanies.length === 1 ? 'empresa encontrada' : 'empresas encontradas'}
        </span>
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <Search width={48} height={48} className="text-(--grey-500)" strokeWidth={1} />
          <p className="text-(--grey-400)">Nenhuma empresa encontrada com os filtros aplicados.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredCompanies.map(company => (
            <CompanyCard key={company.id} item={company} />
          ))}
        </div>
      )}
    </>
  );
});

export const CompanySearch = observer(() => {
  const {
    filters,
    getCompanies,
    setSearchText,
    setNotaGeralRange,
    setTamanhoEmpresa,
    setReceitaAnual,
    setCompetencia,
    competenciasFilters,
  } = useCompanySearch();

  const { getSectors } = useSector();

  const [isLoading, setIsLoading] = useState(false);
  const [showCompetencias, setShowCompetencias] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [competenciasValues, setCompetenciasValues] = useState<Record<string, string>>({});

  const debouncedSearchText = useDebounce(searchInput, DEBOUNCE_DELAY);
  const debouncedCompetencias = useDebounce(competenciasValues, DEBOUNCE_DELAY);

    useEffect(() => {
      setSearchText(debouncedSearchText);
    }, [debouncedSearchText]);

useEffect(() => {
  getSectors();
}, []);

useEffect(() => {
  Object.entries(debouncedCompetencias).forEach(([key, value]) => {
    if (value !== undefined) {
      setCompetencia(key, Number(value));
    }
  });
}, [debouncedCompetencias]);

useEffect(() => {
  getCompanies();
}, [
  filters.searchText,
  filters.notaGeralMin,
  filters.notaGeralMax,
  filters.tamanhoEmpresa,
  filters.receitaAnual,
  ...competenciasFilters.map(key => filters[key as keyof typeof filters])
]);

  const handleNotaChange = (value: string | number) => {
    const nota = Number(value);
    if (value === '' || nota === 0) {
      setNotaGeralRange(0, 0);
    } else {
      setNotaGeralRange(nota, 5);
    }
  };

  const handleCompetenciaChange = (key: string) => (value: string | number) => {
    setCompetenciasValues(prev => ({ ...prev, [key]: String(value) }));
  };

  const handleTamanhoChange = (value: string | number) => {
    setTamanhoEmpresa(String(value));
  };

  const handleReceitaChange = (value: string | number) => {
    setReceitaAnual(String(value));
  };

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full mb-4 h-20 rounded-xl items-center justify-center bg-(--grey-1100)">
          <h1 className="text-2xl font-semibold text-(--grey-300)">Pesquisar Empresas</h1>
        </div>
        <div className="flex items-center justify-center py-20">
          <span className="text-(--grey-300)">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full mb-4 h-20 rounded-xl items-center justify-center bg-(--grey-1100)">
        <h1 className="text-2xl font-semibold text-(--grey-300)">Pesquisar Empresas</h1>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <Search width={22} height={22} className="text-(--grey-400)" strokeWidth={1.5} />
          </div>
          <input
            type="text"
            placeholder="Buscar empresas..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="h-12 w-full rounded-xl border border-(--grey-900) bg-(--grey-1100) pl-12 pr-4 text-base focus:ring-1 focus:ring-(--purple-400) focus:outline-none"
          />
        </div>

        <button
          onClick={() => setShowCompetencias(!showCompetencias)}
          className="flex h-12 w-12 items-center justify-center rounded-xl border bg-(--grey-900) border-(--grey-600) text-(--grey-100)"
        >
          <FilterCompetence width={22} height={22} className={showCompetencias ? 'fill-red-50' : 'fill-none'} />
        </button>
      </div>

      <div className="flex justify-center items-center gap-4">
        <FormField
          type="select"
          name="nota"
          options={[...DROPDOWN_VALUES_CONST.NOTA]}
          value={filters.notaGeralMax || ''}
          onChange={handleNotaChange}
          className={SELECT_STYLE}
          iconLeft={<FilterSelect width={ICON} height={ICON} className="text-(--yellow-100)" />}
        />

        <FormField
          type="select"
          name="receitaAnual"
          options={[...DROPDOWN_VALUES_CONST.RECEITA_ANUAL]}
          value={filters.receitaAnual || ''}
          onChange={handleReceitaChange}
          className={SELECT_STYLE}
          iconLeft={<FilterSelect width={ICON} height={ICON} className="text-(--yellow-100)" />}
        />

        <FormField
          type="select"
          name="tamanhoEmpresa"
          options={[...DROPDOWN_VALUES_CONST.TAMANHO_EMPRESA]}
          value={filters.tamanhoEmpresa || ''}
          onChange={handleTamanhoChange}
          className={SELECT_STYLE}
          iconLeft={<FilterSelect width={ICON} height={ICON} className="text-(--yellow-100)" />}
        />
      </div>

      {showCompetencias && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {competenciasFilters.map(key => (
            <div key={key} className={SELECT_WIDTH}>
              <FormField
                type="select"
                name={key}
                label={COMPETENCIAS_LABELS[key]}
                options={[...DROPDOWN_VALUES_CONST.NOTA]}
                value={filters[key as keyof typeof filters] || ''}
                onChange={handleCompetenciaChange(key)}
                className="h-12 border-[var(--grey-600)] bg-[var(--grey-900)] text-[var(--grey-100)]"
                iconLeft={<StarFilled width={ICON} height={ICON} className="text-(--yellow-100)" />}
              />
            </div>
          ))}
        </div>
      )}

   <CompanyCardList />
    </div>
  );
});