interface IBaseRegistrations {
  user: string;
  email: string;
  senha: string;
}

export interface IStudentRegistration extends IBaseRegistrations {
  nome: string;
  cpf: string;
}

export interface ICompanyRegistration {
  email: string;
  senha: string;
  nomeFantasia: string;
  cnpj: string;
}

export interface IUserLogin {
  email: string;
  senha: string;
}

export interface IUserLoginResponse {
  token: string;
  id: number;
  tipo: string;
}
