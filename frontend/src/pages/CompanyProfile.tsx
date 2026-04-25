import {
  Building,
  Category,
  Coin,
  Flag,
  Hourglass,
  Pin,
  Star,
} from '@assets/icons';
import { FormField } from '@components/layout/FormField/FormField';
import { ReviewCard } from '@components/ui/ReviewCard';
import { UserAttribute } from '@components/ui/UserAttribute';
import { UserBanner } from '@components/ui/UserBanner';
import {
  DROPDOWN_VALUES_CONST,
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
} from '@constants';
import { useCompany } from '@hooks/useCompany';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useReview, type SortOrder, type SortSetor } from '@hooks/useReview';
import { useSector } from '@hooks/useSector';
import type { ICompany } from '@models/companyData.types';
import { formatDateWithAge } from '@utils/formatData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ICON_SIZE = 44;
const STROKE_WIDTH = 1.5;

export const CompanyProfile = () => {
  const { id: urlUserId } = useParams<{ id: string }>();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError } = useModalMessageDefault();

  const { sectorsOptions, getSectors } = useSector();

  const { reviewCards, getReviewCardsCompany } = useReview();
  const { getCompany } = useCompany();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const [searchedCompany, setSearchedCompany] = useState<ICompany | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('');
  const [sortSetor, setSortSetor] = useState<SortSetor>('');

  const hasCompanyInfo =
    searchedCompany &&
    (searchedCompany.biografia ||
      searchedCompany.paisOrigem ||
      searchedCompany.receitaAnual ||
      searchedCompany.dataFundacao ||
      searchedCompany.tamanhoEmpresa ||
      searchedCompany.estadoSede ||
      searchedCompany?.salarios ||
      searchedCompany.areaAtuacao);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        if (!urlUserId) {
          throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
        }

        await modalLoadingAuto(
          async () => setSearchedCompany(await getCompany(Number(urlUserId))),
          MESSAGES_LOADING.GET,
        );
        await modalLoadingAuto(() => getSectors(), MESSAGES_LOADING.GET);
        await modalLoadingAuto(
          () => getReviewCardsCompany(Number(urlUserId)),
          MESSAGES_LOADING.GET,
        );
        setIsError(false);
      } catch (error: unknown) {
        await modalMessageError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="flex h-full flex-1 flex-col items-center gap-20">
      <UserBanner type="EMPRESA" id={Number(urlUserId)} />
      {hasCompanyInfo && (
        <div className="flex w-full max-w-3xl flex-col gap-8">
          {searchedCompany.biografia && (
            <span className="line-clamp-6 leading-7 text-(--grey-200)">
              {searchedCompany.biografia}
            </span>
          )}
          <div className="flex flex-col gap-3">
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              {searchedCompany?.paisOrigem && (
                <UserAttribute
                  icon={
                    <Flag
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      strokeWidth={STROKE_WIDTH}
                    />
                  }
                  title="Pais de Origem"
                  value={searchedCompany.paisOrigem}
                />
              )}

              {searchedCompany?.receitaAnual && (
                <UserAttribute
                  icon={
                    <Star
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      strokeWidth={STROKE_WIDTH}
                    />
                  }
                  title="Receita Anual"
                  value={searchedCompany.receitaAnual}
                />
              )}
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              {searchedCompany?.dataFundacao && (
                <UserAttribute
                  icon={
                    <Hourglass
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      strokeWidth={STROKE_WIDTH}
                    />
                  }
                  title="Data de Fundação"
                  value={formatDateWithAge(searchedCompany.dataFundacao)}
                />
              )}

              {searchedCompany?.tamanhoEmpresa && (
                <UserAttribute
                  icon={
                    <Building
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      strokeWidth={STROKE_WIDTH}
                    />
                  }
                  title="Tamanho da Empresa"
                  value={`${searchedCompany.tamanhoEmpresa} colaboradores`}
                />
              )}
            </div>

            {searchedCompany?.estadoSede && (
              <UserAttribute
                icon={
                  <Pin
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    strokeWidth={STROKE_WIDTH}
                  />
                }
                title="Sede no Brasil"
                value={searchedCompany.estadoSede}
              />
            )}

            {searchedCompany?.salarios?.minimo &&
              searchedCompany?.salarios?.maximo &&
              searchedCompany?.salarios?.media && (
                <UserAttribute
                  icon={
                    <Coin
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      strokeWidth={STROKE_WIDTH}
                    />
                  }
                  title="Média Salarial (por mês)"
                  value={
                    <>
                      R$ {searchedCompany.salarios.minimo} — R${' '}
                      {searchedCompany.salarios.maximo}
                      <span style={{ opacity: 0.5 }}>
                        {' '}
                        (média de R$ {searchedCompany.salarios.media})
                      </span>
                    </>
                  }
                />
              )}

            {searchedCompany?.areaAtuacao && (
              <UserAttribute
                icon={
                  <Category
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    strokeWidth={STROKE_WIDTH}
                  />
                }
                title="Área de Atuação"
                value={searchedCompany.areaAtuacao}
              />
            )}
          </div>
        </div>
      )}
      <div className="flex w-full flex-col gap-8">
        <div className="flex items-center gap-8">
          <span className="text-lg font-semibold whitespace-nowrap">
            {reviewCards.length}{' '}
            {reviewCards.length > 1 ? 'Avaliações' : 'Avaliação'}
          </span>

          <div className="flex flex-1 gap-4">
            <span className="flex-1">
              <FormField
                type="select"
                name="sortSetor"
                options={sectorsOptions}
                value={sortSetor}
                onChange={async (value: string | number) => {
                  const setorValue: SortSetor =
                    value === '' ? '' : Number(value);

                  setSortSetor(setorValue);

                  await modalLoadingAuto(
                    () =>
                      getReviewCardsCompany(
                        Number(urlUserId),
                        sortOrder,
                        setorValue,
                      ),
                    MESSAGES_LOADING.GET,
                  );
                }}
              />
            </span>
            <span className="w-56">
              <FormField
                type="select"
                name="sortOrder"
                value={sortOrder}
                options={DROPDOWN_VALUES_CONST.REVIEWS_SORT.map(option => ({
                  ...option,
                }))}
                onChange={async (value: string | number) => {
                  const orderValue: SortOrder =
                    value === '' ? '' : (value as Exclude<SortOrder, ''>);

                  setSortOrder(orderValue);

                  await modalLoadingAuto(
                    () =>
                      getReviewCardsCompany(
                        Number(urlUserId),
                        orderValue,
                        sortSetor,
                      ),
                    MESSAGES_LOADING.GET,
                  );
                }}
              />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {reviewCards.map(item => (
            <ReviewCard key={item.id} item={item} source="EMPRESA" />
          ))}
        </div>
      </div>
    </div>
  );
};
