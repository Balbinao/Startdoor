import type { StudentProfileUpdateData } from '@schemas/studentProfileUpdateSchema';

export const normalizeStudentData = (
  data: Partial<StudentProfileUpdateData>,
): StudentProfileUpdateData => ({
  nome: data.nome ?? '',
  user: data.user ?? '',
  email: data.email ?? '',
  senha: data.senha ?? '',
  biografia: data.biografia ?? '',
  paisOrigem: data.paisOrigem ?? '',
  modeloTrabalho: data.modeloTrabalho ?? '',
  estadoAtuacao: data.estadoAtuacao ?? '',
  setorInteresse: data.setorInteresse ?? '',
  habilidadesPrincipais: data.habilidadesPrincipais ?? '',
  linkSite: data.linkSite ?? undefined,
  linkLinkedin: data.linkLinkedin ?? undefined,
});
