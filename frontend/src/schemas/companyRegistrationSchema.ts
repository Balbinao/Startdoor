import { z } from 'zod';

export const companyRegistrationSchema = z.object({
  nome_fantasia: z
    .string()
    .min(5, 'Nome Fantasia precisa ter pelo menos 5 caracteres')
    .max(60, 'O Nome Fantasia não pode ter mais de 60 caracteres'),

  cnpj: z
    .string()
    .regex(/^\d{14}$/, 'CNPJ deve ter exatamente 14 dígitos numéricos'),

  // user: z
  //   .string()
  //   .min(8, 'Username precisa ter pelo menos 8 caracteres')
  //   .max(30, 'Username não pode ter mais de 30 caracteres'),

  email: z
    .email({ message: 'Email inválido' })
    .max(50, { message: 'O email deve ter no máximo 50 caracteres' }),

  senha: z.string().min(6, 'Senha precisa ter pelo menos 6 caracteres'),

  acordo: z.boolean().refine(value => value === true, {
    message: 'Aceite os termos para continuar!',
  }),
});

export type CompanyRegistrationFormData = z.infer<
  typeof companyRegistrationSchema
>;
