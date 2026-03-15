import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import { FormErrorMessage } from '@components/ui/FormErrorMessage';

import { ButtonPill } from '@components/ui/ButtonPill';
import { ROUTES_CONST, userLoginFields } from '@constants';
import { useAuth } from '@hooks/useAuth';
import {
  userLoginSchema,
  type UserLoginFormData,
} from '@schemas/userLoginSchema';
import { Link, useNavigate } from 'react-router-dom';

export const UserLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<UserLoginFormData>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: UserLoginFormData) => {
    try {
      const { id } = await login(data);
      if (id) {
        navigate(ROUTES_CONST.STUDENT_PROFILE(id));
      }
    } catch (error: unknown) {
      let message = 'Erro ao processar login. Tente novamente!';

      if (error instanceof Error) {
        message = error.message;
      }

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
          Faça login na sua conta
        </h1>
        <p className="text-xl text-(--grey-300)">Que bom ver você novamente!</p>
      </div>
      <div className="w-full max-w-md">
        <FormWrapper form={form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-5">
              {userLoginFields.map(field => (
                <FormField key={field.name} {...field} />
              ))}
            </div>

            <FormErrorMessage />

            <div className="flex flex-col items-center gap-3">
              <ButtonPill
                type="submit"
                text="Entrar"
                submittingText="Criando conta..."
                isSubmitting={isSubmitting}
              />

              <div className="flex gap-1 text-center text-sm text-(--grey-300)">
                Cadastre-se como
                <Link
                  to={ROUTES_CONST.STUDENT_REGISTER}
                  className="font-bold text-(--blue-200)"
                >
                  Estudante
                </Link>
                ou
                <Link
                  to={ROUTES_CONST.COMPANY_REGISTER}
                  className="font-bold text-(--blue-200)"
                >
                  Empresa
                </Link>
              </div>
            </div>
          </form>
        </FormWrapper>
      </div>
    </div>
  );
};
