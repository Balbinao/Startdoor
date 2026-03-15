export interface IStudent {
  id: number;
  nome: string;
  username: string;
  email: string;
  senha: string;
  biografia?: string;
  pais_origem?: string;
  media_nota_geral?: number;
  data_nascimento?: string;
  modelo_trabalho?: string;
  estado_atuacao?: string;
  setor_interesse: string;
  habilidades_principais?: string;
  link_site?: string;
  link_linkedin?: string;
}
