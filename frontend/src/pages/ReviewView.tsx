import {
  Coin,
  PencilFilled,
  ThreeDotsVertical,
  TrashFilled,
  UserFilled,
} from '@assets/icons';
import { CommentForm } from '@components/ui/CommentForm';
import {
  MenuExtraOptions,
  type MenuOption,
} from '@components/ui/MenuExtraOptions/MenuExtraOptions';
import { ScoreCard } from '@components/ui/ScoreCard';
import { UserAttribute } from '@components/ui/UserAttribute';
import { UserBanner } from '@components/ui/UserBanner';
import {
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
  ROUTES_CONST,
  USER_ROLES_CONST,
} from '@constants';
import { useAuth } from '@hooks/useAuth';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useReview } from '@hooks/useReview';
import { useSector } from '@hooks/useSector';
import { useStudent } from '@hooks/useStudent';
import { formatDateWithYearOrMonthAgo } from '@utils/formatData';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ReviewView = () => {
  const { id: urlUserId, reviewId: urlReviewId } = useParams<{
    id: string;
    reviewId: string;
  }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { getUserId, getUserRole } = useAuth();
  const { review, getReview, deleteReview } = useReview();
  const { student, getStudent } = useStudent();
  const { sectorsItems, getSectors } = useSector();

  const userId = getUserId();
  const userRole = getUserRole();

  const isOwner =
    Number(urlUserId) === userId && userRole === USER_ROLES_CONST.ESTUDANTE;

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        if (!urlReviewId) {
          throw new Error(MESSAGES_RESPONSE.WARNING.REVIEW_ID_NOT_FOUND);
        }

        const response = await modalLoadingAuto(
          () => getReview(Number(urlReviewId)),
          MESSAGES_LOADING.GET,
        );

        await modalLoadingAuto(
          () => getStudent(response.idEstudante),
          MESSAGES_LOADING.GET,
        );

        await modalLoadingAuto(() => getSectors(), MESSAGES_LOADING.GET);

        setIsError(false);
      } catch (error: unknown) {
        await modalMessageError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  const onDelete = async (id: number) => {
    try {
      const confirmed = await modalMessageSafe({
        type: 'warning',
        message: MESSAGES_RESPONSE.WARNING.DELETE_REVIEW,
        shouldAcknowledge: true,
      });
      if (!confirmed) return;

      const response = await modalLoadingAuto(
        () => deleteReview(id),
        MESSAGES_LOADING.DELETE,
      );
      const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.DELETE;
      await modalMessageSafe({
        type: 'success',
        message,
        shouldBlockProcess: false,
      });
      if (userId) navigate(ROUTES_CONST.STUDENT.PROFILE(userId));
    } catch (error: unknown) {
      await modalMessageError(error);
    }
  };

  const menuOptions = [
    {
      text: 'Editar',
      icon: (
        <PencilFilled width={18} height={18} className="text-(--grey-200)" />
      ),
      onClick: () =>
        !!userId &&
        !!review &&
        navigate(ROUTES_CONST.REVIEW.REVIEW_UPDADE_BY_ID(userId, review.id)),
    },
    {
      text: 'Excluir',
      icon: (
        <TrashFilled width={18} height={18} className="text-(--grey-200)" />
      ),
      onClick: () => review?.id && onDelete(review.id),
    },
  ] as MenuOption[];

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="flex h-full flex-col items-center gap-32">
      {review?.idEmpresa && <UserBanner type="EMPRESA" id={review.idEmpresa} />}

      <div className="flex flex-col gap-10">
        <div className="flex items-start gap-3">
          <div className="h-20 w-20">
            {student?.fotoUrl ? (
              <img
                src={student.fotoUrl}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full rounded-lg bg-(--grey-1000) p-3">
                <UserFilled className="h-full w-full text-(--grey-400)" />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{student?.nome}</span>
              <div className="flex items-center gap-2">
                {review?.created_at && (
                  <span className="inline-block max-w-22 truncate text-sm text-(--grey-200) sm:max-w-full">
                    {formatDateWithYearOrMonthAgo(review.created_at)}
                  </span>
                )}
                {isOwner && (
                  <MenuExtraOptions
                    options={menuOptions}
                    placement="bottom-end"
                  >
                    <div className="cursor-pointer px-2 py-2">
                      <ThreeDotsVertical
                        width={18}
                        height={18}
                        strokeWidth={1.5}
                        className="text-(--grey-200)"
                      />
                    </div>
                  </MenuExtraOptions>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              {review?.idSetor && (
                <span className="rounded-md bg-(--purple-600) px-3 py-1.5 font-semibold text-(--purple-300)">
                  {
                    sectorsItems.find(item => item.value === review.idSetor)
                      ?.label
                  }
                </span>
              )}
              <div className="flex gap-3 text-sm font-normal text-(--grey-400)">
                {review?.estadoAtuacao && (
                  <span className="inline-block max-w-26 truncate sm:max-w-full">
                    {review.estadoAtuacao}, Brasil
                  </span>
                )}
                {review?.estadoAtuacao && review?.modeloTrabalho && (
                  <span className="text-(--grey-400)">•</span>
                )}
                {review?.modeloTrabalho && <span>{review.modeloTrabalho}</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {review?.tituloCargo && (
            <span className="text-xl font-semibold"> {review.tituloCargo}</span>
          )}
          {review?.textoAvaliacao && (
            <span className="leading-8 text-(--grey-200)">
              {review.textoAvaliacao
                .split(/\n+/)
                .filter(p => p.trim() !== '')
                .map((paragrafo, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {paragrafo}
                  </p>
                ))}
            </span>
          )}

          {review?.faixaSalarial && (
            <div className="w-64">
              <UserAttribute
                icon={<Coin width={44} height={44} strokeWidth={1.5} />}
                title="Faixa Salarial"
                value={`R$ ${review.faixaSalarial.salarioMin} — R$ ${review.faixaSalarial.salarioMax}`}
              />
            </div>
          )}

          <ScoreCard hasScoreDropdown />
        </div>
      </div>

      <CommentForm />
    </div>
  );
};
