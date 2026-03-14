import api from './api';

const empresaService = {

  listarTodas: async () => {
    try {
      const response = await api.get('/empresas');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao listar empresas'
      };
    }
  },


  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/empresas/${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Empresa não encontrada'
      };
    }
  },


  atualizar: async (id, dados) => {
    try {
      const response = await api.put(`/empresas/${id}`, {
        nome_fantasia: dados.nome_fantasia,
        email: dados.email
        
      });
      
      return {
        success: true,
        message: response.data 
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data || 'Erro ao atualizar empresa'
      };
    }
  },

  deletar: async (id) => {
    try {
      await api.delete(`/empresas/${id}`);
      return {
        success: true,
        message: 'Empresa deletada com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao deletar empresa'
      };
    }
  }
};

export default empresaService;