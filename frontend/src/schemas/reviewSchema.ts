import { DROPDOWN_VALUES_CONST, REGEX_CONST } from '@constants';
import type { IInputOption } from '@models/input.types';
import { extractSelectOptionValue } from '@utils/normalizeData';
import { z } from 'zod';

const scoreField = z
  .union([z.number(), z.literal('')])
  .refine(val => val !== '', 'Campo obrigatório')
  .refine(val => val >= 0 && val <= 5, 'Valor deve ser entre 0 e 5');

export const reviewSchema = (sectors: IInputOption[]) =>
  z
    .object({
      idEmpresa: z.number().refine(val => val > 0, {
        message: 'Empresa é obrigatória',
      }),

      idSetor: z
        .union([z.number(), z.literal('')])
        .optional()
        .refine(
          val =>
            val === undefined ||
            val === '' ||
            sectors.some(s => s.value === val),
          'Setor inválido',
        ),

      estadoAtuacao: z
        .enum(extractSelectOptionValue(DROPDOWN_VALUES_CONST.ESTADO_ATUACAO))
        .refine(val => val !== '', {
          message: 'Campo obrigatório',
        }),

      modeloTrabalho: z
        .enum(
          extractSelectOptionValue(
            DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO,
          ),
        )
        .refine(val => val !== '', {
          message: 'Campo obrigatório',
        }),

      dataInicio: z
        .string()
        .min(1, 'Campo obrigatório')
        .refine(val => REGEX_CONST.DATE.test(val), 'Data inválida')
        .refine(val => !isNaN(new Date(val).getTime()), {
          message: 'Data inválida',
        }),

      dataFim: z
        .string()
        .optional()
        .refine(
          val => !val || REGEX_CONST.DATE.test(val),
          'Formato de data inválido',
        )
        .refine(val => !val || !isNaN(new Date(val).getTime()), {
          message: 'Data fim inválida',
        }),

      tituloCargo: z
        .string()
        .min(8, 'Precisa ter pelo menos 8 caracteres')
        .max(60, 'Não pode ter mais de 60 caracteres'),

      textoAvaliacao: z
        .string()
        .min(16, 'Precisa ter pelo menos 16 caracteres'),

      salarioMin: z.number().positive('Deve ser positivo'),
      // salarioMin: z.coerce.number().positive('Deve ser positivo'),

      salarioMax: z.number().positive('Deve ser positivo'),
      // salarioMax: z.coerce.number().positive('Deve ser positivo'),

      anonima: z.boolean().optional(),

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
    })
    .refine(
      data => {
        if (!data.dataFim) return true;
        return new Date(data.dataInicio) <= new Date(data.dataFim);
      },
      {
        message: 'Deve ser menor ou igual à data fim',
        path: ['dataInicio'],
      },
    )
    .refine(data => data.salarioMin < data.salarioMax, {
      message: 'Deve ser menor que o salário máximo',
      path: ['salarioMin'],
    });

export type ReviewData = z.input<ReturnType<typeof reviewSchema>>;
