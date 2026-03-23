import { z } from 'zod';

// const notaCondiField = z
//   .union([z.string(), z.number()])
//   .transform(val => (val === '' ? undefined : Number(val)))
//   .refine(val => val !== undefined, 'Campo obrigatório')
//   .refine(val => !Number.isNaN(val), 'Valor inválido')
//   .refine(val => val >= 0 && val <= 5, 'Valor deve ser entre 0 e 5');

export const studentRegistrationSchema = z.object({
  nome: z
    .string()
    .min(5, 'Nome precisa ter pelo menos 5 caracteres')
    .max(60, 'O nome não pode ter mais de 60 caracteres'),

  cpf: z
    .string()
    .regex(/^\d{11}$/, 'CPF deve ter exatamente 11 dígitos numéricos'),

  user: z
    .string()
    .min(8, 'Username precisa ter pelo menos 8 caracteres')
    .max(30, 'Username não pode ter mais de 30 caracteres'),

  email: z
    .email({ message: 'Email inválido' })
    .max(50, { message: 'O email deve ter no máximo 50 caracteres' }),

  senha: z.string().min(6, 'Senha precisa ter pelo menos 6 caracteres'),

  // setor_interesse: z.string().min(1, 'Setor de interesse é obrigatório'),

  // nota_condi: z.object({
  //   ambiente: notaCondiField,
  //   aprendizado: notaCondiField,
  //   beneficios: notaCondiField,
  //   cultura: notaCondiField,
  //   efetivacao: notaCondiField,
  //   entrevista: notaCondiField,
  //   feedback: notaCondiField,
  //   infraestrutura: notaCondiField,
  //   integracao: notaCondiField,
  //   remuneracao: notaCondiField,
  //   rotina: notaCondiField,
  //   lideranca: notaCondiField,
  // }),

  acordo: z.boolean().refine(value => value === true, {
    message: 'Aceite os termos para continuar!',
  }),
});

export type StudentRegistrationFormData = z.input<
  typeof studentRegistrationSchema
>;
