import { DROPDOWN_VALUES_CONST, REGEX_CONST } from '@constants';
import type { IInputOption } from '@models/input.types';
import { extractSelectOptionValue } from '@utils/normalizeData';
import { z } from 'zod';

const scoreField = z
  .union([z.number(), z.literal('')])
  .refine(
    val => val === '' || (typeof val === 'number' && val >= 0 && val <= 5),
    {
      message: 'Valor deve ser entre 0 e 5',
    },
  );

export const studentProfileUpdateSchema = (sectors: IInputOption[]) =>
  z.object({
    nome: z
      .string()
      .min(5, 'Precisa ter pelo menos 5 caracteres')
      .max(60, 'Não pode ter mais de 60 caracteres'),

    user: z
      .string()
      .min(8, 'Precisa ter pelo menos 8 caracteres')
      .max(30, 'Não pode ter mais de 30 caracteres'),

    email: z
      .email({ message: 'Email inválido' })
      .max(50, { message: 'Deve ter no máximo 50 caracteres' }),

    senha: z
      .string()
      .min(6, 'Precisa ter pelo menos 6 caracteres')
      .optional()
      .or(z.literal('')),

    dataNascimento: z
      .string()
      .optional()
      .refine(val => !val || REGEX_CONST.DATE.test(val), 'Data inválida')
      .refine(val => !val || !isNaN(new Date(val).getTime()), {
        message: 'Data inválida',
      }),

    biografia: z.string().optional(),

    paisOrigem: z
      .enum(extractSelectOptionValue(DROPDOWN_VALUES_CONST.PAIS_ORIGEM))
      .optional(),

    modeloTrabalho: z
      .enum(
        extractSelectOptionValue(DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO),
      )
      .optional(),

    estadoAtuacao: z
      .enum(extractSelectOptionValue(DROPDOWN_VALUES_CONST.ESTADO_ATUACAO))
      .optional(),

    setorInteresse: z
      .union([z.number(), z.literal('')])
      .optional()
      .refine(
        val =>
          val === undefined || val === '' || sectors.some(s => s.value === val),
        'Setor inválido',
      ),

    // setorInteresse: z
    //   .union([z.number(), z.literal('')])
    //   .refine(val => val !== '', 'Setor obrigatório')
    //   .refine(val => sectors.some(s => s.value === val), 'Setor inválido'),

    habilidadesPrincipais: z.string(),

    linkSite: z
      .string()
      .refine(url => url === '' || z.url().safeParse(url).success, {
        message: 'URL inválida',
      })
      .optional(),

    linkLinkedin: z
      .string()
      .refine(
        url =>
          url === '' ||
          (z.url().safeParse(url).success && url.includes('linkedin.com/in/')),
        { message: 'Deve ser um link do LinkedIn' },
      )
      .optional(),

    ambiente: scoreField,
    aprendizado: scoreField,
    beneficios: scoreField,
    cultura: scoreField,
    efetivacao: scoreField,
    entrevista: scoreField,
    feedback: scoreField,
    infraestrutura: scoreField,
    integracao: scoreField,
    remuneracao: scoreField,
    rotina: scoreField,
    lideranca: scoreField,
  });

export type StudentProfileUpdateData = z.input<
  ReturnType<typeof studentProfileUpdateSchema>
>;
