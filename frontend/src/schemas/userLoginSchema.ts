import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z
    .email({ message: 'Email inválido' })
    .max(50, { message: 'O email deve ter no máximo 50 caracteres' }),

  senha: z.string().min(6, 'Senha precisa ter pelo menos 6 caracteres'),
});

export type UserLoginFormData = z.infer<typeof userLoginSchema>;

export const forgotPasswordEmailSchema = z.object({
  email: z.email({
    message: 'Email inválido',
  }),
});

export type ForgotPasswordEmailFormData = z.infer<
  typeof forgotPasswordEmailSchema
>;

export const forgotPasswordCodeSchema = z.object({
  code: z.string(),
});

export type ForgotPasswordCodeFormData = z.infer<
  typeof forgotPasswordCodeSchema
>;

export const forgotPasswordResetSchema = z.object({
  senha: z.string().min(6, 'Senha precisa ter pelo menos 6 caracteres'),
});

export type ForgotPasswordResetFormData = z.infer<
  typeof forgotPasswordResetSchema
>;
