import { DROPDOWN_VALUES_CONST } from '@constants';
import type { ICompany } from '@models/companyData.types';
import type { IStudent } from '@models/studentData.types';
import type { CompanyProfileUpdateData } from '@schemas/companyProfileUpdateSchema';
import type { StudentProfileUpdateData } from '@schemas/studentProfileUpdateSchema';

export const extractSelectOptionValue = <T extends readonly { value: string }[]>(arr: T) =>
  arr.map(item => item.value) as [T[number]['value'], ...T[number]['value'][]];

export const normalizeStudentData = (
  studentData: IStudent,
  // notaCondiData: IStudentNotaCondi,
): StudentProfileUpdateData => ({
  nome: studentData.nome ?? '',
  user: studentData.user ?? '',
  email: studentData.email ?? '',
  senha: '',
  dataNascimento: studentData.dataNascimento ?? '',
  biografia: studentData.biografia ?? '',
  paisOrigem:
    DROPDOWN_VALUES_CONST.PAIS_ORIGEM.find(
      option => option.value === studentData.paisOrigem,
    )?.value ?? '',
  modeloTrabalho:
    DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO.find(
      option => option.value === studentData.modeloTrabalho,
    )?.value ?? '',
  estadoAtuacao:
    DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.find(
      option => option.value === studentData.estadoAtuacao,
    )?.value ?? '',
  setorInteresse:
    DROPDOWN_VALUES_CONST.SETOR_INTERESSE.find(
      option => option.value === studentData.estadoAtuacao,
    )?.value ?? '',
  habilidadesPrincipais: studentData.habilidadesPrincipais ?? '',
  linkSite: studentData.linkSite ?? undefined,
  linkLinkedin: studentData.linkLinkedin ?? undefined,
  // nota_condi: {
  //   ambiente: notaCondiData.ambiente ?? '',
  //   aprendizado: notaCondiData.aprendizado ?? '',
  //   beneficios: notaCondiData.beneficios ?? '',
  //   cultura: notaCondiData.cultura ?? '',
  //   efetivacao: notaCondiData.efetivacao ?? '',
  //   entrevista: notaCondiData.entrevista ?? '',
  //   feedback: notaCondiData.feedback ?? '',
  //   infraestrutura: notaCondiData.infraestrutura ?? '',
  //   integracao: notaCondiData.integracao ?? '',
  //   remuneracao: notaCondiData.remuneracao ?? '',
  //   rotina: notaCondiData.rotina ?? '',
  //   lideranca: notaCondiData.lideranca ?? '',
  // },
});

export const normalizeCompanyData = (
  data: ICompany,
): CompanyProfileUpdateData => ({
  nomeFantasia: data.nomeFantasia ?? '',
  email: data.email ?? '',
  senha: '',
  cnpj: data.cnpj ?? '',
  dataFundacao: data.dataFundacao ?? '',
  biografia: data.biografia ?? '',
  paisOrigem:
    DROPDOWN_VALUES_CONST.PAIS_ORIGEM.find(
      option => option.value === data.paisOrigem,
    )?.value ?? '',
  receitaAnual:
    DROPDOWN_VALUES_CONST.RECEITA_ANUAL.find(
      option => option.value === data.receitaAnual,
    )?.value ?? '',
  tamanhoEmpresa:
    DROPDOWN_VALUES_CONST.TAMANHO_EMPRESA.find(
      option => option.value === data.tamanhoEmpresa,
    )?.value ?? '',
  estadoSede:
    DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.find(
      option => option.value === data.estadoSede,
    )?.value ?? '',
  areaAtuacao: data.areaAtuacao ?? '',
  linkSite: data.linkSite ?? undefined,
  linkLinkedin: data.linkLinkedin ?? undefined,
  linkGupy: data.linkGupy ?? undefined,
});
