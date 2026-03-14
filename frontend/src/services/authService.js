import api from './api';

const authService = {
  
  login: async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      
      
      const { token } = response.data;
      
      return {
        success: true,
        token,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data || 'Erro ao fazer login'
      };
    }
  },

  registerEstudante: async (dados) => {
    try {
      const response = await api.post('/auth/cadastrar/estudante', {
        nome: dados.nome,
        cpf: dados.cpf,
        user: dados.user,
        email: dados.email,
        senha: dados.senha
      });
      
      return {
        success: true,
        message: response.data 
      };
    } catch (error) {
      let mensagem = 'Erro ao cadastrar estudante';
      
      if (error.response?.data) {
        mensagem = error.response.data;
      }
      
      return {
        success: false,
        message: mensagem
      };
    }
  },

  registerEmpresa: async (dados) => {
    try {
      const response = await api.post('/auth/cadastrar/empresa', {
        nome_fantasia: dados.nome_fantasia,
        cnpj: dados.cnpj,
        email: dados.email,
        senha: dados.senha
      });
      
      return {
        success: true,
        message: response.data 
      };
    } catch (error) {
      let mensagem = 'Erro ao cadastrar empresa';
      
      if (error.response?.data) {
        mensagem = error.response.data;
      }
      
      return {
        success: false,
        message: mensagem
      };
    }
  },

  logout: () => {
    localStorage.removeItem('@App:token');
    localStorage.removeItem('@App:user');
  }
};

export default authService;