import { StarFilled } from '@assets/icons';
import { MESSAGES_LOADING, MESSAGES_RESPONSE, ROUTES_CONST } from '@constants';
import { useCompany } from '@hooks/useCompany';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStudent } from '@hooks/useStudent';
import type {
  IReviewCardCompanyView,
  IReviewCardStudentView,
} from '@models/review.types';
import { formatDDMMMYYYY } from '@utils/formatData';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupportButton } from '../SupportButton';
import { UserProfilePicture } from '../UserProfilePicture';

interface Props {
  item: IReviewCardCompanyView | IReviewCardStudentView;
}

export const ReviewCard = ({ item }: Props) => {
  const contentRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError } = useModalMessageDefault();

  const { students, getStudents } = useStudent();
  const { companies, getCompanies } = useCompany();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [shouldCollapse, setShouldCollapse] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        await modalLoadingAuto(() => getStudents(), MESSAGES_LOADING.GET);
        await modalLoadingAuto(() => getCompanies(), MESSAGES_LOADING.GET);

        setIsError(false);
      } catch (error: unknown) {
        setIsError(true);
        await modalMessageError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  const isReviewCardFromCompanyPerspective = 'idEstudante' in item;

  const user = isReviewCardFromCompanyPerspective
    ? students.find(s => s.id === item.idEstudante)
    : companies.find(c => c.id === item.idEmpresa);

  useEffect(() => {
    if (isLoading || isError || !user) return;

    const el = contentRef.current;
    if (!el) return;

    const isOverflowing = el.scrollHeight > el.clientHeight;
    setShouldCollapse(isOverflowing);
  }, [item.textoAvaliacao, isLoading, isError, user]);

  if (!user) {
    console.error(MESSAGES_RESPONSE.WARNING.USER_NOT_FOUND);
    return null;
  }

  if (isLoading) return null;
  if (isError) return null;

  return (
    <div className="relative flex w-full flex-col gap-3 rounded-md border border-(--grey-800) bg-(--grey-1000) p-3">
      <div className="flex items-start gap-3">
        <UserProfilePicture
          userId={user.id}
          size={64}
          src={user?.fotoUrl}
          defaultIconType={
            isReviewCardFromCompanyPerspective ? 'student' : 'company'
          }
          bgIconWrapperClassName="bg-(--grey-800)"
        />

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex flex-1 justify-between">
            <span className="text-lg font-semibold">
              {'nomeFantasia' in user ? user.nomeFantasia : user.nome}
            </span>

            <span className="text-(--grey-400)">
              {formatDDMMMYYYY(item.dataPublicacao)}
            </span>
          </div>

          <div className="flex gap-3 font-semibold text-(--grey-300)">
            <span>{item.tituloCargo}</span>
            <span className="text-(--grey-400)">•</span>
            <span className="flex items-center gap-1.5">
              {item.notaMedia}
              <StarFilled
                width={15}
                height={15}
                className="text-(--yellow-100) opacity-80"
              />
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <span
          ref={contentRef}
          className="line-clamp-3 leading-8 text-(--grey-200)"
        >
          {item.textoAvaliacao}
        </span>

        {shouldCollapse && (
          <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-linear-to-t from-(--grey-1000) to-transparent" />
        )}
      </div>

      <div className="absolute right-3 bottom-3">
        <SupportButton
          text="Visualizar"
          onClick={() =>
            navigate(
              ROUTES_CONST.REVIEW.REVIEW_VIEW_BY_ID(user.id, item.idAvaliacao),
            )
          }
        />
      </div>
    </div>
  );
};
