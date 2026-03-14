import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CadastroEstudantePage from './pages/CadastroEstudantePage';
import CadastroEmpresaPage from './pages/CadastroEmpresaPage';
import DashboardPage from './pages/DashboardPage';
import EditarEmpresaPage from './pages/EditarEmpresaPage';
import EditarEstudantePage from './pages/EditarEstudantePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro/estudante" element={<CadastroEstudantePage />} />
        <Route path="/cadastro/empresa" element={<CadastroEmpresaPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/empresa/editar/:id" element={<EditarEmpresaPage />} />
        <Route path="/estudante/editar/:id" element={<EditarEstudantePage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;