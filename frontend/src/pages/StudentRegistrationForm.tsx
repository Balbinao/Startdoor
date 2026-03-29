import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormField } from '@components/layout/FormField/FormField';
import { FormWrapper } from '@components/layout/FormWrapper';
import { FormErrorMessage } from '@components/ui/FormErrorMessage';
import {
  fieldsStudentRegistration,
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
} from '@constants';

import { ButtonPill } from '@components/ui/ButtonPill';
import { useAuth } from '@hooks/useAuth';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStudentRegistrations } from '@hooks/useStudentRegistration';
import {
  studentRegistrationSchema,
  type StudentRegistrationFormData,
} from '@schemas/studentRegistrationSchema';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const StudentRegistrationForm = () => {
  const navigate = useNavigate();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageSafe } = useModalMessageDefault();

  const { clearFullLocalStorage } = useAuth();
  const { studentRegistration } = useStudentRegistrations();

  const form = useForm<StudentRegistrationFormData>({
    resolver: zodResolver(studentRegistrationSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      user: '',
      email: '',
      senha: '',
      // setor_interesse: '',
      // nota_condi: {
      //   ambiente: '',
      //   aprendizado: '',
      //   beneficios: '',
      //   cultura: '',
      //   efetivacao: '',
      //   entrevista: '',
      //   feedback: '',
      //   infraestrutura: '',
      //   integracao: '',
      //   remuneracao: '',
      //   rotina: '',
      //   lideranca: '',
      // },
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

  const onSubmit = async (data: StudentRegistrationFormData) => {
    console.log('FORM DATA (raw):', data);

    try {
      const { acordo: _, ...studentData } = data; // eslint-disable-line @typescript-eslint/no-unused-vars
      const response = await modalLoadingAuto(
        () => studentRegistration(studentData),
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
              {fieldsStudentRegistration.map(field => (
                <FormField key={field.name} {...field} />
              ))}
            </div>

            {/* <div className="grid grid-cols-3 gap-5">
              {studentNotaCondiFields.map(field => (
                <FormField key={field.name} {...field} />
              ))}
            </div> */}

            {/* <FormField
              type="checkbox"
              name="acordo"
              label="Confirmo, conforme Art. 299 do Código Penal (Decreto-Lei nº 2.848/1940), a veracidade das informações fornecidas."
            /> */}

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
