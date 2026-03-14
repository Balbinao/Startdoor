import api from './api';

const estudanteService = {
  
  listarTodos: async () => {
    try {
      const response = await api.get('/estudantes');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao listar estudantes'
      };
    }
  },


  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/estudantes/${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Estudante não encontrado'
      };
    }
  },

  atualizar: async (id, dados) => {
    try {
      const response = await api.put(`/estudantes/${id}`, {
        nome: dados.nome,
        user: dados.user,
        email: dados.email
       
      });
      
      return {
        success: true,
        message: response.data 
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data || 'Erro ao atualizar estudante'
      };
    }
  },

  deletar: async (id) => {
    try {
      await api.delete(`/estudantes/${id}`);
      return {
        success: true,
        message: 'Estudante deletado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao deletar estudante'
      };
    }
  }
};

export default estudanteService;