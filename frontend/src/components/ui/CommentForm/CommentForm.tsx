import { Filter, SendFilled } from '@assets/icons';
import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import {
  DROPDOWN_VALUES_CONST,
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
  USER_ROLES_CONST,
} from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/useAuth';
import { useComment } from '@hooks/useComment';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useReview } from '@hooks/useReview';
import { useStudent } from '@hooks/useStudent';
import { commentSchema, type CommentData } from '@schemas/commentSchema';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ButtonSquare } from '../ButtonSquare';
import { CommentCard } from '../CommentCard';

export const CommentForm = () => {
  const { reviewId: urlReviewId } = useParams<{
    reviewId: string;
  }>();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { getUserId, getUserRole } = useAuth();
  const { review } = useReview();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const [sortOrder, setSortOrder] = useState<string>('');

  const userId = getUserId();
  const userRole = getUserRole();

  const {
    comments,
    getAllReviewComments,
    createCommentStudent,
    createCommentCompany,
  } = useComment();
  const { getStudents } = useStudent();

  const form = useForm<CommentData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      texto: '',
      anonima: false,
    },
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        if (!userId) {
          throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
        }
        if (!urlReviewId) {
          throw new Error(MESSAGES_RESPONSE.WARNING.REVIEW_ID_NOT_FOUND);
        }

        await modalLoadingAuto(
          () => getAllReviewComments(Number(urlReviewId)),
          MESSAGES_LOADING.GET,
        );
        await modalLoadingAuto(() => getStudents(), MESSAGES_LOADING.GET);

        setIsError(false);
      } catch (error: unknown) {
        await modalMessageError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  const onSubmit = async (data: CommentData) => {
    try {
      if (!userId) {
        throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
      }
      if (!userRole) {
        throw new Error(MESSAGES_RESPONSE.WARNING.USER_ROLE_NOT_FOUND);
      }
      if (!urlReviewId) {
        throw new Error(MESSAGES_RESPONSE.WARNING.REVIEW_ID_NOT_FOUND);
      }

      if (userRole === USER_ROLES_CONST.ESTUDANTE) {
        const response = await modalLoadingAuto(
          () => createCommentStudent(Number(urlReviewId), data),
          MESSAGES_LOADING.UPDATE,
        );

        const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.CREATE;
        await modalMessageSafe({
          type: 'success',
          message,
          shouldBlockProcess: false,
        });
      } else if (userRole === USER_ROLES_CONST.EMPRESA) {
        const response = await modalLoadingAuto(
          () => createCommentCompany(Number(urlReviewId), data),
          MESSAGES_LOADING.UPDATE,
        );

        const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.CREATE;
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

      setSortOrder('');
      reset();
    } catch (error: unknown) {
      await modalMessageError(error);
    }
  };

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="flex w-full flex-col gap-16">
      {((userRole === USER_ROLES_CONST.EMPRESA &&
        userId === review?.empresaId) ||
        userRole === USER_ROLES_CONST.ESTUDANTE) && (
        <FormWrapper form={form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6"
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
                {!(userRole === USER_ROLES_CONST.EMPRESA) && (
                  <FormField
                    form={form}
                    type="checkbox"
                    name="anonima"
                    label="Postar comentário ANÔNIMO"
                  />
                )}
              </span>

              <ButtonSquare
                type="submit"
                text="Enviar"
                iconLeft={<SendFilled width={20} height={20} />}
              />
            </div>
          </form>
        </FormWrapper>
      )}

      <div className="flex items-center justify-between gap-2">
        <span>
          {comments.length} Comentário{comments.length > 1 && 's'}
        </span>
        <span className="w-56">
          <FormField
            type="select"
            name="sortOrder"
            value={sortOrder}
            options={DROPDOWN_VALUES_CONST.REVIEWS_SORT.map(option => ({
              ...option,
            }))}
            onChange={async (selectedValue: string | number) => {
              setSortOrder(String(selectedValue));

              if (
                selectedValue === 'Mais recentes' ||
                selectedValue === 'Mais antigas'
              ) {
                await modalLoadingAuto(
                  () =>
                    getAllReviewComments(Number(urlReviewId), selectedValue),
                  MESSAGES_LOADING.GET,
                );
              }
            }}
            iconLeft={
              <Filter className="text-(--grey-300)" width={20} height={20} />
            }
          />
        </span>
      </div>

      <div className="flex flex-col gap-12">
        {comments.map(item => {
          return <CommentCard key={item.id} item={item} />;
        })}

        {comments.length === 0 && (
          <span className="empty-message">
            Seja o primeiro a fazer um comentário!
          </span>
        )}
      </div>
    </div>
  );
};
