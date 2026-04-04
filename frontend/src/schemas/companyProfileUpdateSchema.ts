import { DROPDOWN_VALUES_CONST, REGEX_CONST } from '@constants';
import { extractSelectOptionValue } from '@utils/normalizeData';
import { z } from 'zod';

export const companyProfileUpdateSchema = z.object({
  nomeFantasia: z
    .string()
    .min(5, 'Precisa ter pelo menos 5 caracteres')
    .max(60, 'Não pode ter mais de 60 caracteres'),

  email: z
    .email({ message: 'Email inválido' })
    .max(50, { message: 'Deve ter no máximo 50 caracteres' }),

  senha: z
    .string()
    .min(6, 'Precisa ter pelo menos 6 caracteres')
    .optional()
    .or(z.literal('')),

  cnpj: z.string().length(14, 'CNPJ deve ter 14 caracteres'),

  biografia: z.string().optional(),

  paisOrigem: z
    .enum(extractSelectOptionValue(DROPDOWN_VALUES_CONST.PAIS_ORIGEM))
    .optional(),

  receitaAnual: z
    .enum(extractSelectOptionValue(DROPDOWN_VALUES_CONST.RECEITA_ANUAL))
    .optional(),

  dataFundacao: z
    .string()
    .optional()
    .refine(val => !val || REGEX_CONST.DATE.test(val), 'Data inválida')
    .refine(val => !val || !isNaN(new Date(val).getTime()), {
      message: 'Data inválida',
    }),

  tamanhoEmpresa: z
    .enum(extractSelectOptionValue(DROPDOWN_VALUES_CONST.TAMANHO_EMPRESA))
    .optional(),

  estadoSede: z
    .enum(extractSelectOptionValue(DROPDOWN_VALUES_CONST.ESTADO_ATUACAO))
    .optional(),

  areaAtuacao: z
    .string()
    .max(150, 'Não pode ter mais de 150 caracteres')
    .optional(),

  linkSite: z.url({ message: 'URL inválida' }).optional(),

  linkLinkedin: z
    .url({ message: 'URL inválida' })
    .refine(url => url.includes('linkedin.com'), {
      message: 'Deve ser um link do LinkedIn',
    })
    .optional(),

  linkGupy: z
    .url({ message: 'URL inválida' })
    .refine(url => url.includes('gupy.io'), {
      message: 'Deve ser um link da Gupy',
    })
    .optional(),
});

export type CompanyProfileUpdateData = z.infer<
  typeof companyProfileUpdateSchema
>;
