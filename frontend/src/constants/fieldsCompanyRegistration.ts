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
    {
      type: 'text',
      name: 'cnpj',
      label: 'CNPJ (sem pontos ou traços)',
      placeholder: 'Digite seu CNPJ',
      maxLength: 14,
    },
    {
      type: 'checkbox',
      name: 'acordo',
      label:
        'Declaro, na condição de representante legal da pessoa jurídica, sob as penas do Art. 299 do Decreto-Lei nº 2.848/1940, que os dados informados são verídicos.',
    },
  ] as const;
