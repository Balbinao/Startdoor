import type { FieldConfig } from '@models/input.types';
import type { CompanyRegistrationFormData } from '@schemas/companyRegistrationSchema';

export const fieldsCompanyRegistration: FieldConfig<CompanyRegistrationFormData>[] =
  [
    {
      type: 'text',
      name: 'nomeFantasia',
      label: 'Nome Fantasia',
      placeholder: 'Digite o nome fantasia',
      maxLength: 60,
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'estudante@email.com',
      maxLength: 50,
    },
    {
      type: 'password',
      name: 'senha',
      label: 'Senha',
      placeholder: 'Digite sua senha',
    },
  ] as const;
