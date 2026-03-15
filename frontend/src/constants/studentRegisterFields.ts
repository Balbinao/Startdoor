import type { FieldConfig } from '@models/input.types';
import type { StudentRegisterFormData } from '@schemas/studentRegisterSchema';

export const studentRegisterFields: FieldConfig<StudentRegisterFormData>[] = [
  {
    type: 'text',
    name: 'nome',
    label: 'Nome',
    placeholder: 'Digite seu nome completo',
    maxLength: 60,
  },
  {
    type: 'text',
    name: 'user',
    label: 'User',
    placeholder: 'Estudante123',
    maxLength: 30,
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
    name: 'cpf',
    label: 'CPF (sem pontos ou traços)',
    placeholder: 'Digite seu CPF',
    maxLength: 11,
  },
  {
    type: 'checkbox',
    name: 'acordo',
    label:
      'Confirmo, conforme Art. 299 do Código Penal (Decreto-Lei nº 2.848/1940), a veracidade das informações fornecidas.',
  },
];
