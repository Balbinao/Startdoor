import { DROPDOWN_VALUES_CONST } from '@constants';
import { z } from 'zod';

export const companyProfileUpdateSchema = z.object({
  nomeFantasia: z
    .string()
    .min(5, 'Nome fantasia precisa ter pelo menos 5 caracteres')
    .max(60, 'Nome fantasia não pode ter mais de 60 caracteres'),

  // user: z
  //   .string()
  //   .min(8, 'User precisa ter pelo menos 5 caracteres')
  //   .max(30, 'User não pode ter mais de 30 caracteres'),

  email: z
    .email({ message: 'Email inválido' })
    .max(50, { message: 'O email deve ter no máximo 50 caracteres' }),

  senha: z.string().min(6, 'Senha precisa ter pelo menos 6 caracteres'),

  cnpj: z.string().length(14, 'CNPJ deve conter exatamente 14 caracteres'),

  biografia: z.string().optional(),

  paisOrigem: z
    .enum(
      DROPDOWN_VALUES_CONST.PAIS_ORIGEM.map(option => option.value),
      {
        message: 'País de origem inválido',
      },
    )
    .optional(),

  receitaAnual: z
    .enum(
      DROPDOWN_VALUES_CONST.RECEITA_ANUAL.map(option => option.value),
      {
        message: 'Receita anual inválida',
      },
    )
    .optional(),

  dataFundacao: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(new Date(val).getTime()), {
      message: 'Data inválida',
    }),

  tamanhoEmpresa: z
    .enum(
      DROPDOWN_VALUES_CONST.TAMANHO_EMPRESA.map(option => option.value),
      {
        message: 'Tamanho da empresa inválido',
      },
    )
    .optional(),

  estadoSede: z
    .enum(
      DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.map(option => option.value),
      {
        message: 'Estado inválido',
      },
    )
    .optional(),

  // mediaSalarial: z.number().optional(),

  areaAtuacao: z
    .string()
    .max(150, 'Área de atuação deve ter no máximo 150 caracteres')
    .optional(),

  linkSite: z.url('URL inválida').optional(),

  linkLinkedin: z
    .url({ message: 'URL inválida' })
    .refine(url => url.includes('linkedin.com'), {
      message: 'Deve ser um link do LinkedIn',
    })
    .optional(),

  linkGupy: z
    .url({ message: 'URL inválida' })
    .refine(url => url.includes('gupy.io'), {
      message: 'Deve ser um link do Gupy',
    })
    .optional(),
});

export type CompanyProfileUpdateData = z.infer<
  typeof companyProfileUpdateSchema
>;
