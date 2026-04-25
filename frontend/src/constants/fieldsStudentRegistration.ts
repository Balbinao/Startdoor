import type { FieldConfig } from '@models/input.types';
import type { StudentRegistrationFormData } from '@schemas/studentRegistrationSchema';

export const fieldsStudentRegistration: FieldConfig<StudentRegistrationFormData>[] = [
  {
    type: 'text',
    name: 'nome',
    label: 'Nome',
    placeholder: 'Digite seu nome completo',
    maxLength: 60,
    required: true,
  },
  {
    type: 'text',
    name: 'user',
    label: 'User',
    placeholder: 'Estudante123',
    maxLength: 30,
    required: true,
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'estudante@email.com',
    maxLength: 50,
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
