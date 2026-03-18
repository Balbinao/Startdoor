import { DROPDOWN_VALUES_CONST } from '@constants';
import type { ICompany } from '@models/companyData.types';
import type { IStudent } from '@models/studentData.types';
import type { CompanyProfileUpdateData } from '@schemas/companyProfileUpdateSchema';
import type { StudentProfileUpdateData } from '@schemas/studentProfileUpdateSchema';

export const normalizeStudentData = (
  data: IStudent,
): StudentProfileUpdateData => ({
  nome: data.nome ?? '',
  user: data.user ?? '',
  email: data.email ?? '',
  senha: '',
  dataNascimento: data.dataNascimento ?? '',
  biografia: data.biografia ?? '',
  paisOrigem:
    DROPDOWN_VALUES_CONST.PAIS_ORIGEM.find(
      option => option.value === data.paisOrigem,
    )?.value ?? '',
  modeloTrabalho:
    DROPDOWN_VALUES_CONST.MODELO_TRABALHO.find(
      option => option.value === data.modeloTrabalho,
    )?.value ?? '',
  estadoAtuacao:
    DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.find(
      option => option.value === data.estadoAtuacao,
    )?.value ?? '',
  setorInteresse:
    DROPDOWN_VALUES_CONST.SETOR_INTERESSE.find(
      option => option.value === data.estadoAtuacao,
    )?.value ?? '',
  habilidadesPrincipais: data.habilidadesPrincipais ?? '',
  linkSite: data.linkSite ?? undefined,
  linkLinkedin: data.linkLinkedin ?? undefined,
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
