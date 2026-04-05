import { DROPDOWN_VALUES_CONST, REGEX_CONST } from '@constants';
import { extractSelectOptionValue } from '@utils/normalizeData';
import { z } from 'zod';

export const academicExperienceCardSchema = z
  .object({
    tituloEnsino: z.string().min(1, 'Título é obrigatório').max(60),

    nomeEscola: z.string().min(1, 'Nome da escola é obrigatório').max(60),

    estadoAtuacao: z
      .enum(extractSelectOptionValue(DROPDOWN_VALUES_CONST.ESTADO_ATUACAO))
      .refine(val => val !== '', {
        message: 'Campo obrigatório',
      }),

    modeloEnsino: z
      .enum(
        extractSelectOptionValue(DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO),
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

    descricao: z.string().min(16, 'Precisa ter pelo menos 16 caracteres'),
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
  );

export type AcademicExperienceCardData = z.input<
  typeof academicExperienceCardSchema
>;
