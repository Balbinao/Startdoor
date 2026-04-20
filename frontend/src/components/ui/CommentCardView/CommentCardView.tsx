import { PencilFilled, ThreeDotsVertical, TrashFilled } from '@assets/icons';
import { MESSAGES_LOADING, MESSAGES_RESPONSE } from '@constants';
import { useAuth } from '@hooks/useAuth';
import { useComment } from '@hooks/useComment';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import type { IComment } from '@models/comment.types';
import { formatDateWithYearOrMonthAgo } from '@utils/formatData';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MenuExtraOptions } from '../MenuExtraOptions';
import type { MenuOption } from '../MenuExtraOptions/MenuExtraOptions';
import { UserProfilePicture } from '../UserProfilePicture';

interface Props {
  item: IComment;
  onEdit: () => void;
}

export const CommentCardView = ({ item, onEdit }: Props) => {
  const { reviewId: urlReviewId } = useParams<{ reviewId: string }>();

  const contentRef = useRef<HTMLDivElement>(null);

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { getUserId, getUserRole } = useAuth();
  const { getAllReviewComments, deleteCommentStudent, deleteCommentCompany } =
    useComment();

  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState<string>('0px');
  const [shouldCollapse, setShouldCollapse] = useState(false);

  const userId = getUserId();
  const userRole = getUserRole();

  const isOwner = item.authorId === userId && item.type === userRole;

  const lineHeight = 32;
  const maxLines = 3;
  const collapsedHeight = lineHeight * maxLines;

  useEffect(() => {
    if (contentRef.current) {
      const fullHeight = contentRef.current.scrollHeight;
      setHeight(`${fullHeight}px`);
      setShouldCollapse(fullHeight > collapsedHeight);
    }
  }, [item.text, collapsedHeight]);

  const onDelete = async (id: number) => {
    try {
      const confirmed = await modalMessageSafe({
        type: 'warning',
        message: MESSAGES_RESPONSE.WARNING.DELETE_COMMENT,
        shouldAcknowledge: true,
      });
      if (!confirmed) return;

      if (item.type === 'ESTUDANTE') {
        const response = await modalLoadingAuto(
          () => deleteCommentStudent(id),
          MESSAGES_LOADING.DELETE,
        );

        const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.DELETE;
        await modalMessageSafe({
          type: 'success',
          message,
          shouldBlockProcess: false,
        });
      } else {
        const response = await modalLoadingAuto(
          () => deleteCommentCompany(id),
          MESSAGES_LOADING.DELETE,
        );

        const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.DELETE;
        await modalMessageSafe({
          type: 'success',
          message,
          shouldBlockProcess: false,
        });
      }

      await modalLoadingAuto(
        () => getAllReviewComments(Number(urlReviewId)),
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
        <UserProfilePicture
          userId={item.authorId}
          size={64}
          src={item.authorPhotoUrl}
          isAnonymous={item.anonymous}
          defaultIconType={item.type === 'ESTUDANTE' ? 'student' : 'company'}
        />

        <div className="flex-1 gap-1">
          <div className="flex w-full justify-between">
            <span className="text-lg font-bold">
              {isOwner
                ? 'Você'
                : item.anonymous
                  ? 'Usuário Anônimo'
                  : item.authorName}
            </span>

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

          {!item.anonymous && (
            <span className="text-(--grey-200)">@{item.authorUsername}</span>
          )}
        </div>
      </div>

      <div className="relative">
        <div
          ref={contentRef}
          style={{
            height:
              isExpanded || !shouldCollapse ? height : `${collapsedHeight}px`,
          }}
          className="overflow-hidden leading-8 text-(--grey-200) transition-[height] duration-300 ease-in-out"
        >
          {item.text}
        </div>

        {!isExpanded && shouldCollapse && (
          <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-linear-to-t from-(--grey-1300) to-transparent" />
        )}
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
