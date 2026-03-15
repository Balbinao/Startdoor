import { z } from 'zod';

export const studentRegisterSchema = z.object({
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

  acordo: z.boolean().refine(value => value === true, {
    message: 'Aceite os termos para continuar!',
  }),

  // nota_condi: z.object({
  //   ambiente: z.number().min(0).max(5),
  //   aprendizado: z.number().min(0).max(5),
  //   beneficios: z.number().min(0).max(5),
  //   cultura: z.number().min(0).max(5),
  //   efetivacao: z.number().min(0).max(5),
  //   entrevista: z.number().min(0).max(5),
  //   feedback: z.number().min(0).max(5),
  //   infraestrutura: z.number().min(0).max(5),
  //   integracao: z.number().min(0).max(5),
  //   remuneracao: z.number().min(0).max(5),
  //   rotina: z.number().min(0).max(5),
  //   lideranca: z.number().min(0).max(5),
  // }),
});

export type StudentRegisterFormData = z.infer<typeof studentRegisterSchema>;
