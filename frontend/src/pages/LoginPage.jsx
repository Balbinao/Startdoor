import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await authService.login(email, senha);
    
    if (result.success) {
      localStorage.setItem('@App:token', result.token);
      navigate('/dashboard');
    } else {
      setMensagem(result.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        
        <div>
          <label>Senha:</label><br />
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required
          />
        </div>
        
        <button type="submit">Entrar</button>
      </form>
      
      <br />
      <button onClick={() => navigate('/cadastro/estudante')}>
        Cadastrar como Estudante
      </button>
      <button onClick={() => navigate('/cadastro/empresa')}>
        Cadastrar como Empresa
      </button>
    </div>
  );
};

export default LoginPage;