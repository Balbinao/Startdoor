import { DROPDOWN_VALUES_CONST } from '@constants';
import type {
  IComment,
  ICommentCompany,
  ICommentPayload,
  ICommentStudent,
} from '@models/comment.types';
import type {
  ICompany,
  ICompanyUpdatePayload,
} from '@models/companyData.types';
import type {
  IAcademicExperiencePayload,
  IProfessionalExperiencePayload,
} from '@models/experience.types';
import type { IReview, IReviewPayload } from '@models/review.types';
import type {
  IConditionalScore,
  IStudent,
  IStudentUpdatePayload,
} from '@models/studentData.types';
import type { AcademicExperienceCardData } from '@schemas/academicExperienceCardSchema';
import type { CommentData } from '@schemas/commentSchema';
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
  console.log(notaCondiData);
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
    ambiente: notaCondiData.ambiente || '',
    aprendizado: notaCondiData.aprendizado || '',
    beneficios: notaCondiData.beneficios || '',
    cultura: notaCondiData.cultura || '',
    efetivacao: notaCondiData.efetivacao || '',
    entrevista: notaCondiData.entrevista || '',
    feedback: notaCondiData.feedback || '',
    infraestrutura: notaCondiData.infraestrutura || '',
    integracao: notaCondiData.integracao || '',
    remuneracao: notaCondiData.remuneracao || '',
    rotina: notaCondiData.rotina || '',
    lideranca: notaCondiData.lideranca || '',
  };
};

export const normalizeStudentUpdateData = (
  data: StudentProfileUpdateData,
): IStudentUpdatePayload => {
  return {
    nome: data.nome.trim(),
    user: data.user.trim(),
    email: data.email.trim(),
    biografia: data.biografia?.trim() ?? '',
    paisOrigem: data.paisOrigem ?? '',
    dataNascimento: data.dataNascimento?.trim() ?? '',
    modeloTrabalho: data.modeloTrabalho ?? '',
    estadoAtuacao: data.estadoAtuacao ?? '',
    setorInteresse: data.setorInteresse ?? '',
    habilidadesPrincipais: data.habilidadesPrincipais?.trim() ?? '',
    linkSite: data.linkSite?.trim() ?? '',
    linkLinkedin: data.linkLinkedin?.trim() ?? '',
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
): CompanyProfileUpdateData => {
  return {
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
  };
};

export const normalizeCompanyUpdateData = (
  data: CompanyProfileUpdateData,
): ICompanyUpdatePayload => {
  return {
    nomeFantasia: data.nomeFantasia.trim(),
    email: data.email.trim(),
    cnpj: data.cnpj.trim(),
    biografia: data.biografia?.trim() ?? '',
    paisOrigem: data.paisOrigem ?? '',
    receitaAnual: data.receitaAnual ?? '',
    dataFundacao: data.dataFundacao?.trim() ?? '',
    tamanhoEmpresa: data.tamanhoEmpresa ?? '',
    estadoSede: data.estadoSede ?? '',
    areaAtuacao: data.areaAtuacao?.trim() ?? '',
    linkSite: data.linkSite?.trim() ?? '',
    linkLinkedin: data.linkLinkedin?.trim() ?? '',
    linkGupy: data.linkGupy?.trim() ?? '',
  };
};

export const normalizeAcademicExperienceUpdate = (
  data: AcademicExperienceCardData,
): IAcademicExperiencePayload => {
  return {
    tituloEnsino: data.tituloEnsino.trim(),
    nomeEscola: data.nomeEscola.trim(),
    estadoAtuacao: data.estadoAtuacao,
    modeloEnsino: data.modeloEnsino,
    dataInicio: data.dataInicio.trim(),
    dataFim: data.dataFim?.trim() ?? null,
    descricao: data.descricao.trim(),
  };
};

export const normalizeProfessionalExperienceUpdate = (
  data: ProfessionalExperienceCardData,
): IProfessionalExperiencePayload => {
  return {
    idEmpresa: data.idEmpresa,
    tituloCargo: data.tituloCargo.trim(),
    estadoAtuacao: data.estadoAtuacao,
    modeloTrabalho: data.modeloTrabalho,
    dataInicio: data.dataInicio.trim(),
    dataFim: data.dataFim?.trim() ?? null,
    descricao: data.descricao.trim(),
  };
};

export const normalizeReviewData = (data: IReview): ReviewData => {
  return {
    empresaId: data.empresaId ?? 0,
    setorId: data.setorId ?? '',
    estadoAtuacao:
      DROPDOWN_VALUES_CONST.ESTADO_ATUACAO.find(
        option => option.value === data.estadoAtuacao,
      )?.value ?? '',
    modeloTrabalho:
      DROPDOWN_VALUES_CONST.MODELO_TRABALHO_ENSINO.find(
        option => option.value === data.modeloTrabalho,
      )?.value ?? '',
    dataInicio: data.dataInicio ?? '',
    dataFim: data.dataFim ?? undefined,
    tituloCargo: data.tituloCargo ?? '',
    textoAvaliacao: data.textoAvaliacao ?? '',
    faixaSalarial: {
      min: data.salarioMin,
      max: data.salarioMax,
    },
    anonima: data.anonima ?? false,
    ambiente: data.ambiente ?? '',
    aprendizado: data.aprendizado ?? '',
    beneficios: data.beneficios ?? '',
    cultura: data.cultura ?? '',
    efetivacao: data.efetivacao ?? '',
    entrevista: data.entrevista ?? '',
    feedback: data.feedback ?? '',
    infraestrutura: data.infraestrutura ?? '',
    integracao: data.integracao ?? '',
    remuneracao: data.remuneracao ?? '',
    rotina: data.rotina ?? '',
    lideranca: data.lideranca ?? '',
  };
};

export const normalizeReviewPayload = (
  reviewData: ReviewData,
): IReviewPayload => {
  return {
    idEmpresa: Number(reviewData.empresaId),
    idSetor: Number(reviewData.setorId),
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
    salarioMin: reviewData.faixaSalarial.min,
    salarioMax: reviewData.faixaSalarial.max,
    anonima: reviewData.anonima ?? false,
    ambiente: Number(reviewData.ambiente ?? 0),
    aprendizado: Number(reviewData.aprendizado ?? 0),
    beneficios: Number(reviewData.beneficios ?? 0),
    cultura: Number(reviewData.cultura ?? 0),
    efetivacao: Number(reviewData.efetivacao ?? 0),
    entrevista: Number(reviewData.entrevista ?? 0),
    feedback: Number(reviewData.feedback ?? 0),
    infraestrutura: Number(reviewData.infraestrutura ?? 0),
    integracao: Number(reviewData.integracao ?? 0),
    remuneracao: Number(reviewData.remuneracao ?? 0),
    rotina: Number(reviewData.rotina ?? 0),
    lideranca: Number(reviewData.lideranca ?? 0),
  };
};

export const normalizeStudentComment = (c: ICommentStudent): IComment => ({
  id: c.id,
  type: 'ESTUDANTE',
  authorId: c.estudanteId,
  authorName: c.nomeEstudante,
  authorPhotoUrl: c.fotoUrlEstudante,
  authorUsername: c.userEstudante,
  reviewId: c.avaliacaoId,
  text: c.texto,
  anonymous: c.anonima,
  createdAt: c.createdAt,
});

export const normalizeCompanyComment = (c: ICommentCompany): IComment => ({
  id: c.id,
  type: 'EMPRESA',
  authorId: c.empresaId,
  authorName: c.nomeEmpresa,
  authorPhotoUrl: c.fotoUrlEmpresa,
  authorUsername: c.usernameEmpresa,
  reviewId: c.avaliacaoId,
  text: c.texto,
  createdAt: c.createdAt,
});

export const normalizeCommentUpdate = (data: CommentData): ICommentPayload => {
  return {
    texto: data.texto.trim(),
    anonima: data.anonima,
  };
};

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
