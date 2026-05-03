import { GeminiLogo, Star, StarFilled } from '@assets/icons';
import { MESSAGES_LOADING } from '@constants';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStudentFavorite } from '@hooks/useStudentFavorite';
import type { IEmpresaResumoBackend } from '@models/companySearchData.types';
import type { ICompanyRecommendation } from '@models/statisticsRecommendation.types';
import { formatDateWithAge } from '@utils/formatData';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { UserProfilePicture } from '../UserProfilePicture';

interface Props {
  recommendation: ICompanyRecommendation;
}

export const CompanyRecommendationCard = observer(
  ({ recommendation }: Props) => {
    const modalLoadingAuto = useModalLoadingAuto();
    const { modalMessageError } = useModalMessageDefault();

    const { favorites, toggleFavorite, loadFavorites } = useStudentFavorite();

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(true);

    useEffect(() => {
      const fetch = async () => {
        try {
          setIsLoading(true);
          await modalLoadingAuto(
            () => Promise.resolve(loadFavorites()),
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

    useEffect(() => {
      console.log(favorites.map(item => item));
    }, [favorites]);

    const handleClick = async (id: number) => {
      const tempObj: IEmpresaResumoBackend = {
        id,
        nomeFantasia: '',
        fotoUrl: null,
        areaAtuacao: null,
        tamanhoEmpresa: null,
        mediaGeral: 0,
        paisOrigem: '',
        estadoSede: '',
        biografia: '',
      };

      toggleFavorite(tempObj);
    };

    if (isLoading) return <></>;
    if (isError) return <></>;

    return (
      <div className="flex flex-col gap-3 rounded-md border border-(--grey-800) bg-(--grey-1100) p-5">
        <div className="flex gap-3">
          <UserProfilePicture
            userId={recommendation.id}
            size={64}
            src={recommendation.fotoUrl}
            defaultIconType={'company'}
          />
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex justify-between">
              <span className="text-lg font-bold">
                {recommendation.nomeFantasia}
              </span>
              {(recommendation.mediaGeral ?? 0) > 0 && (
                <button
                  onClick={() => handleClick(recommendation.id)}
                  className="self-start"
                >
                  <Star
                    width={20}
                    height={20}
                    className={`text-(--yellow-100) ${favorites.some(item => item.id === recommendation.id) ? 'fill-yellow-500' : ''}`}
                  />
                </button>
              )}
            </div>

            <div className="flex justify-between font-normal text-(--grey-400)">
              {recommendation.estadoSede && (
                <span>{recommendation.estadoSede}, Brasil.</span>
              )}
              {recommendation.dataFundacao && (
                <span>{formatDateWithAge(recommendation.dataFundacao)}</span>
              )}
            </div>
          </div>
        </div>

        <span className="line-clamp-5 leading-8 text-(--grey-300)">
          {recommendation.biografia}
        </span>

        <div className="flex justify-between">
          <div className="flex gap-4">
            {recommendation.mediaGeral && (
              <div className="flex w-fit items-center gap-4 rounded-lg border border-(--grey-800) bg-(--grey-900) px-3.5 py-2.5">
                <span className="flex items-center gap-2 font-bold text-(--yellow-100)">
                  <StarFilled
                    width={20}
                    height={20}
                    className="text-(--yellow-100)"
                  />
                  {new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(recommendation.mediaGeral)}
                </span>
              </div>
            )}

            <div className="flex w-fit items-center gap-4 rounded-lg border border-(--grey-800) bg-(--grey-900) px-3.5 py-2.5">
              <span className="flex items-center gap-2 font-bold text-(--blue-100)">
                {recommendation.porcentagemCompatibilidade}%
              </span>
            </div>
          </div>

          <button className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-(--purple-500) bg-(--purple-600) px-3.5 py-2.5 font-medium text-(--purple-200) hover:bg-(--purple-500)">
            <GeminiLogo width={22} height={22} />
            Ver Recomendação
          </button>
        </div>
      </div>
    );
  },
);
