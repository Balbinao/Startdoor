import { UserFilled } from '@assets/icons';
import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import { MESSAGES_LOADING, MESSAGES_RESPONSE } from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/useAuth';
import { useComment } from '@hooks/useComment';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import type { IComment } from '@models/comment.types';
import type { IStudent } from '@models/studentData.types';
import { commentSchema, type CommentData } from '@schemas/commentSchema';
import { formatDateWithYearOrMonthAgo } from '@utils/formatData';
import { normalizeCommentUpdate } from '@utils/normalizeData';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SupportButton } from '../SupportButton';

interface Props {
  item: IComment;
  student: IStudent;
  onEdit?: () => void;
}

export const CommentCardEdit = ({ item, student, onEdit }: Props) => {
  const { reviewId: urlReviewId } = useParams<{
    reviewId: string;
  }>();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { getUserId } = useAuth();

  const { getComments, updateComment } = useComment();

  const userId = getUserId();

  const form = useForm<CommentData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      texto: item.texto ?? '',
      anonimo: item.anonimo,
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: CommentData) => {
    try {
      if (!urlReviewId) {
        throw new Error(MESSAGES_RESPONSE.WARNING.REVIEW_ID_NOT_FOUND);
      }

      const comment = normalizeCommentUpdate(data);

      const response = await modalLoadingAuto(
        () => updateComment(Number(userId), comment),
        MESSAGES_LOADING.UPDATE,
      );
      const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.UPDATE;
      await modalMessageSafe({
        type: 'success',
        message,
        shouldBlockProcess: false,
      });

      onEdit?.();

      await modalLoadingAuto(
        () => getComments(Number(urlReviewId)),
        MESSAGES_LOADING.GET,
      );
    } catch (error: unknown) {
      await modalMessageError(error);
    }
  };

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
            </div>
          </div>

          <span className="text-(--grey-200)">@{student.user}</span>
        </div>
      </div>
      <FormWrapper form={form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-1 flex-col gap-6"
        >
          <span>
            <FormField
              form={form}
              type="textarea"
              name="texto"
              placeholder="Faça um comentário sobre a avaliação"
            />
          </span>
          <div className="flex justify-between">
            <span>
              <FormField
                form={form}
                type="checkbox"
                name="anonimo"
                label="Postar comentário ANÔNIMO"
              />
            </span>

            <div className="flex gap-4">
              <SupportButton
                type="button"
                variant="deny"
                text="Cancelar"
                onClick={() => {
                  onEdit?.();
                }}
              />

              <SupportButton type="submit" text="Salvar" />
            </div>
          </div>
        </form>
      </FormWrapper>
    </div>
  );
};
