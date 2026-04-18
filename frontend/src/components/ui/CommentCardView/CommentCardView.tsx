import {
  BriefcaseFilled,
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
import type { ICommentCompany, ICommentStudent } from '@models/comment.types';
import type { ICompany } from '@models/companyData.types';
import type { IStudent } from '@models/studentData.types';
import { formatDateWithYearOrMonthAgo } from '@utils/formatData';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MenuExtraOptions } from '../MenuExtraOptions';
import type { MenuOption } from '../MenuExtraOptions/MenuExtraOptions';

interface Props {
  item: ICommentStudent | ICommentCompany;
  user: IStudent | ICompany;
  onEdit: () => void;
}

export const CommentCardView = ({ item, user, onEdit }: Props) => {
  const { reviewId: urlReviewId } = useParams<{ reviewId: string }>();

  const contentRef = useRef<HTMLSpanElement>(null);

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { getUserId, getUserRole } = useAuth();
  const { getComments, deleteComment } = useComment();

  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldCollapse, setShouldCollapse] = useState(false);

  const userId = getUserId();
  const userRole = getUserRole();

  const isStudentComment = 'idEstudante' in item;
  const isStudentUser = 'nome' in user;

  const isOwner =
    (isStudentComment &&
      item.idEstudante === userId &&
      userRole === USER_ROLES_CONST.ESTUDANTE) ||
    (!isStudentComment &&
      item.idEmpresa === userId &&
      userRole === USER_ROLES_CONST.EMPRESA);

  const name = isStudentUser ? user.nome : user.nomeFantasia;
  const username = isStudentUser ? user.user : user.username;

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

  const menuOptions: MenuOption[] = [
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
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="h-16 w-16">
          {user?.fotoUrl && !item.anonimo ? (
            <img src={user.fotoUrl} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full rounded-lg bg-(--grey-1000) p-3">
              {isStudentUser ? (
                <UserFilled className="h-full w-full text-(--grey-400)" />
              ) : (
                <BriefcaseFilled className="h-full w-full text-(--grey-400)" />
              )}
            </div>
          )}
        </div>

        <div className="flex-1 gap-1">
          <div className="flex w-full justify-between">
            <span className="text-lg font-bold">{name}</span>

            <div className="flex items-center gap-2">
              <span className="text-sm text-(--grey-200)">
                {formatDateWithYearOrMonthAgo(item.createdAt)}
              </span>

              {isOwner && (
                <MenuExtraOptions options={menuOptions} placement="bottom-end">
                  <div className="cursor-pointer px-1 py-1">
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

          <span className="text-(--grey-200)">@{username}</span>
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
