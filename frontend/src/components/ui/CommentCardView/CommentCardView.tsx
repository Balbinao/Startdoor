import {
  PencilFilled,
  ThreeDotsVertical,
  TrashFilled,
  UserFilled,
} from '@assets/icons';
import {
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
  USER_ROLES_CONST,
} from '@constants';
import { useAuth } from '@hooks/useAuth';
import { useComment } from '@hooks/useComment';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import type { IComment } from '@models/comment.types';
import type { IStudent } from '@models/studentData.types';
import { formatDateWithYearOrMonthAgo } from '@utils/formatData';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MenuExtraOptions } from '../MenuExtraOptions';
import type { MenuOption } from '../MenuExtraOptions/MenuExtraOptions';

interface Props {
  item: IComment;
  student: IStudent;
  onEdit: () => void;
}

export const CommentCardView = ({ item, student, onEdit }: Props) => {
  const { reviewId: urlReviewId } = useParams<{
    reviewId: string;
  }>();

  const contentRef = useRef<HTMLSpanElement>(null);

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { getUserId, getUserRole } = useAuth();
  const { getComments, deleteComment } = useComment();

  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldCollapse, setShouldCollapse] = useState(false);

  const userId = getUserId();
  const userRole = getUserRole();

  const isOwner =
    item.idEstudante === userId && userRole === USER_ROLES_CONST.ESTUDANTE;

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const isOverflowing = el.scrollHeight > el.clientHeight;
    setShouldCollapse(isOverflowing);
  }, [item.texto]);

  const onDelete = async (id: number) => {
    try {
      const confirmed = await modalMessageSafe({
        type: 'warning',
        message: MESSAGES_RESPONSE.WARNING.DELETE_COMMENT,
        shouldAcknowledge: true,
      });
      if (!confirmed) return;

      const response = await modalLoadingAuto(
        () => deleteComment(id),
        MESSAGES_LOADING.DELETE,
      );
      const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.DELETE;
      await modalMessageSafe({
        type: 'success',
        message,
        shouldBlockProcess: false,
      });
      await modalLoadingAuto(
        () => getComments(Number(urlReviewId)),
        MESSAGES_LOADING.GET,
      );
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
      onClick: () => onEdit(),
    },
    {
      text: 'Excluir',
      icon: (
        <TrashFilled width={18} height={18} className="text-(--grey-200)" />
      ),
      onClick: () => item.id && onDelete(item.id),
    },
  ] as MenuOption[];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        {item.anonimo && (
          <div className="w-fit rounded-lg bg-(--grey-1000) p-3">
            <UserFilled width={36} height={36} className="text-(--grey-400)" />
          </div>
        )}

        <div className="flex-1 gap-1">
          <div className="w-fullx flex justify-between">
            <span className="text-lg font-bold">{student.nome}</span>

            <div className="flex items-center gap-2">
              <span className="text-sm text-(--grey-200)">
                {formatDateWithYearOrMonthAgo(item.createdAt)}
              </span>
              {isOwner && (
                <MenuExtraOptions options={menuOptions} placement="bottom-end">
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

          <span className="text-(--grey-200)">@{student.user}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span
          ref={contentRef}
          className={`leading-8 text-(--grey-200) transition-all ${
            !isExpanded ? 'line-clamp-3' : ''
          }`}
        >
          {item.texto}
        </span>
      </div>

      {shouldCollapse && (
        <span
          onClick={() => setIsExpanded(prev => !prev)}
          className="w-fit cursor-pointer text-sm font-normal text-(--blue-200) opacity-80 hover:opacity-100"
        >
          {isExpanded ? 'Mostrar menos' : 'Mostrar mais'}
        </span>
      )}
    </div>
  );
};
