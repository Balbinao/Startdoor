import { DROPDOWN_VALUES_CONST, REGEX_CONST } from '@constants';
import { extractValues } from '@utils/normalizeData';
import { z } from 'zod';

export const academicExperienceCardSchema = z
  .object({
    tituloEnsino: z.string().min(1, 'Título é obrigatório').max(60),

    nomeEscola: z.string().min(1, 'Nome da escola é obrigatório').max(60),

    estadoAtuacao: z.preprocess(
      val => (val === '' ? undefined : val),
      z.enum(
        DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.map(option => option.value),
        {
          error: 'Campo obrigatório',
        },
      ),
    ),

    modeloEnsino: z
      .enum(extractValues(DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO))
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

    descricao: z.string().nullable(),
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
