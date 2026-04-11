import { StarFilled } from '@assets/icons';
import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import { ButtonPill } from '@components/ui/ButtonPill';
import { FormErrorMessage } from '@components/ui/FormErrorMessage';
import { UserBanner } from '@components/ui/UserBanner';
import {
  DROPDOWN_VALUES_CONST,
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
  reviewScoreFields,
  ROUTES_CONST,
} from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCompany } from '@hooks/useCompany';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useReview } from '@hooks/useReview';
import { useSector } from '@hooks/useSector';
import { reviewSchema, type ReviewData } from '@schemas/reviewSchema';
import { normalizeReviewData } from '@utils/normalizeData';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

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

  const { sectorsItems, getSectors } = useSector();
  const { getReview, updateReview } = useReview();
  const { getCompanies, companiesOptions } = useCompany();

  const form = useForm<ReviewData>({
    resolver: zodResolver(reviewSchema(sectorsItems)),
    defaultValues: {
      idEmpresa: 0,
      idSetor: '',
      estadoAtuacao: '',
      modeloTrabalho: '',
      dataInicio: '',
      dataFim: undefined,
      tituloCargo: '',
      textoAvaliacao: '',
      salarioMin: 0,
      salarioMax: 0,
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

        if (!urlUserId) {
          throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
        }
        if (!urlReviewId) {
          throw new Error(MESSAGES_RESPONSE.WARNING.REVIEW_ID_NOT_FOUND);
        }

        const response = await modalLoadingAuto(
          () => getReview(Number(urlReviewId)),
          MESSAGES_LOADING.GET,
        );
        reset(normalizeReviewData(response));

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
      if (!urlUserId) {
        throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
      }
      if (!urlReviewId) {
        throw new Error(MESSAGES_RESPONSE.WARNING.REVIEW_ID_NOT_FOUND);
      }

      const response = await modalLoadingAuto(
        () => updateReview(Number(urlUserId), data),
        MESSAGES_LOADING.UPDATE,
      );

      const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.UPDATE;
      await modalMessageSafe({
        type: 'success',
        message,
        shouldBlockProcess: false,
      });

      navigate(ROUTES_CONST.STUDENT.PROFILE(urlUserId));
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

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="flex h-full flex-col items-center gap-32">
      <UserBanner />

      <FormWrapper form={form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-3xl flex-col gap-12"
        >
          <FormField<ReviewData>
            form={form}
            type="select"
            name="idEmpresa"
            label="Empresa"
            options={companiesOptions}
          />

          <div className="flex flex-col gap-6">
            <FormField<ReviewData>
              form={form}
              type="select"
              name="idSetor"
              label="Setor de Atuação"
              options={sectorsItems}
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

          <div className="self-end">
            <FormField<ReviewData>
              form={form}
              type="checkbox"
              name="anonima"
              label="Postar avaliação ANÔNIMA"
            />
          </div>

          <div className="grid w-full max-w-sm grid-cols-3 gap-5 self-center">
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
              text="Salvar"
              submittingText={MESSAGES_LOADING.CREATE}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </FormWrapper>
    </div>
  );
};
