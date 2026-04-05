import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import {
  DROPDOWN_VALUES_CONST,
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
} from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useExperience } from '@hooks/useExperience';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import type { IAcademicExperience } from '@models/experience.types';
import {
  academicExperienceCardSchema,
  type AcademicExperienceCardData,
} from '@schemas/academicExperienceCardSchema';
import {
  normalizeAcademicExperienceUpdate,
  replaceEmptyWithNull,
} from '@utils/normalizeData';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SupportButton } from '../SupportButton';

interface Props {
  item: IAcademicExperience;
  isNew?: boolean;
  onEdit?: () => void;
  onRemove?: () => void;
}

export const AcademicExperienceCardEdit = ({
  item,
  onEdit,
  isNew,
  onRemove,
}: Props) => {
  const { id: userId } = useParams<{ id: string }>();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const {
    getAcademicExperienceCards,
    createAcademicExperienceCard,
    updateAcademicExperienceCard,
  } = useExperience();

  const form = useForm<AcademicExperienceCardData>({
    resolver: zodResolver(academicExperienceCardSchema),
    defaultValues: {
      tituloEnsino: item?.tituloEnsino ?? '',
      nomeEscola: item?.nomeEscola ?? '',
      estadoAtuacao: item?.estadoAtuacao ?? '',
      modeloEnsino: item?.modeloEnsino ?? '',
      dataInicio: item?.dataInicio ?? '',
      dataFim: item?.dataFim ?? '',
      descricao: item?.descricao ?? '',
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: AcademicExperienceCardData) => {
    try {
      if (!userId) {
        throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
      }

      const sanitizedData = replaceEmptyWithNull(data);
      const academicExperience =
        normalizeAcademicExperienceUpdate(sanitizedData);

      // Cadastrar experiencia academica
      if (isNew) {
        const response = await modalLoadingAuto(
          () =>
            createAcademicExperienceCard(Number(userId), academicExperience),
          MESSAGES_LOADING.CREATE,
        );
        const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.CREATE;
        await modalMessageSafe({
          type: 'success',
          message,
          shouldBlockProcess: false,
        });

        onRemove?.();

        await modalLoadingAuto(
          () => getAcademicExperienceCards(Number(userId)),
          MESSAGES_LOADING.GET,
        );
        return;
      }

      // Alterar experiencia academica
      const response = await modalLoadingAuto(
        () => updateAcademicExperienceCard(item.id, academicExperience),
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
        () => getAcademicExperienceCards(Number(userId)),
        MESSAGES_LOADING.GET,
      );
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

  return (
    <div className="flex w-full flex-col gap-3 rounded-md border border-(--grey-800) bg-(--grey-1000) p-3">
      <FormWrapper form={form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-1 flex-col gap-6"
        >
          <FormField<AcademicExperienceCardData>
            form={form}
            type="text"
            name="tituloEnsino"
            label="Título do Ensino"
            placeholder="Informe o título do ensino..."
            maxLength={60}
          />

          <FormField<AcademicExperienceCardData>
            form={form}
            type="text"
            name="nomeEscola"
            label="Nome da Escola"
            placeholder="Informe o nome da escola..."
            maxLength={60}
          />

          <div className="flex w-full gap-6">
            <FormField<AcademicExperienceCardData>
              form={form}
              type="select"
              name="estadoAtuacao"
              label="Estado de Atuação"
              options={DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.map(option => ({
                ...option,
              }))}
            />

            <FormField<AcademicExperienceCardData>
              form={form}
              type="select"
              name="modeloEnsino"
              label="Modelo de Ensino"
              options={DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO.map(
                option => ({
                  ...option,
                }),
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-(--grey-300)">Período Escolar</p>
            <div className="flex gap-4">
              <FormField<AcademicExperienceCardData>
                form={form}
                type="date"
                name="dataInicio"
              />
              <div className="mt-3 text-(--grey-400)">—</div>
              <FormField<AcademicExperienceCardData>
                form={form}
                type="date"
                name="dataFim"
              />
            </div>
          </div>

          <FormField<AcademicExperienceCardData>
            form={form}
            type="textarea"
            name="descricao"
            label="Descrição"
            placeholder="Comente sobre a sua experiência acadêmica..."
          />

          <div className="flex justify-end gap-4">
            <SupportButton
              type="button"
              variant="deny"
              text="Cancelar"
              isSubmitting={isSubmitting}
              onClick={() => {
                if (isNew) {
                  onRemove?.();
                } else {
                  onEdit?.();
                }
              }}
            />

            <SupportButton
              type="submit"
              text="Salvar"
              submittingText="Alterando dados..."
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </FormWrapper>
    </div>
  );
};
