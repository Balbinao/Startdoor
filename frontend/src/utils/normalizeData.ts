import { DROPDOWN_VALUES_CONST } from '@constants';
import type {
  ICompany,
  ICompanyUpdatePayload,
} from '@models/companyData.types';
import type {
  IAcademicExperiencePayload,
  IProfessionalExperiencePayload,
} from '@models/experience.types';
import type { IReview } from '@models/review.types';
import type {
  IConditionalScore,
  IStudent,
  IStudentUpdatePayload,
} from '@models/studentData.types';
import type { AcademicExperienceCardData } from '@schemas/academicExperienceCardSchema';
import type { CompanyProfileUpdateData } from '@schemas/companyProfileUpdateSchema';
import type { ProfessionalExperienceCardData } from '@schemas/professionalExperienceCardSchema';
import type { ReviewData } from '@schemas/reviewSchema';
import type { StudentProfileUpdateData } from '@schemas/studentProfileUpdateSchema';

export const extractSelectOptionValue = <
  T extends readonly { value: string }[],
>(
  arr: T,
) =>
  arr.map(item => item.value) as [T[number]['value'], ...T[number]['value'][]];

export const normalizeStudentData = (
  studentData: IStudent,
  notaCondiData: IConditionalScore,
): StudentProfileUpdateData => {
  return {
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
      studentData.setorInteresse !== null && studentData.setorInteresse !== ''
        ? Number(studentData.setorInteresse)
        : '',
    habilidadesPrincipais: studentData.habilidadesPrincipais ?? '',
    linkSite: studentData.linkSite ?? undefined,
    linkLinkedin: studentData.linkLinkedin ?? undefined,
    ambiente: Number(notaCondiData.ambiente ?? 0),
    aprendizado: Number(notaCondiData.aprendizado ?? 0),
    beneficios: Number(notaCondiData.beneficios ?? 0),
    cultura: Number(notaCondiData.cultura ?? 0),
    efetivacao: Number(notaCondiData.efetivacao ?? 0),
    entrevista: Number(notaCondiData.entrevista ?? 0),
    feedback: Number(notaCondiData.feedback ?? 0),
    infraestrutura: Number(notaCondiData.infraestrutura ?? 0),
    integracao: Number(notaCondiData.integracao ?? 0),
    remuneracao: Number(notaCondiData.remuneracao ?? 0),
    rotina: Number(notaCondiData.rotina ?? 0),
    lideranca: Number(notaCondiData.lideranca ?? 0),
  };
};

export const normalizeStudentUpdateData = (
  data: StudentProfileUpdateData,
): IStudentUpdatePayload => {
  return {
    nome: data.nome,
    user: data.user,
    email: data.email,
    biografia: data.biografia ?? '',
    paisOrigem: data.paisOrigem ?? '',
    dataNascimento: data.dataNascimento ?? '',
    modeloTrabalho: data.modeloTrabalho ?? '',
    estadoAtuacao: data.estadoAtuacao ?? '',
    setorInteresse: data.setorInteresse ?? '',
    habilidadesPrincipais: data.habilidadesPrincipais ?? '',
    linkSite: data.linkSite ?? '',
    linkLinkedin: data.linkLinkedin ?? '',
  };
};

export const normalizeConditionalScoreUpdateData = (
  data: StudentProfileUpdateData,
): IConditionalScore => {
  return {
    ambiente: Number(data.ambiente ?? 0),
    aprendizado: Number(data.aprendizado ?? 0),
    beneficios: Number(data.beneficios ?? 0),
    cultura: Number(data.cultura ?? 0),
    efetivacao: Number(data.efetivacao ?? 0),
    entrevista: Number(data.entrevista ?? 0),
    feedback: Number(data.feedback ?? 0),
    infraestrutura: Number(data.infraestrutura ?? 0),
    integracao: Number(data.integracao ?? 0),
    remuneracao: Number(data.remuneracao ?? 0),
    rotina: Number(data.rotina ?? 0),
    lideranca: Number(data.lideranca ?? 0),
  };
};

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

export const normalizeCompanyUpdateData = (
  data: CompanyProfileUpdateData,
): ICompanyUpdatePayload => {
  return {
    nomeFantasia: data.nomeFantasia,
    email: data.email,
    cnpj: data.cnpj,
    biografia: data.biografia ?? '',
    paisOrigem: data.paisOrigem ?? '',
    receitaAnual: data.receitaAnual ?? '',
    dataFundacao: data.dataFundacao ?? '',
    tamanhoEmpresa: data.tamanhoEmpresa ?? '',
    estadoSede: data.estadoSede ?? '',
    areaAtuacao: data.areaAtuacao ?? '',
    linkSite: data.linkSite ?? '',
    linkLinkedin: data.linkLinkedin ?? '',
    linkGupy: data.linkGupy ?? '',
  };
};

export const normalizeAcademicExperienceUpdate = (
  data: AcademicExperienceCardData,
): IAcademicExperiencePayload => {
  return {
    tituloEnsino: data.tituloEnsino,
    nomeEscola: data.nomeEscola,
    estadoAtuacao: data.estadoAtuacao,
    modeloEnsino: data.modeloEnsino,
    dataInicio: data.dataInicio,
    dataFim: data.dataFim ?? null,
    descricao: data.descricao,
  };
};

export const normalizeProfessionalExperienceUpdate = (
  data: ProfessionalExperienceCardData,
): IProfessionalExperiencePayload => {
  return {
    idEmpresa: data.idEmpresa,
    tituloCargo: data.tituloCargo,
    estadoAtuacao: data.estadoAtuacao,
    modeloTrabalho: data.modeloTrabalho,
    dataInicio: data.dataInicio,
    dataFim: data.dataFim ?? null,
    descricao: data.descricao ?? '',
  };
};

export const normalizeReviewData = (reviewData: IReview): ReviewData => ({
  idEmpresa: reviewData.idEmpresa ?? 0,
  idSetor: reviewData.idSetor ?? '',
  estadoAtuacao:
    DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.find(
      option => option.value === reviewData.estadoAtuacao,
    )?.value ?? '',
  modeloTrabalho:
    DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO.find(
      option => option.value === reviewData.modeloTrabalho,
    )?.value ?? '',
  dataInicio: reviewData.dataInicio ?? '',
  dataFim: reviewData.dataFim ?? undefined,
  tituloCargo: reviewData.tituloCargo ?? '',
  textoAvaliacao: reviewData.textoAvaliacao ?? '',
  salarioMin: reviewData.salarioMin ?? 0,
  salarioMax: reviewData.salarioMax ?? 0,
  ambiente: reviewData.ambiente ?? '',
  aprendizado: reviewData.aprendizado ?? '',
  beneficios: reviewData.beneficios ?? '',
  cultura: reviewData.cultura ?? '',
  efetivacao: reviewData.efetivacao ?? '',
  entrevista: reviewData.entrevista ?? '',
  feedback: reviewData.feedback ?? '',
  infraestrutura: reviewData.infraestrutura ?? '',
  integracao: reviewData.integracao ?? '',
  remuneracao: reviewData.remuneracao ?? '',
  rotina: reviewData.rotina ?? '',
  lideranca: reviewData.lideranca ?? '',
});

export function replaceEmptyWithNull<T>(obj: T): T {
  if (obj === undefined || obj === '') return null as unknown as T;

  if (Array.isArray(obj)) {
    return obj.map(item => replaceEmptyWithNull(item)) as unknown as T;
  }

  if (obj !== null && typeof obj === 'object') {
    const newObj = {} as { [K in keyof T]: T[K] | null };
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        newObj[key] = replaceEmptyWithNull(value);
      }
    }
    return newObj as T;
  }

  return obj;
}
