import { StarFilled } from '@assets/icons';
import { ROUTES_CONST, USER_ROLES_CONST } from '@constants';
import type { IReview } from '@models/review.types';
import { formatDDMMMYYYY, formatToTwoDecimalsAsNumber } from '@utils/formatData';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupportButton } from '../SupportButton';
import { UserProfilePicture } from '../UserProfilePicture';

interface Props {
  item: IReview;
  source: (typeof USER_ROLES_CONST)[keyof typeof USER_ROLES_CONST];
}

export const ReviewCard = ({ item, source }: Props) => {
  const contentRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();

  const [shouldCollapse, setShouldCollapse] = useState(false);

  const reviewScores = [
    item.ambiente,
    item.aprendizado,
    item.beneficios,
    item.cultura,
    item.efetivacao,
    item.entrevista,
    item.feedback,
    item.infraestrutura,
    item.integracao,
    item.remuneracao,
    item.rotina,
    item.lideranca,
  ];

  const meanReviewScore =
    reviewScores.reduce((acc, current) => acc + current, 0) /
    reviewScores.length;

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const isOverflowing = el.scrollHeight > el.clientHeight;
    setShouldCollapse(isOverflowing);
  }, [item.textoAvaliacao]);

  return (
    <div className="relative flex w-full flex-col gap-3 rounded-md border border-(--grey-800) bg-(--grey-1000) p-3">
      <div className="flex items-start gap-3">
        <UserProfilePicture
          userId={source === 'ESTUDANTE' ? item.empresaId : item.estudanteId}
          size={64}
          src={
            source === 'ESTUDANTE' ? item.fotoUrlEmpresa : item.fotoUrlEstudante
          }
          defaultIconType={source === 'ESTUDANTE' ? 'student' : 'company'}
          bgIconWrapperClassName="bg-(--grey-800)"
        />

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex flex-1 justify-between">
            <span className="text-lg font-semibold">
              {source === 'ESTUDANTE' ? item.nomeEmpresa : item.nomeEstudante}
            </span>

            <span className="text-(--grey-400)">
              {formatDDMMMYYYY(item.createdAt)}
            </span>
          </div>

          <div className="flex gap-3 font-semibold text-(--grey-300)">
            <span>{item.tituloCargo}</span>
            <span className="text-(--grey-400)">•</span>
            <span className="flex items-center gap-1.5">
              {formatToTwoDecimalsAsNumber(meanReviewScore)}
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
              ROUTES_CONST.REVIEW.REVIEW_VIEW_BY_ID(item.estudanteId, item.id),
            )
          }
        />
      </div>
    </div>
  );
};
