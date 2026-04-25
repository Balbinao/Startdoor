import type { FieldConfig } from '@models/input.types';
import type { UserLoginFormData } from '@schemas/userLoginSchema';

export const userLoginFields: FieldConfig<UserLoginFormData>[] = [
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'meuEmail@email.com',
    required: true,
  },
  {
    type: 'password',
    name: 'senha',
    label: 'Senha',
    placeholder: 'Digite sua senha',
    required: true,
  },
] as const;
