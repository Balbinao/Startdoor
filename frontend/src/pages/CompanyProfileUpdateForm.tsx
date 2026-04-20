import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import { ButtonPill } from '@components/ui/ButtonPill';
import { FormErrorMessage } from '@components/ui/FormErrorMessage';
import { UserBanner } from '@components/ui/UserBanner';
import {
  DROPDOWN_VALUES_CONST,
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
  ROUTES_CONST,
  USER_ROLES_CONST,
} from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/useAuth';
import { useCompany } from '@hooks/useCompany';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useSector } from '@hooks/useSector';
import {
  companyProfileUpdateSchema,
  type CompanyProfileUpdateData,
} from '@schemas/companyProfileUpdateSchema';
import {
  normalizeCompanyData,
  normalizeCompanyUpdateData,
  replaceEmptyWithNull,
} from '@utils/normalizeData';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export const CompanyProfileUpdateForm = () => {
  const { id: urlUserId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { getUserId, getUserRole } = useAuth();
  const {
    companySectors,
    getCompany,
    updateCompany,
    updateCompanyPassword,
    getCompanySectors,
    createCompanySector,
    deleteCompanySector,
  } = useCompany();
  const { sectorsOptions, getSectors } = useSector();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const userId = getUserId();
  const userRole = getUserRole();

  const form = useForm<CompanyProfileUpdateData>({
    resolver: zodResolver(companyProfileUpdateSchema),
    defaultValues: {
      nomeFantasia: '',
      email: '',
      senha: '',
      biografia: '',
      paisOrigem: '',
      receitaAnual: '',
      dataFundacao: '',
      tamanhoEmpresa: '',
      estadoSede: '',
      areaAtuacao: '',
      linkSite: '',
      linkLinkedin: '',
      linkGupy: '',
    },
  });
  const {
    reset,
    setError,
    formState: { isSubmitting },
  } = form;

  const formSectors = useForm<Record<string, boolean>>({
    defaultValues: {},
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        if (userId) {
          const response = await modalLoadingAuto(
            () => getCompany(Number(userId)),
            MESSAGES_LOADING.GET,
          );
          reset(normalizeCompanyData(response));

          await modalLoadingAuto(() => getSectors(), MESSAGES_LOADING.GET);
          await modalLoadingAuto(
            () => getCompanySectors(userId),
            MESSAGES_LOADING.GET,
          );

          setIsError(false);
        } else {
          throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
        }
      } catch (error: unknown) {
        await modalMessageError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (!companySectors || !sectorsOptions) return;

    const existing = new Set(companySectors.map(s => s.value));
    const defaults: Record<string, boolean> = {};

    for (const sector of sectorsOptions) {
      if (!sector.value) continue;

      defaults[String(sector.value)] = existing.has(Number(sector.value));
    }

    formSectors.reset(defaults);
  }, [formSectors, companySectors, sectorsOptions]);

  const onSubmit = async (data: CompanyProfileUpdateData) => {
    try {
      if (userId) {
        const password = data.senha;
        if (password) {
          await modalLoadingAuto(
            () => updateCompanyPassword(Number(userId), password),
            MESSAGES_LOADING.GET,
          );
        }

        const sanitizedData = replaceEmptyWithNull(data);
        const companyData = normalizeCompanyUpdateData(sanitizedData);

        const response = await modalLoadingAuto(
          async () => await updateCompany(Number(userId), companyData),
          MESSAGES_LOADING.GET,
        );

        const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.UPDATE;
        const confirmedSuccess = await modalMessageSafe({
          type: 'success',
          message,
          shouldBlockProcess: false,
        });
        if (!confirmedSuccess) return;

        navigate(ROUTES_CONST.COMPANY.PROFILE_BY_ID(userId));
      } else {
        throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
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

  const onSubmitSectors = async (data: Record<string, boolean | undefined>) => {
    try {
      if (!userId) throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);

      const existingSectors = new Set(companySectors.map(s => s.value));

      for (const [sectorId, checked] of Object.entries(data)) {
        const id = Number(sectorId);

        if (checked) {
          if (!existingSectors.has(id)) {
            await modalLoadingAuto(
              async () =>
                await createCompanySector(Number(userId), {
                  setorId: id,
                }),
              MESSAGES_LOADING.GET,
            );
          }
        } else {
          if (existingSectors.has(id)) {
            await modalLoadingAuto(
              async () => await deleteCompanySector(Number(userId), id),
              MESSAGES_LOADING.GET,
            );
          }
        }
      }
    } catch (error: unknown) {
      await modalMessageError(error);
    }
  };

  const handleAllSubmits = async () => {
    await form.handleSubmit(async dataMain => {
      await formSectors.handleSubmit(async dataSectors => {
        await onSubmitSectors(dataSectors);
        await onSubmit(dataMain);
      })();
    })();
  };

  if (!userId) return <Navigate to={ROUTES_CONST.LOGIN} replace />;
  if (userRole === USER_ROLES_CONST.ESTUDANTE)
    return (
      <Navigate to={ROUTES_CONST.STUDENT.PROFILE_UPDATE(userId)} replace />
    );
  if (urlUserId !== String(userId)) {
    return (
      <Navigate to={ROUTES_CONST.COMPANY.PROFILE_UPDATE(userId)} replace />
    );
  }

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="flex h-full flex-1 flex-col items-center gap-32">
      <UserBanner type="EMPRESA" id={Number(userId)} />

      <FormWrapper form={form}>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleAllSubmits();
          }}
          className="flex w-full max-w-3xl flex-col gap-14"
        >
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <FormField<CompanyProfileUpdateData>
                form={form}
                type="text"
                name="nomeFantasia"
                label="Nome Fantasia"
                placeholder="Digite seu nome"
                maxLength={60}
              />

              <FormField<CompanyProfileUpdateData>
                form={form}
                type="email"
                name="email"
                label="Email"
                placeholder="Digite seu email"
                maxLength={50}
              />

              <FormField<CompanyProfileUpdateData>
                form={form}
                type="password"
                name="senha"
                label="Senha"
                placeholder="Digite sua senha"
              />
            </div>

            <FormField<CompanyProfileUpdateData>
              form={form}
              type="date"
              name="dataFundacao"
              label="Data da Fundação"
            />

            <FormField<CompanyProfileUpdateData>
              form={form}
              type="textarea"
              name="biografia"
              label="Biografia"
              placeholder="Conte um pouco sobre você"
            />

            <div className="flex flex-col gap-6">
              <div className="flex w-full flex-col gap-6 sm:flex-row">
                <FormField<CompanyProfileUpdateData>
                  form={form}
                  type="select"
                  name="paisOrigem"
                  label="País de Origem"
                  options={DROPDOWN_VALUES_CONST.PAIS_ORIGEM.map(option => ({
                    ...option,
                  }))}
                />

                <FormField<CompanyProfileUpdateData>
                  form={form}
                  type="select"
                  name="receitaAnual"
                  label="Receita Anual"
                  options={DROPDOWN_VALUES_CONST.RECEITA_ANUAL.map(option => ({
                    ...option,
                  }))}
                />
              </div>

              <div className="flex w-full flex-col gap-6 sm:flex-row">
                <FormField<CompanyProfileUpdateData>
                  form={form}
                  type="select"
                  name="tamanhoEmpresa"
                  label="Número de Funcionários"
                  options={DROPDOWN_VALUES_CONST.TAMANHO_EMPRESA.map(
                    option => ({
                      ...option,
                    }),
                  )}
                />

                <FormField<CompanyProfileUpdateData>
                  form={form}
                  type="select"
                  name="estadoSede"
                  label="Sede no Brasil"
                  options={DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.map(option => ({
                    ...option,
                  }))}
                />
              </div>

              <FormField<CompanyProfileUpdateData>
                form={form}
                type="textarea"
                name="areaAtuacao"
                label="Área de Atuação"
                placeholder="Descreva os pricipais setores de atuação da empresa..."
              />
            </div>

            <div className="flex flex-col gap-5">
              <FormField<CompanyProfileUpdateData>
                form={form}
                type="text"
                name="linkSite"
                label="Site / Portfólio"
                placeholder="https://meusite.com"
              />

              <FormField<CompanyProfileUpdateData>
                form={form}
                type="text"
                name="linkLinkedin"
                label="LinkedIn"
                placeholder="https://linkedin.com/in/seuusuario"
              />

              <FormField<CompanyProfileUpdateData>
                form={form}
                type="text"
                name="linkGupy"
                label="Gupy"
                placeholder="https://empresa.gupy.io"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 px-10">
            {sectorsOptions.map(field => {
              if (field.value === '') return;

              return (
                <FormField
                  key={field.value}
                  form={formSectors}
                  type="checkbox"
                  name={String(field.value)}
                  label={String(field.label)}
                />
              );
            })}
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
