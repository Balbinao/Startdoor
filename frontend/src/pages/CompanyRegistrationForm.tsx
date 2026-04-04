import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import { FormErrorMessage } from '@components/ui/FormErrorMessage';
import {
  fieldsCompanyRegistration,
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
} from '@constants';

import { ButtonPill } from '@components/ui/ButtonPill';
import { useAuth } from '@hooks/useAuth';
import { useCompany } from '@hooks/useCompany';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import {
  companyRegistrationSchema,
  type CompanyRegistrationFormData,
} from '@schemas/companyRegistrationSchema';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const CompanyRegistrationForm = () => {
  const navigate = useNavigate();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageSafe } = useModalMessageDefault();

  const { clearFullLocalStorage } = useAuth();
  const { companyRegistration } = useCompany();

  const form = useForm<CompanyRegistrationFormData>({
    resolver: zodResolver(companyRegistrationSchema),
    defaultValues: {
      nomeFantasia: '',
      cnpj: '',
      // user: '',
      email: '',
      senha: '',
      acordo: false,
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    clearFullLocalStorage();
  }, []);

  const onSubmit = async (data: CompanyRegistrationFormData) => {
    try {
      const { acordo: _, ...companyData } = data; // eslint-disable-line @typescript-eslint/no-unused-vars
      const response = await modalLoadingAuto(
        () => companyRegistration(companyData),
        MESSAGES_LOADING.CREATE,
      );

      const message =
        response?.message ?? MESSAGES_RESPONSE.SUCCESS.REGISTRATION;
      const confirmedSuccess = await modalMessageSafe({
        type: 'success',
        message,
        shouldBlockProcess: false,
      });
      if (!confirmedSuccess) return;

      navigate('/login');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : MESSAGES_RESPONSE.ERROR.SERVER;
      setError('root.serverError', {
        type: 'server',
        message,
      });
    }
  };

  return (
    <div className="flex max-w-5xl flex-col items-center gap-12">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-4xl font-extrabold text-(--purple-300)">
          Crie sua conta gratuitamente
        </h1>
        <p className="text-xl text-(--grey-300)">Sua jornada começa aqui!</p>
      </div>
      <div className="w-full max-w-md">
        <FormWrapper form={form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-5">
              {fieldsCompanyRegistration.map(field => (
                <FormField form={form} key={field.name} {...field} />
              ))}
            </div>

            <FormErrorMessage />

            <div className="flex flex-col items-center gap-3">
              <ButtonPill
                type="submit"
                text="Cadastrar"
                submittingText="Criando conta..."
                isSubmitting={isSubmitting}
              />

              <div className="flex gap-1 text-center text-sm">
                <p className="text-(--grey-300)">Já tem uma conta?</p>
                <Link to="/login" className="font-bold text-(--blue-200)">
                  Acesse ela!
                </Link>
              </div>
            </div>
          </form>
        </FormWrapper>
      </div>
    </div>
  );
};
