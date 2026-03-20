import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import { ButtonPill } from '@components/ui/ButtonPill';
import { FormErrorMessage } from '@components/ui/FormErrorMessage';
import { UserBanner } from '@components/ui/UserBanner';
import { DROPDOWN_VALUES_CONST, ROUTES_CONST } from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/useAuth';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStudentRegistrations } from '@hooks/useStudentRegistration';
import {
  studentProfileUpdateSchema,
  type StudentProfileUpdateData,
} from '@schemas/studentProfileUpdateSchema';
import { normalizeStudentData } from '@utils/normalizeData';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const StudentProfileUpdate = () => {
  const { id: userId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const modalLoadingAuto = useModalLoadingAuto();
  const { getUserId } = useAuth();
  const { getStudent, updateStudent, updateStudentPassword } =
    useStudentRegistrations();

  const [isLoading, setIsLoading] = useState(true);

  const currentUserId = getUserId();
  if (currentUserId && currentUserId !== userId) {
    navigate(ROUTES_CONST.STUDENT.PROFILE(currentUserId));
  }

  const form = useForm<StudentProfileUpdateData>({
    resolver: zodResolver(studentProfileUpdateSchema),
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
        if (userId) {
          const response = await modalLoadingAuto(
            () => getStudent(Number(userId)),
            'Buscando dados do usuário...',
          );
          reset(normalizeStudentData(response));
        }
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  const onSubmit = async (data: StudentProfileUpdateData) => {
    try {
      if (userId) {
        const password = data.senha;
        if (password) {
          await modalLoadingAuto(
            () => updateStudentPassword(Number(userId), password),
            'Atualizando dados...',
          );
        }

        await modalLoadingAuto(
          () => updateStudent(Number(userId), data),
          'Atualizando dados...',
        );

        // navigate(ROUTES_CONST.STUDENT.PROFILE(userId));
        navigate(ROUTES_CONST.LOGIN);
      }
    } catch (error: unknown) {
      let message = 'Erro ao processar alteração de dados. Tente novamente!';

      if (error instanceof Error) {
        message = error.message;
      }

      setError('root.serverError', {
        type: 'server',
        message,
      });
    }
  };

  if (isLoading) {
    return <></>;
  }

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
              <div className="flex w-full gap-6">
                <FormField<StudentProfileUpdateData>
                  type="text"
                  name="nome"
                  label="Nome completo"
                  placeholder="Digite seu nome"
                  maxLength={60}
                />

                <FormField<StudentProfileUpdateData>
                  type="text"
                  name="user"
                  label="Username"
                  placeholder="Digite seu username"
                  maxLength={30}
                />
              </div>

              <div className="flex w-full gap-6">
                <FormField<StudentProfileUpdateData>
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Digite seu email"
                  maxLength={50}
                />

                <FormField<StudentProfileUpdateData>
                  type="password"
                  name="senha"
                  label="Senha"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            <FormField<StudentProfileUpdateData>
              type="date"
              name="dataNascimento"
              label="Data de Nascimento"
            />

            <FormField<StudentProfileUpdateData>
              type="textarea"
              name="biografia"
              label="Biografia"
              placeholder="Conte um pouco sobre você"
            />

            <div className="flex flex-col gap-5">
              <div className="flex w-full gap-6">
                <FormField<StudentProfileUpdateData>
                  type="select"
                  name="paisOrigem"
                  label="País de Origem"
                  options={DROPDOWN_VALUES_CONST.PAIS_ORIGEM.map(option => ({
                    ...option,
                  }))}
                />

                <FormField<StudentProfileUpdateData>
                  type="select"
                  name="modeloTrabalho"
                  label="Modelo de Trabalho"
                  options={DROPDOWN_VALUES_CONST.MODELO_TRABALHO.map(
                    option => ({ ...option }),
                  )}
                />
              </div>

              <div className="flex w-full gap-6">
                <FormField<StudentProfileUpdateData>
                  type="select"
                  name="estadoAtuacao"
                  label="Estado de Atuação"
                  options={DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.map(option => ({
                    ...option,
                  }))}
                />

                <FormField<StudentProfileUpdateData>
                  type="select"
                  name="setorInteresse"
                  label="Setor de Interesse"
                  options={DROPDOWN_VALUES_CONST.SETOR_INTERESSE.map(
                    option => ({
                      ...option,
                    }),
                  )}
                />
              </div>

              <FormField<StudentProfileUpdateData>
                type="textarea"
                name="habilidadesPrincipais"
                label="Habilidades Principais"
                placeholder="Descreva suas melhores habilidades..."
              />
            </div>

            <div className="flex flex-col gap-5">
              <FormField<StudentProfileUpdateData>
                type="text"
                name="linkSite"
                label="Site / Portfólio"
                placeholder="https://meusite.com"
              />

              <FormField<StudentProfileUpdateData>
                type="text"
                name="linkLinkedin"
                label="LinkedIn"
                placeholder="https://linkedin.com/in/seuusuario"
              />
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
    </div>
  );
};
