import { StarFilled } from '@assets/icons';
import { ROUTES_CONST } from '@constants';
import type { ICompany } from '@models/companyData.types';
import { formatDateWithAge } from '@utils/formatData';
import { useNavigate } from 'react-router-dom';
import { SupportButton } from '../SupportButton';
import { UserProfilePicture } from '../UserProfilePicture';

interface Props {
  company: ICompany;
}

export const CompanyStatisticsCard = ({ company }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 rounded-md border border-(--grey-800) bg-(--grey-1100) p-5">
      <div className="flex gap-3">
        <UserProfilePicture
          userId={company.id}
          size={64}
          src={company.fotoUrl}
          defaultIconType={'company'}
        />
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex justify-between">
            <span className="text-lg font-bold">{company.nomeFantasia}</span>
            {(company.medias?.mediaGeral ?? 0) > 0 && (
              <div className="flex items-center gap-2 font-semibold text-(--yellow-100)">
                <span>{company.medias?.mediaGeral}</span>
                <StarFilled width={16} height={16} />
              </div>
            )}
          </div>

          <div className="flex justify-between text-(--grey-400)">
            {company.estadoSede && <span>{company.estadoSede}, Brasil.</span>}
            {company.dataFundacao && (
              <span>{formatDateWithAge(company.dataFundacao)}</span>
            )}
          </div>
        </div>
      </div>

      <span className="line-clamp-5 leading-8 text-(--grey-300)">
        {company.biografia}
      </span>

      <span className="self-end">
        <SupportButton
          text="Visualizar"
          onClick={() =>
            navigate(ROUTES_CONST.COMPANY.PROFILE_BY_ID(company.id))
          }
        />
      </span>
    </div>
  );
};
