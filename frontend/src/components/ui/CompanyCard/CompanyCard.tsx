import { Star, StarFilled } from '@assets/icons';
import { ROUTES_CONST, USER_ROLES_CONST } from '@constants';
import { useAuth } from '@hooks/useAuth';
import type { ICompany, ICompanyTopRated } from '@models/companyData.types';
import type { ICompanySearchItem } from '@models/companySearchData.types';
import { useNavigate } from 'react-router-dom';
import { UserProfilePicture } from '../UserProfilePicture';

interface Props {
  item: ICompanySearchItem | ICompany | ICompanyTopRated;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export const CompanyCard = ({ item, isFavorite, onToggleFavorite }: Props) => {
  const navigate = useNavigate();

  const { getUserRole } = useAuth();

  const isCompany = getUserRole() === USER_ROLES_CONST.EMPRESA;
  const mediaGeral =
    'mediaGeral' in item ? item.mediaGeral : item.medias?.mediaGeral;

  const handleCardClick = () => {
    navigate(ROUTES_CONST.COMPANY.PROFILE_BY_ID(item.id));
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(item.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex w-full cursor-pointer flex-col gap-4 rounded-xl border border-(--grey-800) bg-(--grey-1100) p-4 transition-colors hover:border-(--grey-600) hover:bg-(--grey-1000)"
    >
      <div className="flex items-start justify-between">
        <div className="flex justify-center gap-3">
          <UserProfilePicture
            userId={item.id}
            size={64}
            src={item.fotoUrl}
            defaultIconType={'company'}
            bgIconWrapperClassName="bg-(--grey-900)"
          />

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-(--grey-100)">
              {item.nomeFantasia}
            </h3>

            {item.estadoSede && (
              <span className="text-sm text-(--grey-400)">
                {item.estadoSede}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
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
          {item.paisOrigem && item.estadoSede && (
            <div className="text-sm text-(--grey-400)">
              {item.paisOrigem + ', ' + item.estadoSede}
            </div>
          )}
        </div>
      </div>

      {item.biografia && (
        <p className="line-clamp-4 leading-8 text-(--grey-200)">
          {item.biografia}
        </p>
      )}

      {mediaGeral !== undefined && mediaGeral > 0 && (
        <div className="flex w-fit items-center gap-2 rounded-lg border border-(--grey-800) bg-(--grey-900) px-3 py-2">
          <StarFilled width={16} height={16} className="text-(--yellow-100)" />
          <span className="font-semibold text-(--grey-100)">
            {new Intl.NumberFormat('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(mediaGeral)}
          </span>
        </div>
      )}
    </div>
  );
};
