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
import type { IProfessionalExperience } from '@models/experience.types';
import {
  professionalExperienceCardSchema,
  type ProfessionalExperienceCardData,
} from '@schemas/professionalExperienceCardSchema';
import {
  normalizeProfessionalExperienceUpdate,
  replaceEmptyWithNull,
} from '@utils/normalizeData';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SupportButton } from '../SupportButton';

interface Props {
  item: IProfessionalExperience;
  onEdit: () => void;
  isNew?: boolean;
  onRemove?: () => void;
}

export const ProfessionalExperienceCardEdit = ({
  item,
  onEdit,
  isNew,
  onRemove,
}: Props) => {
  const { id: userId } = useParams<{ id: string }>();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const {
    getProfessionalExperienceCards,
    createProfessionalExperienceCard,
    updateProfessionalExperienceCard,
  } = useExperience();

  const form = useForm<ProfessionalExperienceCardData>({
    resolver: zodResolver(professionalExperienceCardSchema),
    defaultValues: {
      idEmpresa: item?.idEmpresa ?? '',
      tituloCargo: item?.tituloCargo ?? '',
      estadoAtuacao: item?.estadoAtuacao ?? '',
      modeloTrabalho: item?.modeloTrabalho ?? '',
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

  const onSubmit = async (data: ProfessionalExperienceCardData) => {
    try {
      if (!userId) {
        throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
      }

      const sanitizedData = replaceEmptyWithNull(data);
      const professionalExperience =
        normalizeProfessionalExperienceUpdate(sanitizedData);

      // Cadastrar experiencia profissional
      if (isNew) {
        const response = await modalLoadingAuto(
          () =>
            createProfessionalExperienceCard(
              Number(userId),
              professionalExperience,
            ),
          MESSAGES_LOADING.CREATE,
        );
        const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.CREATE;
        await modalMessageSafe({
          type: 'success',
          message,
          shouldBlockProcess: false,
        });
        await modalLoadingAuto(
          () => getProfessionalExperienceCards(Number(userId)),
          MESSAGES_LOADING.GET,
        );
        return;
      }

      // Alterar experiencia profissional
      const response = await modalLoadingAuto(
        () =>
          updateProfessionalExperienceCard(
            Number(userId),
            professionalExperience,
          ),
        MESSAGES_LOADING.UPDATE,
      );
      const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.UPDATE;
      await modalMessageSafe({
        type: 'success',
        message,
        shouldBlockProcess: false,
      });
      await modalLoadingAuto(
        () => getProfessionalExperienceCards(Number(userId)),
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
          <FormField<ProfessionalExperienceCardData>
            form={form}
            type="text"
            name="tituloCargo"
            label="Título do Ensino"
            placeholder="Informe o título do ensino..."
            maxLength={60}
          />

          <FormField<ProfessionalExperienceCardData>
            form={form}
            type="select"
            name="idEmpresa"
            label="Empresa"
            options={DROPDOWN_VALUES_CONST.MOCK_EMPRESAS.map(option => ({
              ...option,
              value: Number(option.value),
            }))}
          />

          <div className="flex w-full gap-6">
            <FormField<ProfessionalExperienceCardData>
              form={form}
              type="select"
              name="estadoAtuacao"
              label="Estado de Atuação"
              options={DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.map(option => ({
                ...option,
              }))}
            />

            <FormField<ProfessionalExperienceCardData>
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
            <p className="text-(--grey-300)">Período Escolar</p>
            <div className="flex gap-4">
              <FormField<ProfessionalExperienceCardData>
                form={form}
                type="date"
                name="dataInicio"
              />
              <div className="mt-3 text-(--grey-400)">—</div>
              <FormField<ProfessionalExperienceCardData>
                form={form}
                type="date"
                name="dataFim"
              />
            </div>
          </div>

          <FormField<ProfessionalExperienceCardData>
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
                if (isNew && onRemove) {
                  onRemove();
                } else {
                  onEdit();
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
