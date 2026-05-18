import { GeminiLogo, Star, StarFilled } from '@assets/icons';
import { ROUTES_CONST, USER_ROLES_CONST } from '@constants';
import { useAuth } from '@hooks/useAuth';
import type { ICompanyRecommendation } from '@models/statisticRecommendation.types';
import { Link } from 'react-router-dom';
import { UserProfilePicture } from '../UserProfilePicture';

interface Props {
  recommendation: ICompanyRecommendation;
  studentId: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export const CompanyRecommendationCard = ({
  recommendation,
  studentId,
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
          <UserProfilePicture
            userId={recommendation.id}
            size={64}
            src={recommendation.fotoUrl}
            defaultIconType={'company'}
            bgIconWrapperClassName="bg-(--grey-900)"
          />

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-(--grey-100)">
              {recommendation.nomeFantasia}
            </h3>

            <div className="flex flex-wrap gap-3 text-sm text-(--grey-400)">
              {recommendation.estadoSede && (
                <span>{recommendation.estadoSede}, Brasil</span>
              )}

              {/* {recommendation.dataFundacao && (
                <span>{formatDateWithAge(recommendation.dataFundacao)}</span>
              )} */}
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
          {recommendation.mediaGeral && recommendation.mediaGeral > 0 && (
            <div className="flex w-fit items-center gap-2 rounded-lg border border-(--grey-800) bg-(--grey-900) px-3 py-2">
              <StarFilled
                width={16}
                height={16}
                className="text-(--yellow-100)"
              />
              <span className="font-semibold text-(--grey-100)">
                {new Intl.NumberFormat('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(recommendation.mediaGeral)}
              </span>
            </div>
          )}

          <div className="w-fit rounded-lg border border-(--grey-800) bg-(--grey-900) px-3 py-2">
            <span className="flex items-center font-bold text-(--blue-100)">
              {recommendation.percentualMatch}%
            </span>
          </div>
        </div>

        <Link
          to={ROUTES_CONST.STATISTICS_RECOMMENDATION.COMPANY_RECOMMENDATION_ANALYSIS(
            studentId,
            recommendation.id,
          )}
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-(--purple-500) bg-(--purple-600) px-3 py-2 font-medium text-(--purple-200) transition-colors hover:bg-(--purple-500)"
        >
          <GeminiLogo width={18} height={18} />
          Ver Recomendação
        </Link>
      </div>
    </div>
  );
};
