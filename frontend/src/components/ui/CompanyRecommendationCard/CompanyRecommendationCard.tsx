import { GeminiLogo, Star, StarFilled } from '@assets/icons';
import { PhotoCompanyDefault } from '@components/ui/PhotoCompanyDefault';
import { ROUTES_CONST, USER_ROLES_CONST } from '@constants';
import { useAuth } from '@hooks/useAuth';
import type { ICompanyRecommendation } from '@models/statisticsRecommendation.types';
import { formatDateWithAge } from '@utils/formatData';
import { Link } from 'react-router-dom';

interface Props {
  recommendation: ICompanyRecommendation;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export const CompanyRecommendationCard = ({
  recommendation,
  isFavorite,
  onToggleFavorite,
}: Props) => {
  const { getUserRole } = useAuth();

  const isCompany = getUserRole() === USER_ROLES_CONST.EMPRESA;

  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(recommendation.id);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-(--grey-800) bg-(--grey-1100) p-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          {recommendation.fotoUrl ? (
            <img
              src={recommendation.fotoUrl}
              alt="company logo"
              className="h-14 w-14 rounded-lg object-cover"
            />
          ) : (
            <PhotoCompanyDefault divClassName="h-14 w-14 rounded-lg object-cover bg-(--grey-1200) p-3" />
          )}

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-(--grey-100)">
              {recommendation.nomeFantasia}
            </h3>

            <div className="flex flex-wrap gap-3 text-sm text-(--grey-400)">
              {recommendation.estadoSede && (
                <span>{recommendation.estadoSede}, Brasil</span>
              )}

              {recommendation.dataFundacao && (
                <span>{formatDateWithAge(recommendation.dataFundacao)}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          {!isCompany && (
            <button
              onClick={handleFavoriteClick}
              className="cursor-pointer self-end p-1"
            >
              <Star
                width={20}
                height={20}
                className={`text-(--yellow-100) ${isFavorite ? 'fill-yellow-500' : ''}`}
              />
            </button>
          )}
        </div>
      </div>

      {recommendation.biografia && (
        <p className="line-clamp-4 text-sm leading-relaxed text-(--grey-200)">
          {recommendation.biografia}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {(recommendation.mediaGeral ?? 0) > 0 && (
            <div className="flex w-fit items-center gap-2 rounded-lg border border-(--grey-800) bg-(--grey-900) px-3 py-2">
              <StarFilled
                width={16}
                height={16}
                className="text-(--yellow-100)"
              />

              <span className="font-semibold text-(--grey-100)">
                {recommendation.mediaGeral?.toFixed(1)}
              </span>
            </div>
          )}

          <div className="w-fit rounded-lg border border-(--grey-800) bg-(--grey-900) px-3 py-2">
            <span className="flex items-center font-bold text-(--blue-100)">
              {recommendation.porcentagemCompatibilidade}%
            </span>
          </div>
        </div>

        <Link
          to={ROUTES_CONST.RECOMMENDATION.COMPANY_RECOMMENDATION_ANALYSIS}
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-(--purple-500) bg-(--purple-600) px-3 py-2 font-medium text-(--purple-200) transition-colors hover:bg-(--purple-500)"
        >
          <GeminiLogo width={18} height={18} />
          Ver Recomendação
        </Link>
      </div>
    </div>
  );
};
