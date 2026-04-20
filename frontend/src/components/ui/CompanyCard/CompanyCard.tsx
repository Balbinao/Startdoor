import { Star, StarFilled } from '@assets/icons';
import { StudentPfp } from '@assets/images';
import { ROUTES_CONST } from '@constants';
import type { ICompany } from '@models/companyData.types';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: ICompany;
}
export const CompanyCard = ({ item }: Props) => {
  const navigate = useNavigate();
  const LOREM = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio facilis suscipit saepe, laborum quibusdam voluptatem quae deleniti earum voluptas assumenda laudantium odit neque placeat, voluptate nam quia eligendi qui amet."

  const handleCardClick = () => {
    navigate(ROUTES_CONST.COMPANY.PROFILE_BY_ID(item.id));
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex w-full cursor-pointer flex-col gap-4 rounded-xl border border-(--grey-800) bg-(--grey-1000) p-4 transition-colors hover:border-(--grey-600) hover:bg-(--grey-900)"
    >
      <div className="flex items-start justify-between">
        <div className="flex justify-center gap-3">
          <img
            src={item.fotoUrl || StudentPfp}
            alt="company logo"
            className="h-14 w-14 rounded-lg object-cover"
          />

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-(--grey-100)">
              {item.nomeFantasia}
            </h3>

            {item.estadoSede && (
              <span className="text-xs text-(--grey-400)">
                {item.estadoSede}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Star
            width={16}
            height={16}
            className="self-end text-(--yellow-100)"
          />
          {item.paisOrigem && item.estadoSede && (
            <div className="text-xs text-(--grey-400)">
              {item.paisOrigem + ', ' + item.estadoSede}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-(--grey-200)">
        {item.biografia || LOREM}
      </p>

      {item.mediaNotaGeral !== undefined && item.mediaNotaGeral > 0 && (
        <div className="flex w-fit items-center gap-2 rounded-lg bg-(--grey-900) px-3 py-1.5">
          <StarFilled width={16} height={16} className="text-(--yellow-100)" />
          <span className="font-semibold text-(--grey-100)">
            {item.mediaNotaGeral.toFixed(1)}
          </span>
        </div>
      )}
    </div>
  );
};
