import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import empresaService from '../services/empresaService';

const EditarEmpresaPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ nome_fantasia: '', email: '' });
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    empresaService.buscarPorId(id).then(r => {
      if (r.success) setForm({ nome_fantasia: r.data.nomeFantasia, email: r.data.email });
      else setMensagem('Erro ao carregar');
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const r = await empresaService.atualizar(id, form);
    if (r.success) {
      alert(r.message);
      navigate('/dashboard');
    } else {
      setMensagem(r.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Editar Empresa</h2>
      {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>}
      
      <form onSubmit={handleSubmit}>
        <div><label>Nome Fantasia:</label><br />
          <input value={form.nome_fantasia} onChange={e => setForm({...form, nome_fantasia: e.target.value})} required />
        </div>
        <div><label>Email:</label><br />
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        </div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate('/dashboard')}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditarEmpresaPage;