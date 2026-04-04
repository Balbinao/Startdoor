import {
  Building,
  Category,
  Flag,
  Focus,
  Hourglass,
  Pin,
  Star,
} from '@assets/icons';
import { UserAttribute } from '@components/ui/UserAttribute';
import { UserBanner } from '@components/ui/UserBanner';
import { MESSAGES_LOADING, MESSAGES_RESPONSE } from '@constants';
import { useCompany } from '@hooks/useCompany';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import type { ICompany } from '@models/companyData.types';
import { formatDateWithAge } from '@utils/formatData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ICON_SIZE = 44;
const STROKE_WIDTH = 1.5;

export const CompanyProfile = () => {
  const { id: userId } = useParams<{ id: string }>();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError } = useModalMessageDefault();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const [searchedCompany, setSearchedCompany] = useState<ICompany | null>(null);

  const { getCompany } = useCompany();

  const hasCompanyInfo =
    searchedCompany &&
    (searchedCompany.paisOrigem ||
      searchedCompany.receitaAnual ||
      searchedCompany.dataFundacao ||
      searchedCompany.tamanhoEmpresa ||
      searchedCompany.estadoSede ||
      searchedCompany.mediaSalarial ||
      searchedCompany.areaAtuacao);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        if (userId) {
          await modalLoadingAuto(
            async () => setSearchedCompany(await getCompany(Number(userId))),
            MESSAGES_LOADING.GET,
          );
          setIsError(false);
        } else {
          throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
        }
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
    <div className="flex h-full flex-col items-center gap-32">
      <UserBanner />
      {hasCompanyInfo && (
        <div className="flex w-full max-w-3xl flex-col gap-3">
          <div className="flex w-full gap-3">
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

          <div className="flex w-full gap-3">
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
                title="Taamnho da Empresa"
                value={searchedCompany.tamanhoEmpresa}
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

          {searchedCompany?.mediaSalarial && (
            <UserAttribute
              icon={
                <Focus
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  strokeWidth={STROKE_WIDTH}
                />
              }
              title="Média Salarial"
              value={searchedCompany.mediaSalarial}
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
      )}
    </div>
  );
};
