import type { FieldConfig } from '@models/input.types';
import type { StudentRegistrationFormData } from '@schemas/studentRegistrationSchema';

export const studentRegistrationFields: FieldConfig<StudentRegistrationFormData>[] =
  [
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
    // {
    //   type: 'select',
    //   name: 'setor_interesse',
    //   label: 'Setor de Interesse',
    //   options: DROPDOWN_VALUES_CONST.SETOR_INTERESSE.map(option => ({
    //     ...option,
    //   })),
    // },
    {
      type: 'checkbox',
      name: 'acordo',
      label:
        'Confirmo, conforme Art. 299 do Código Penal (Decreto-Lei nº 2.848/1940), a veracidade das informações fornecidas.',
    },
  ];

// export const studentNotaCondiFields: FieldConfig<StudentRegistrationFormData>[] =
//   [
//     {
//       type: 'select',
//       name: 'nota_condi.ambiente',
//       label: 'Ambiente',
//       options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
//         ...option,
//       })),
//     },
//     {
//       type: 'select',
//       name: 'nota_condi.aprendizado',
//       label: 'Aprendizado',
//       options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
//         ...option,
//       })),
//     },
//     {
//       type: 'select',
//       name: 'nota_condi.beneficios',
//       label: 'Benefícios',
//       options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
//         ...option,
//       })),
//     },
//     {
//       type: 'select',
//       name: 'nota_condi.cultura',
//       label: 'Cultura',
//       options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
//         ...option,
//       })),
//     },
//     {
//       type: 'select',
//       name: 'nota_condi.efetivacao',
//       label: 'Efetivação',
//       options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
//         ...option,
//       })),
//     },
//     {
//       type: 'select',
//       name: 'nota_condi.entrevista',
//       label: 'Entrevista',
//       options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
//         ...option,
//       })),
//     },
//     {
//       type: 'select',
//       name: 'nota_condi.feedback',
//       label: 'Feedback',
//       options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
//         ...option,
//       })),
//     },
//     {
//       type: 'select',
//       name: 'nota_condi.infraestrutura',
//       label: 'Infraestrutura',
//       options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
//         ...option,
//       })),
//     },
//     {
//       type: 'select',
//       name: 'nota_condi.integracao',
//       label: 'Integração',
//       options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
//         ...option,
//       })),
//     },
//     {
//       type: 'select',
//       name: 'nota_condi.remuneracao',
//       label: 'Remuneração',
//       options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
//         ...option,
//       })),
//     },
//     {
//       type: 'select',
//       name: 'nota_condi.rotina',
//       label: 'Rotina',
//       options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
//         ...option,
//       })),
//     },
//     {
//       type: 'select',
//       name: 'nota_condi.lideranca',
//       label: 'Liderança',
//       options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
//         ...option,
//       })),
//     },
//   ] as const;
