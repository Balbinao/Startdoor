import { Plus } from '@assets/icons';
import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import { AcademicExperienceCard } from '@components/ui/AcademicExperienceCard';
import { ButtonPill } from '@components/ui/ButtonPill';
import { ButtonSquare } from '@components/ui/ButtonSquare';
import { FormErrorMessage } from '@components/ui/FormErrorMessage';
import { ProfessionalExperienceCard } from '@components/ui/ProfessionalExperienceCard';
import { UserBanner } from '@components/ui/UserBanner';
import {
  DROPDOWN_VALUES_CONST,
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
  ROUTES_CONST,
  studentConditionalScoreUpdateFields,
} from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/useAuth';
import { useCompany } from '@hooks/useCompany';
import { useExperience } from '@hooks/useExperience';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useSector } from '@hooks/useSector';
import { useStudent } from '@hooks/useStudent';
import type {
  IAcademicExperience,
  IProfessionalExperience,
} from '@models/experience.types';
import {
  studentProfileUpdateSchema,
  type StudentProfileUpdateData,
} from '@schemas/studentProfileUpdateSchema';
import {
  normalizeConditionalScoreUpdateData,
  normalizeStudentData,
  normalizeStudentUpdateData,
  replaceEmptyWithNull,
} from '@utils/normalizeData';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const StudentProfileUpdateForm = () => {
  const { id: userId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const {
    academicExperienceCards,
    professionalExperienceCards,
    getAcademicExperienceCards,
    getProfessionalExperienceCards,
  } = useExperience();
  const { getUserId } = useAuth();
  const {
    getStudent,
    updateStudent,
    updateStudentPassword,
    getConditionalScore,
    updateConditionalScore,
  } = useStudent();
  const { sectorsItems, getSectors } = useSector();
  const { getCompanies } = useCompany();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [newAcademicExperienceCards, setNewAcademicExperienceCards] = useState<
    IAcademicExperience[]
  >([]);
  const [newProfessionalExperienceCards, setNewProfessionalExperienceCards] =
    useState<IProfessionalExperience[]>([]);

  const currentUserId = getUserId();
  if (currentUserId && currentUserId !== userId) {
    navigate(ROUTES_CONST.STUDENT.PROFILE(currentUserId));
  }

  const form = useForm<StudentProfileUpdateData>({
    resolver: zodResolver(studentProfileUpdateSchema(sectorsItems)),
    defaultValues: {
      nome: '',
      user: '',
      email: '',
      senha: '',
      dataNascimento: '',
      biografia: '',
      paisOrigem: '',
      modeloTrabalho: '',
      estadoAtuacao: '',
      setorInteresse: '',
      habilidadesPrincipais: '',
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
      linkSite: '',
      linkLinkedin: '',
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

        const response = await modalLoadingAuto(
          () => getStudent(Number(userId)),
          MESSAGES_LOADING.GET,
        );
        const responseTwo = await modalLoadingAuto(
          () => getConditionalScore(Number(userId)),
          MESSAGES_LOADING.GET,
        );

        reset(normalizeStudentData(response, responseTwo));

        await modalLoadingAuto(() => getCompanies(), MESSAGES_LOADING.GET);
        await modalLoadingAuto(() => getSectors(), MESSAGES_LOADING.GET);
        await modalLoadingAuto(
          () => getAcademicExperienceCards(Number(userId)),
          MESSAGES_LOADING.GET,
        );
        await modalLoadingAuto(
          () => getProfessionalExperienceCards(Number(userId)),
          MESSAGES_LOADING.GET,
        );

        setIsError(false);
      } catch (error: unknown) {
        await modalMessageError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  const handleAddNewAcademicExperienceCard = () => {
    const newCard: IAcademicExperience = {
      id: Date.now(),
      idEstudante: Number(userId),
      tituloEnsino: '',
      nomeEscola: '',
      estadoAtuacao: '',
      modeloEnsino: '',
      dataInicio: '',
      dataFim: '',
      descricao: '',
    };

    setNewAcademicExperienceCards(prev => [...prev, newCard]);
  };

  const handleAddNewProfessionalExperienceCard = () => {
    const newCard: IProfessionalExperience = {
      id: Date.now(),
      idEmpresa: 0,
      idEstudante: Number(userId),
      tituloCargo: '',
      estadoAtuacao: '',
      modeloTrabalho: '',
      dataInicio: '',
      dataFim: '',
      descricao: '',
    };

    setNewProfessionalExperienceCards(prev => [...prev, newCard]);
  };

  const handleRemoveNewAcademicExperienceCard = (id: number) => {
    setNewAcademicExperienceCards(prev => prev.filter(card => card.id !== id));
  };

  const handleRemoveNewProfessionalExperienceCard = (id: number) => {
    setNewProfessionalExperienceCards(prev =>
      prev.filter(card => card.id !== id),
    );
  };

  const onSubmit = async (data: StudentProfileUpdateData) => {
    console.log(data);
    try {
      if (!userId) {
        throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
      }

      const password = data.senha;
      if (password) {
        await modalLoadingAuto(
          () => updateStudentPassword(Number(userId), password),
          MESSAGES_LOADING.UPDATE,
        );
      }

      const sanitizedData = replaceEmptyWithNull(data);

      const conditionalScoreData =
        normalizeConditionalScoreUpdateData(sanitizedData);

      await modalLoadingAuto(
        () => updateConditionalScore(Number(userId), conditionalScoreData),
        MESSAGES_LOADING.UPDATE,
      );

      const studentData = normalizeStudentUpdateData(sanitizedData);

      const response = await modalLoadingAuto(
        () => updateStudent(Number(userId), studentData),
        MESSAGES_LOADING.UPDATE,
      );

      const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.UPDATE;
      await modalMessageSafe({
        type: 'success',
        message,
        shouldBlockProcess: false,
      });

      // navigate(ROUTES_CONST.STUDENT.PROFILE(userId));
      navigate(ROUTES_CONST.LOGIN);
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
          className="flex w-full max-w-3xl flex-col gap-14"
        >
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-5">
              <FormField<StudentProfileUpdateData>
                form={form}
                type="text"
                name="nome"
                label="Nome completo"
                placeholder="Digite seu nome"
                maxLength={60}
              />

              <FormField<StudentProfileUpdateData>
                form={form}
                type="text"
                name="user"
                label="Username"
                placeholder="Digite seu username"
                maxLength={30}
              />

              <FormField<StudentProfileUpdateData>
                form={form}
                type="email"
                name="email"
                label="Email"
                placeholder="Digite seu email"
                maxLength={50}
              />

              <FormField<StudentProfileUpdateData>
                form={form}
                type="password"
                name="senha"
                label="Senha"
                placeholder="Digite sua senha"
              />
            </div>

            <FormField<StudentProfileUpdateData>
              form={form}
              type="date"
              name="dataNascimento"
              label="Data de Nascimento"
            />

            <FormField<StudentProfileUpdateData>
              form={form}
              type="textarea"
              name="biografia"
              label="Biografia"
              placeholder="Conte um pouco sobre você"
            />

            <div className="flex flex-col gap-12">
              <div className="flex w-full gap-6">
                <FormField<StudentProfileUpdateData>
                  form={form}
                  type="select"
                  name="paisOrigem"
                  label="País de Origem"
                  options={DROPDOWN_VALUES_CONST.PAIS_ORIGEM.map(option => ({
                    ...option,
                  }))}
                />

                <FormField<StudentProfileUpdateData>
                  form={form}
                  type="select"
                  name="modeloTrabalho"
                  label="Modelo de Trabalho"
                  options={DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO.map(
                    option => ({ ...option }),
                  )}
                />
              </div>

              <div className="flex w-full gap-6">
                <FormField<StudentProfileUpdateData>
                  form={form}
                  type="select"
                  name="estadoAtuacao"
                  label="Estado de Atuação"
                  options={DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.map(option => ({
                    ...option,
                  }))}
                />

                <FormField<StudentProfileUpdateData>
                  form={form}
                  type="select"
                  name="setorInteresse"
                  label="Setor de Interesse"
                  options={sectorsItems}
                />
              </div>

              <FormField<StudentProfileUpdateData>
                form={form}
                type="textarea"
                name="habilidadesPrincipais"
                label="Habilidades Principais"
                placeholder="Descreva suas melhores habilidades..."
              />
            </div>

            <div className="flex flex-col gap-5">
              <FormField<StudentProfileUpdateData>
                form={form}
                type="text"
                name="linkSite"
                label="Site / Portfólio"
                placeholder="https://meusite.com"
              />

              <FormField<StudentProfileUpdateData>
                form={form}
                type="text"
                name="linkLinkedin"
                label="LinkedIn"
                placeholder="https://linkedin.com/in/seuusuario"
              />
            </div>

            <div className="grid max-w-md grid-cols-3 gap-5 self-center">
              {studentConditionalScoreUpdateFields.map(field => (
                <FormField form={form} key={field.name} {...field} />
              ))}
            </div>
          </div>

          <FormErrorMessage />

          <div className="flex flex-col items-center gap-3">
            <ButtonPill
              type="submit"
              text="Salvar"
              submittingText="Alterando dados..."
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </FormWrapper>

      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-xl flex-col gap-6">
          <h2 className="text-2xl font-semibold">Experiência Acadêmica</h2>
          {academicExperienceCards.map(item => (
            <AcademicExperienceCard key={item.id} item={item} />
          ))}

          {newAcademicExperienceCards.map(item => (
            <AcademicExperienceCard
              key={item.id}
              item={item}
              isNew
              onRemove={() => handleRemoveNewAcademicExperienceCard(item.id)}
            />
          ))}

          {academicExperienceCards.length === 0 &&
            newAcademicExperienceCards.length === 0 && (
              <span className="empty-message">
                Nenhuma experiêcia acadêmica encontrada...
              </span>
            )}

          {academicExperienceCards.length <= 5 &&
            newAcademicExperienceCards.length === 0 && (
              <div className="flex justify-end">
                <ButtonSquare
                  type="button"
                  text="Adicionar"
                  isSubmitting={isSubmitting}
                  iconLeft={<Plus width={22} height={22} />}
                  onClick={handleAddNewAcademicExperienceCard}
                />
              </div>
            )}
        </div>
      </div>

      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-xl flex-col gap-6">
          <h2 className="text-2xl font-semibold">Experiência Profissional</h2>
          {professionalExperienceCards.map(item => (
            <ProfessionalExperienceCard key={item.id} item={item} />
          ))}

          {newProfessionalExperienceCards.map(item => (
            <ProfessionalExperienceCard
              key={item.id}
              item={item}
              isNew
              onRemove={() =>
                handleRemoveNewProfessionalExperienceCard(item.id)
              }
            />
          ))}

          {professionalExperienceCards.length === 0 &&
            newProfessionalExperienceCards.length === 0 && (
              <span className="empty-message">
                Nenhuma experiêcia acadêmica encontrada...
              </span>
            )}

          {professionalExperienceCards.length <= 5 &&
            newAcademicExperienceCards.length === 0 && (
              <div className="flex justify-end">
                <ButtonSquare
                  type="button"
                  text="Adicionar"
                  isSubmitting={isSubmitting}
                  iconLeft={<Plus width={22} height={22} />}
                  onClick={handleAddNewProfessionalExperienceCard}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
