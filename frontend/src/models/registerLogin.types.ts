interface IBaseRegister {
  user: string;
  email: string;
  senha: string;
}

export interface IStudentRegister extends IBaseRegister {
  nome: string;
  cpf: string;
}

export interface ICompanyRegister {
  email: string;
  senha: string;
  nome_fantasia: string;
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
