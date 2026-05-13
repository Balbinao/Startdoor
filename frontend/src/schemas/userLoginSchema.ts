import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z
    .email({ message: 'Email inválido' })
    .max(50, { message: 'O email deve ter no máximo 50 caracteres' }),

  senha: z.string().min(6, 'Senha precisa ter pelo menos 6 caracteres'),
});

export type UserLoginFormData = z.infer<typeof userLoginSchema>;

export const userLoginForgotPasswordSchema = z.object({
  email: z.email({
    message: 'Email inválido',
  }),
});

export type UserLoginForgotPasswordFormData = z.infer<
  typeof userLoginForgotPasswordSchema
>;

export const userLoginResetPasswordSchema = z.object({
  codigo: z.string().min(6, 'Código precisa ter 6 caracteres'),
  novaSenha: z.string().min(6, 'Senha precisa ter pelo menos 6 caracteres'),
});

export type UserLoginResetPasswordFormData = z.infer<
  typeof userLoginResetPasswordSchema
>;
