import { DROPDOWN_VALUES_CONST } from '@constants';
import { z } from 'zod';

// const notaCondiField = z
//   .union([z.string(), z.number()])
//   .transform(val => (val === '' ? undefined : Number(val)))
//   .refine(val => val !== undefined, 'Campo obrigatório')
//   .refine(val => !Number.isNaN(val), 'Valor inválido')
//   .refine(val => val >= 0 && val <= 5, 'Valor deve ser entre 0 e 5');

export const studentProfileUpdateSchema = z.object({
  nome: z
    .string()
    .min(5, 'Nome precisa ter pelo menos 5 caracteres')
    .max(60, 'O nome não pode ter mais de 60 caracteres'),

  user: z
    .string()
    .min(8, 'User precisa ter pelo menos 8 caracteres')
    .max(30, 'User não pode ter mais de 30 caracteres'),

  email: z
    .email({ message: 'Email inválido' })
    .max(50, { message: 'O email deve ter no máximo 50 caracteres' }),

  senha: z
    .string()
    .min(6, 'Senha precisa ter pelo menos 6 caracteres')
    .optional()
    .or(z.literal('')),

  dataNascimento: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(new Date(val).getTime()), {
      message: 'Data inválida',
    }),

  biografia: z.string().optional(),

  paisOrigem: z
    .enum(
      DROPDOWN_VALUES_CONST.PAIS_ORIGEM.map(option => option.value),
      {
        message: 'País de origem inválido',
      },
    )
    .optional(),

  modeloTrabalho: z
    .enum(
      DROPDOWN_VALUES_CONST.MODELO_TRABALHO.map(option => option.value),
      {
        message: 'Modelo de trabalho inválido',
      },
    )
    .optional(),

  estadoAtuacao: z
    .enum(
      DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.map(option => option.value),
      {
        message: 'Estado inválido',
      },
    )
    .optional(),

  setorInteresse: z.enum(
    DROPDOWN_VALUES_CONST.SETOR_INTERESSE.map(option => option.value),
    {
      message: 'Setor de interesse inválido',
    },
  ),

  habilidadesPrincipais: z.string(),

  linkSite: z.url('URL inválida').optional(),

  linkLinkedin: z
    .url({ message: 'URL inválida' })
    .refine(url => url.includes('linkedin.com'), {
      message: 'Deve ser um link do LinkedIn',
    })
    .optional(),

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
});

export type StudentProfileUpdateData = z.input<
  typeof studentProfileUpdateSchema
>;
