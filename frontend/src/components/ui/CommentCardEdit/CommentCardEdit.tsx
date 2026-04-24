import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import { MESSAGES_LOADING, MESSAGES_RESPONSE } from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useComment } from '@hooks/useComment';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import type { IComment } from '@models/comment.types';
import { commentSchema, type CommentData } from '@schemas/commentSchema';
import { formatDateWithYearOrMonthAgo } from '@utils/formatData';
import { normalizeCommentUpdate } from '@utils/normalizeData';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SupportButton } from '../SupportButton';
import { UserProfilePicture } from '../UserProfilePicture';

interface Props {
  item: IComment;
  onEdit?: () => void;
}

export const CommentCardEdit = ({ item, onEdit }: Props) => {
  const { reviewId: urlReviewId } = useParams<{
    reviewId: string;
  }>();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { getAllReviewComments, updateCommentStudent, updateCommentCompany } =
    useComment();

  const form = useForm<CommentData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      texto: item.text ?? '',
      anonima: item.anonymous ?? false,
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: CommentData) => {
    try {
      console.log('aaa');
      if (!urlReviewId) {
        throw new Error(MESSAGES_RESPONSE.WARNING.REVIEW_ID_NOT_FOUND);
      }

      const comment = normalizeCommentUpdate(data);

      if (item.type === 'ESTUDANTE') {
        const response = await modalLoadingAuto(
          () => updateCommentStudent(item.id, comment),
          MESSAGES_LOADING.UPDATE,
        );

        const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.UPDATE;
        await modalMessageSafe({
          type: 'success',
          message,
          shouldBlockProcess: false,
        });
      } else {
        const response = await modalLoadingAuto(
          () => updateCommentCompany(item.id, comment),
          MESSAGES_LOADING.UPDATE,
        );

        const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.UPDATE;
        await modalMessageSafe({
          type: 'success',
          message,
          shouldBlockProcess: false,
        });
      }

      onEdit?.();

      await modalLoadingAuto(
        () => getAllReviewComments(Number(urlReviewId)),
        MESSAGES_LOADING.GET,
      );
    } catch (error: unknown) {
      await modalMessageError(error);
    }
  };

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
          <div className="w-fullx flex justify-between">
            <span className="text-lg font-bold">{item.authorName}</span>

            <div className="flex items-center gap-2">
              <span className="text-sm text-(--grey-200)">
                {formatDateWithYearOrMonthAgo(item.createdAt)}
              </span>
            </div>
          </div>

          <span className="text-(--grey-200)">@{item.authorUsername}</span>
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
              {item.type === 'ESTUDANTE' && (
                <FormField
                  form={form}
                  type="checkbox"
                  name="anonima"
                  label="Postar comentário ANÔNIMO"
                />
              )}
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
