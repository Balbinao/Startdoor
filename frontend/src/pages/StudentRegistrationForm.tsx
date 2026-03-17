import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import { FormErrorMessage } from '@components/ui/FormErrorMessage';
import { studentRegistrationFields } from '@constants';

import { ButtonPill } from '@components/ui/ButtonPill';
import { useAuth } from '@hooks/useAuth';
import { useStudentRegistrations } from '@hooks/useStudentRegistration';
import {
  studentRegistrationSchema,
  type StudentRegistrationFormData,
} from '@schemas/studentRegistrationSchema';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const StudentRegistrationForm = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { studentRegistration } = useStudentRegistrations();

  const form = useForm<StudentRegistrationFormData>({
    resolver: zodResolver(studentRegistrationSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      user: '',
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
    logout();
  }, []);

  const onSubmit = async (data: StudentRegistrationFormData) => {
    try {
      const { acordo: _, ...studentData } = data; // eslint-disable-line @typescript-eslint/no-unused-vars
      await studentRegistration(studentData);
      navigate('/login');
    } catch (error: unknown) {
      console.error(error);
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
              {studentRegistrationFields.map(field => (
                <FormField key={field.name} {...field} />
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
