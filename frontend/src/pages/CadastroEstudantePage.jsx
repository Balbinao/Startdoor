import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const CadastroEstudantePage = () => {
  const [form, setForm] = useState({
    nome: '', cpf: '', user: '', email: '', senha: '', confirmarSenha: ''
  });
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.senha !== form.confirmarSenha) {
      setMensagem('Senhas não coincidem');
      return;
    }

    const result = await authService.registerEstudante({
      nome: form.nome, cpf: form.cpf, user: form.user, email: form.email, senha: form.senha
    });
    
    if (result.success) {
      alert(result.message);
      navigate('/login');
    } else {
      setMensagem(result.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cadastro Estudante</h2>
      {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>}
      
      <form onSubmit={handleSubmit}>
        <div><label>Nome:</label><br />
          <input name="nome" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} required />
        </div>
        <div><label>CPF (11 dígitos):</label><br />
          <input name="cpf" maxLength="11" value={form.cpf} onChange={e => setForm({...form, cpf: e.target.value})} required />
        </div>
        <div><label>Usuário:</label><br />
          <input name="user" value={form.user} onChange={e => setForm({...form, user: e.target.value})} required />
        </div>
        <div><label>Email:</label><br />
          <input type="email" name="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        </div>
        <div><label>Senha:</label><br />
          <input type="password" name="senha" value={form.senha} onChange={e => setForm({...form, senha: e.target.value})} required />
        </div>
        <div><label>Confirmar Senha:</label><br />
          <input type="password" value={form.confirmarSenha} onChange={e => setForm({...form, confirmarSenha: e.target.value})} required />
        </div>
        <button type="submit">Cadastrar</button>
        <button type="button" onClick={() => navigate('/login')}>Voltar</button>
      </form>
    </div>
  );
};

export default CadastroEstudantePage;