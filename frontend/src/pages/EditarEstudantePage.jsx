import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import estudanteService from '../services/estudanteService';

const EditarEstudantePage = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ nome: '', user: '', email: '' });
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    estudanteService.buscarPorId(id).then(r => {
      if (r.success) setForm({ nome: r.data.nome, user: r.data.user, email: r.data.email });
      else setMensagem('Erro ao carregar');
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const r = await estudanteService.atualizar(id, form);
    if (r.success) {
      alert(r.message);
      navigate('/dashboard');
    } else {
      setMensagem(r.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Editar Estudante</h2>
      {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>}
      
      <form onSubmit={handleSubmit}>
        <div><label>Nome:</label><br />
          <input value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} required />
        </div>
        <div><label>Usuário:</label><br />
          <input value={form.user} onChange={e => setForm({...form, user: e.target.value})} required />
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

export default EditarEstudantePage;