import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import { ButtonPill } from '@components/ui/ButtonPill';
import { FormErrorMessage } from '@components/ui/FormErrorMessage';

import { MESSAGES_LOADING, MESSAGES_RESPONSE, ROUTES_CONST } from '@constants';

import { useAuth } from '@hooks/useAuth';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';

import {
  forgotPasswordCodeSchema,
  forgotPasswordEmailSchema,
  forgotPasswordResetSchema,
  userLoginSchema,
  type ForgotPasswordCodeFormData,
  type ForgotPasswordEmailFormData,
  type ForgotPasswordResetFormData,
  type UserLoginFormData,
} from '@schemas/userLoginSchema';

import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type RecoveryStep = 'email' | 'code' | 'newPassword';

export const UserLoginForm = () => {
  const navigate = useNavigate();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { login, clearFullLocalStorage } = useAuth();

  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<RecoveryStep>('email');
  const [recoveryEmail, setRecoveryEmail] = useState('');

  useEffect(() => {
    clearFullLocalStorage();
  }, []);

  const loginForm = useForm<UserLoginFormData>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  const emailForm = useForm<ForgotPasswordEmailFormData>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const codeForm = useForm<ForgotPasswordCodeFormData>({
    resolver: zodResolver(forgotPasswordCodeSchema),
    defaultValues: {
      code: '',
    },
  });

  const resetPasswordForm = useForm<ForgotPasswordResetFormData>({
    resolver: zodResolver(forgotPasswordResetSchema),
    defaultValues: {
      senha: '',
    },
  });

  const onSubmitLogin = async (data: UserLoginFormData) => {
    try {
      await modalLoadingAuto(() => login(data), MESSAGES_LOADING.LOGIN);
      navigate(ROUTES_CONST.HOME);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : MESSAGES_RESPONSE.ERROR.SERVER;
      loginForm.setError('root.serverError', {
        type: 'server',
        message,
      });
    }
  };

  const onSubmitEmail = async (data: ForgotPasswordEmailFormData) => {
    setRecoveryEmail(data.email);
    setRecoveryStep('code');
  };

  const onSubmitCode = async (data: ForgotPasswordCodeFormData) => {
    console.log(data);
    setRecoveryStep('newPassword');
  };

  const onSubmitNewPassword = async (data: ForgotPasswordResetFormData) => {
    try {
      console.log(data);
      console.log(recoveryEmail);

      // await modalLoadingAuto(
      //   () => updateUserPasswordByEmail(recoveryEmail, data.senha.trim()),
      //   MESSAGES_LOADING.UPDATE,
      // );

      setIsRecoveringPassword(false);
      setRecoveryStep('email');
      emailForm.reset();
      codeForm.reset();
      resetPasswordForm.reset();

      await modalMessageSafe({
        type: 'success',
        message: MESSAGES_RESPONSE.SUCCESS.UPDATE,
        shouldBlockProcess: false,
      });
    } catch (error: unknown) {
      await modalMessageError(error);
    }
  };

  return (
    <div className="flex min-h-108 max-w-5xl flex-col items-center gap-12">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-4xl font-extrabold text-(--purple-300)">
          {isRecoveringPassword ? 'Recuperar senha' : 'Faça login na sua conta'}
        </h1>

        <p className="text-xl text-(--grey-300)">
          {isRecoveringPassword
            ? 'Siga os passos para redefinir sua senha'
            : 'Que bom ver você novamente!'}
        </p>
      </div>

      <div className="w-full max-w-md">
        {!isRecoveringPassword && (
          <FormWrapper form={loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmitLogin)}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-5">
                <FormField
                  form={loginForm}
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="meuEmail@email.com"
                  required
                />

                <div className="flex flex-col gap-2">
                  <FormField
                    form={loginForm}
                    type="password"
                    name="senha"
                    label="Senha"
                    placeholder="Digite sua senha"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setIsRecoveringPassword(true)}
                    className="w-fit cursor-pointer text-sm font-normal text-(--blue-200) transition-all hover:text-(--blue-100)"
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </div>

              <FormErrorMessage />

              <div className="flex flex-col items-center gap-3">
                <ButtonPill
                  type="submit"
                  text="Entrar"
                  submittingText="Entrando..."
                  isSubmitting={loginForm.formState.isSubmitting}
                />

                <div className="flex gap-1 text-center text-sm text-(--grey-300)">
                  Cadastre-se como
                  <Link
                    to={ROUTES_CONST.STUDENT.REGISTRATION}
                    className="font-bold text-(--blue-200)"
                  >
                    Estudante
                  </Link>
                  ou
                  <Link
                    to={ROUTES_CONST.COMPANY.REGISTRATION}
                    className="font-bold text-(--blue-200)"
                  >
                    Empresa
                  </Link>
                </div>
              </div>
            </form>
          </FormWrapper>
        )}

        {isRecoveringPassword && (
          <div>
            <FormWrapper form={emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onSubmitEmail)}
                className="flex flex-col"
              >
                <div className="mb-6">
                  <FormField
                    form={emailForm}
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Digite seu email"
                    readOnly={recoveryStep !== 'email'}
                    required
                  />
                </div>

                {recoveryStep === 'email' && (
                  <div className="mt-4">
                    <ButtonPill
                      type="submit"
                      text="Avançar"
                      submittingText="Enviando..."
                      isSubmitting={emailForm.formState.isSubmitting}
                    />
                  </div>
                )}
              </form>
            </FormWrapper>

            {recoveryStep !== 'email' && (
              <FormWrapper form={codeForm}>
                <form
                  onSubmit={codeForm.handleSubmit(onSubmitCode)}
                  className="flex flex-col"
                >
                  <div className="mb-6">
                    <FormField
                      form={codeForm}
                      type="text"
                      name="code"
                      label="Código"
                      placeholder="Digite o código"
                      readOnly={recoveryStep !== 'code'}
                      required
                    />
                  </div>

                  {recoveryStep === 'code' && (
                    <div className="mt-4">
                      <ButtonPill
                        type="submit"
                        text="Avançar"
                        submittingText="Validando..."
                        isSubmitting={codeForm.formState.isSubmitting}
                      />
                    </div>
                  )}
                </form>
              </FormWrapper>
            )}

            {recoveryStep !== 'email' && recoveryStep !== 'code' && (
              <FormWrapper form={resetPasswordForm}>
                <form
                  onSubmit={resetPasswordForm.handleSubmit(onSubmitNewPassword)}
                  className="flex flex-col"
                >
                  <div className="mb-6">
                    <FormField
                      form={resetPasswordForm}
                      type="password"
                      name="senha"
                      label="Nova senha"
                      placeholder="Digite sua nova senha"
                      readOnly={recoveryStep !== 'newPassword'}
                      required
                    />
                  </div>

                  {recoveryStep === 'newPassword' && (
                    <div className="mt-4">
                      <ButtonPill
                        type="submit"
                        text="Redefinir senha"
                        submittingText="Salvando..."
                        isSubmitting={resetPasswordForm.formState.isSubmitting}
                      />
                    </div>
                  )}
                </form>
              </FormWrapper>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
