import { PrivateMainLayout } from '@components/layout/PrivateMainLayout';
import { PrivateRoute } from '@components/layout/PrivateRoute';
import { PublicMainLayout } from '@components/layout/PublicMainLayout';
import { CompanyRegisterForm } from '@pages/CompanyRegisterForm';
import { StudentRegisterForm } from '@pages/StudentRegisterForm';
import { UserLoginForm } from '@pages/UserLoginForm';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

function App() {
  const publicPaths = ['/login', '/cadastro-estudante', '/cadastro-empresa'];

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute publicPaths={publicPaths} />}>
          <Route path="/" element={<PublicMainLayout />}>
            <Route
              path="/cadastro-estudante"
              element={<StudentRegisterForm />}
            />
            <Route path="/cadastro-empresa" element={<CompanyRegisterForm />} />
            <Route path="/login" element={<UserLoginForm />} />
          </Route>

          <Route path="/" element={<PrivateMainLayout />}>
            <Route index element={<Navigate to="/perfil" replace />} />
            <Route path="/perfil" element={<div>Ola perfil</div>} />
          </Route>

          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
