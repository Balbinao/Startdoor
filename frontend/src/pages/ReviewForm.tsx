import { StarFilled } from '@assets/icons';
import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import { ButtonPill } from '@components/ui/ButtonPill';
import { FieldDoubleRange } from '@components/ui/FieldDoubleRange';
import { FormErrorMessage } from '@components/ui/FormErrorMessage';
import { UserBanner } from '@components/ui/UserBanner';
import {
  DROPDOWN_VALUES_CONST,
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
  reviewScoreFields,
  ROUTES_CONST,
  USER_ROLES_CONST,
} from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/useAuth';
import { useCompany } from '@hooks/useCompany';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useReview } from '@hooks/useReview';
import { useSector } from '@hooks/useSector';
import { reviewSchema, type ReviewData } from '@schemas/reviewSchema';
import {
  normalizeReviewData,
  normalizeReviewPayload,
} from '@utils/normalizeData';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export const ReviewForm = () => {
  const { id: urlUserId, reviewId: urlReviewId } = useParams<{
    id: string;
    reviewId: string;
  }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { sectorsOptions, getSectors } = useSector();
  const { review, getReview, createReview, updateReview } = useReview();
  const { getCompanies, companiesOptions } = useCompany();
  const { getUserId, getUserRole } = useAuth();

  const userId = getUserId();
  const userRole = getUserRole();

  const isEditMode = Boolean(urlReviewId);

  const form = useForm<ReviewData>({
    resolver: zodResolver(reviewSchema(sectorsOptions)),
    defaultValues: {
      empresaId: '',
      setorId: '',
      estadoAtuacao: '',
      modeloTrabalho: '',
      dataInicio: '',
      dataFim: '',
      tituloCargo: '',
      textoAvaliacao: '',
      faixaSalarial: {
        min: 1500,
        max: 3000,
      },
      ambiente: '',
      aprendizado: '',
      beneficios: '',
      cultura: '',
      efetivacao: '',
      entrevista: '',
      feedback: '',
      infraestrutura: '',
      integracao: '',
      remuneracao: '',
      rotina: '',
      lideranca: '',
    },
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        if (!userId) {
          throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
        }

        if (isEditMode) {
          const response = await modalLoadingAuto(
            () => getReview(Number(urlReviewId)),
            MESSAGES_LOADING.GET,
          );

          reset(normalizeReviewData(response));
        }

        await modalLoadingAuto(() => getCompanies(), MESSAGES_LOADING.GET);
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

  const onSubmit = async (data: ReviewData) => {
    try {
      if (!userId) {
        throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
      }

      if (isEditMode) {
        if (!review?.id) {
          throw new Error(MESSAGES_RESPONSE.WARNING.REVIEW_ID_NOT_FOUND);
        }

        const nomalizedData = normalizeReviewPayload(data);

        const response = await modalLoadingAuto(
          () => updateReview(review.id, nomalizedData),
          MESSAGES_LOADING.UPDATE,
        );

        const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.UPDATE;

        await modalMessageSafe({
          type: 'success',
          message,
          shouldBlockProcess: false,
        });

        navigate(ROUTES_CONST.REVIEW.REVIEW_VIEW_BY_ID(userId, review.id));
      } else {
        const nomalizedData = normalizeReviewPayload(data);
        const response = await modalLoadingAuto(
          () => createReview(userId, nomalizedData),
          MESSAGES_LOADING.UPDATE,
        );

        const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.UPDATE;

        await modalMessageSafe({
          type: 'success',
          message,
          shouldBlockProcess: false,
        });

        navigate(ROUTES_CONST.STUDENT.PROFILE_BY_ID(userId));
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : MESSAGES_RESPONSE.ERROR.SERVER;

      setError('root.serverError', {
        type: 'server',
        message,
      });

      await modalMessageError(error);
    }
  };

  if (!userId) return <Navigate to={ROUTES_CONST.LOGIN} replace />;
  if (userRole === USER_ROLES_CONST.EMPRESA)
    return <Navigate to={ROUTES_CONST.COMPANY.PROFILE_BY_ID(userId)} replace />;
  if (urlUserId !== String(userId)) {
    return <Navigate to={ROUTES_CONST.STUDENT.PROFILE_BY_ID(userId)} replace />;
  }

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="flex h-full flex-1 flex-col items-center gap-32">
      <UserBanner type="ESTUDANTE" id={Number(userId)} />

      <FormWrapper form={form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-12"
        >
          <FormField<ReviewData>
            form={form}
            type="select"
            name="empresaId"
            label="Empresa"
            options={companiesOptions}
          />

          <div className="flex flex-col gap-6">
            <FormField<ReviewData>
              form={form}
              type="select"
              name="setorId"
              label="Setor de Atuação"
              options={sectorsOptions}
            />

            <div className="flex w-full gap-6">
              <FormField<ReviewData>
                form={form}
                type="select"
                name="estadoAtuacao"
                label="Estado de Atuação"
                options={DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.map(option => ({
                  ...option,
                }))}
              />

              <FormField<ReviewData>
                form={form}
                type="select"
                name="modeloTrabalho"
                label="Modelo de Trabalho"
                options={DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO.map(
                  option => ({
                    ...option,
                  }),
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-(--grey-300)">Período do Estágio</p>
              <div className="flex gap-4">
                <FormField<ReviewData>
                  form={form}
                  type="date"
                  name="dataInicio"
                />
                <div className="mt-3 text-(--grey-400)">—</div>
                <FormField<ReviewData> form={form} type="date" name="dataFim" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <FormField<ReviewData>
              form={form}
              type="textarea"
              name="tituloCargo"
              label="Nome do Estágio"
              placeholder="Escreva o nome do estágio..."
            />

            <FormField<ReviewData>
              form={form}
              type="textarea"
              name="textoAvaliacao"
              label="Avaliação do Estágio"
              placeholder="Descreva sua experiência no estágio..."
            />
          </div>

          <FieldDoubleRange
            form={form}
            type="doubleRange"
            name="faixaSalarial"
            label="Faixa Salarial"
            minLimit={0}
            maxLimit={5000}
            step={50}
            unitType="R$"
          />

          <div className="self-end">
            <FormField<ReviewData>
              form={form}
              type="checkbox"
              name="anonima"
              label="Postar avaliação ANÔNIMA"
            />
          </div>

          <div className="grid w-full max-w-md grid-cols-3 gap-5 self-center">
            {reviewScoreFields.map(([name, label]) => (
              <FormField
                key={name}
                form={form}
                type="select"
                name={name}
                label={label}
                options={DROPDOWN_VALUES_CONST.NOTA}
                iconLeft={
                  <StarFilled
                    className="text-(--yellow-100)"
                    width={18}
                    height={18}
                  />
                }
              />
            ))}
          </div>

          <FormErrorMessage />

          <div className="flex flex-col items-center gap-3">
            <ButtonPill
              type="submit"
              text={isEditMode ? 'Salvar alterações' : 'Criar avaliação'}
              submittingText={
                isEditMode ? MESSAGES_LOADING.UPDATE : MESSAGES_LOADING.CREATE
              }
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </FormWrapper>
    </div>
  );
};
