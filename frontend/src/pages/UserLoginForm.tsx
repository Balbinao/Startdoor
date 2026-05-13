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
  userLoginForgotPasswordSchema,
  userLoginResetPasswordSchema,
  userLoginSchema,
  type UserLoginForgotPasswordFormData,
  type UserLoginFormData,
  type UserLoginResetPasswordFormData,
} from '@schemas/userLoginSchema';

import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type RecoveryStep = 'email' | 'codaAndNewPassword';

export const UserLoginForm = () => {
  const navigate = useNavigate();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { login, forgotPassword, resetPassword, clearFullLocalStorage } =
    useAuth();

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

  const forgotPasswordForm = useForm<UserLoginForgotPasswordFormData>({
    resolver: zodResolver(userLoginForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const resetPasswordForm = useForm<UserLoginResetPasswordFormData>({
    resolver: zodResolver(userLoginResetPasswordSchema),
    defaultValues: {
      codigo: '',
      novaSenha: '',
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

  const onSubmitForgotPassword = async (
    data: UserLoginForgotPasswordFormData,
  ) => {
    try {
      setRecoveryEmail(data.email);

      const response = await modalLoadingAuto(
        () => forgotPassword({ email: data.email }),
        MESSAGES_LOADING.GET,
      );

      const message =
        response?.message ?? MESSAGES_RESPONSE.SUCCESS.RESET_CODE_SENT;

      await modalMessageSafe({
        type: 'success',
        message: message,
        shouldBlockProcess: false,
      });

      setRecoveryStep('codaAndNewPassword');
    } catch (error: unknown) {
      await modalMessageError(error);
    }
  };

  const onSubmitResetPassword = async (
    data: UserLoginResetPasswordFormData,
  ) => {
    try {
      const response = await modalLoadingAuto(
        () =>
          resetPassword({
            email: recoveryEmail,
            codigo: data.codigo,
            novaSenha: data.novaSenha,
          }),
        MESSAGES_LOADING.UPDATE,
      );

      const message = response?.message ?? MESSAGES_RESPONSE.SUCCESS.UPDATE;

      setIsRecoveringPassword(false);
      setRecoveryStep('email');
      forgotPasswordForm.reset();
      resetPasswordForm.reset();

      await modalMessageSafe({
        type: 'success',
        message: message,
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
            <FormWrapper form={forgotPasswordForm}>
              <form
                onSubmit={forgotPasswordForm.handleSubmit(
                  onSubmitForgotPassword,
                )}
                className="flex flex-col"
              >
                <div className="mb-6">
                  <FormField
                    form={forgotPasswordForm}
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
                      isSubmitting={forgotPasswordForm.formState.isSubmitting}
                    />
                  </div>
                )}
              </form>
            </FormWrapper>

            {recoveryStep !== 'email' && (
              <FormWrapper form={resetPasswordForm}>
                <form
                  onSubmit={resetPasswordForm.handleSubmit(
                    onSubmitResetPassword,
                  )}
                  className="flex flex-col"
                >
                  <div className="mb-6">
                    <FormField
                      form={resetPasswordForm}
                      type="text"
                      name="codigo"
                      label="Código"
                      placeholder="Digite o código..."
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <FormField
                      form={resetPasswordForm}
                      type="text"
                      name="novaSenha"
                      label="Nova Senha"
                      placeholder="Informe sua nova senha..."
                      required
                    />
                  </div>

                  {recoveryStep === 'codaAndNewPassword' && (
                    <div className="mt-4">
                      <ButtonPill
                        type="submit"
                        text="Avançar"
                        submittingText="Validando..."
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
