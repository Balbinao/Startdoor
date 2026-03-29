import { DROPDOWN_VALUES_CONST, REGEX_CONST } from '@constants';
import { z } from 'zod';

const extractValues = <T extends readonly { value: string }[]>(arr: T) =>
  arr.map(item => item.value) as [T[number]['value'], ...T[number]['value'][]];

export const companyProfileUpdateSchema = z.object({
  nomeFantasia: z.string().min(5).max(60),

  email: z.email().max(50),

  senha: z.string().min(6).optional().or(z.literal('')),

  cnpj: z.string().length(14),

  biografia: z.string().optional(),

  paisOrigem: z
    .enum(extractValues(DROPDOWN_VALUES_CONST.PAIS_ORIGEM))
    .optional(),

  receitaAnual: z
    .enum(extractValues(DROPDOWN_VALUES_CONST.RECEITA_ANUAL))
    .optional(),

  dataFundacao: z
    .string()
    .optional()
    .refine(val => !val || REGEX_CONST.DATE.test(val), 'Data inválida')
    .refine(val => !val || !isNaN(new Date(val).getTime()), {
      message: 'Data inválida',
    }),

  tamanhoEmpresa: z
    .enum(extractValues(DROPDOWN_VALUES_CONST.TAMANHO_EMPRESA))
    .optional(),

  estadoSede: z
    .enum(extractValues(DROPDOWN_VALUES_CONST.ESTADO_ATUACAO))
    .optional(),

  areaAtuacao: z.string().max(150).optional(),

  linkSite: z.url().optional(),

  linkLinkedin: z
    .url()
    .refine(url => url.includes('linkedin.com'))
    .optional(),

  linkGupy: z
    .url()
    .refine(url => url.includes('gupy.io'))
    .optional(),
});

export type CompanyProfileUpdateData = z.infer<
  typeof companyProfileUpdateSchema
>;
