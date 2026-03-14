import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const CadastroEmpresaPage = () => {
  const [form, setForm] = useState({
    nome_fantasia: '', cnpj: '', email: '', senha: '', confirmarSenha: ''
  });
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.senha !== form.confirmarSenha) {
      setMensagem('Senhas não coincidem');
      return;
    }

    const result = await authService.registerEmpresa({
      nome_fantasia: form.nome_fantasia, cnpj: form.cnpj, email: form.email, senha: form.senha
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
      <h2>Cadastro Empresa</h2>
      {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>}
      
      <form onSubmit={handleSubmit}>
        <div><label>Nome Fantasia:</label><br />
          <input name="nome_fantasia" value={form.nome_fantasia} onChange={e => setForm({...form, nome_fantasia: e.target.value})} required />
        </div>
        <div><label>CNPJ (14 dígitos):</label><br />
          <input name="cnpj" maxLength="14" value={form.cnpj} onChange={e => setForm({...form, cnpj: e.target.value})} required />
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

export default CadastroEmpresaPage;