import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import empresaService from '../services/empresaService';
import estudanteService from '../services/estudanteService';

const DashboardPage = () => {
  const [empresas, setEmpresas] = useState([]);
  const [estudantes, setEstudantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const e = await empresaService.listarTodas();
    const est = await estudanteService.listarTodos();
    if (e.success) setEmpresas(e.data);
    if (est.success) setEstudantes(est.data);
    setLoading(false);
  };

  const deletarEmpresa = async (id) => {
    if (window.confirm('Deletar empresa?')) {
      const r = await empresaService.deletar(id);
      if (r.success) carregarDados();
      else alert(r.message);
    }
  };

  const deletarEstudante = async (id) => {
    if (window.confirm('Deletar estudante?')) {
      const r = await estudanteService.deletar(id);
      if (r.success) carregarDados();
      else alert(r.message);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f0f0f0' }}>
        <h2>Dashboard</h2>
        <button onClick={() => { authService.logout(); navigate('/login'); }}>Sair</button>
      </div>

      <div style={{ padding: '20px' }}>
        <h3>Empresas ({empresas.length})</h3>
        <button onClick={() => navigate('/cadastro/empresa')}>Nova Empresa</button>
        <hr />
        
        {empresas.length === 0 ? <p>Nenhuma empresa</p> : 
          empresas.map(e => (
            <div key={e.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
              <p><strong>{e.nomeFantasia}</strong> - {e.email}</p>
              <p>CNPJ: {e.cnpj}</p>
              <button onClick={() => navigate(`/empresa/editar/${e.id}`)}>Editar</button>
              <button onClick={() => deletarEmpresa(e.id)}>Deletar</button>
            </div>
          ))
        }

        <h3>Estudantes ({estudantes.length})</h3>
        <button onClick={() => navigate('/cadastro/estudante')}>Novo Estudante</button>
        <hr />
        
        {estudantes.length === 0 ? <p>Nenhum estudante</p> : 
          estudantes.map(e => (
            <div key={e.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
              <p><strong>{e.nome}</strong> - {e.email}</p>
              <p>CPF: {e.cpf} | Usuário: {e.user}</p>
              <button onClick={() => navigate(`/estudante/editar/${e.id}`)}>Editar</button>
              <button onClick={() => deletarEstudante(e.id)}>Deletar</button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default DashboardPage;