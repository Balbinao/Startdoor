import { z } from 'zod';

export const commentSchema = z.object({
  texto: z.string().min(16, 'Precisa ter pelo menos 16 caracteres'),
  anonimo: z.boolean(),
});

export type CommentData = z.infer<typeof commentSchema>;
