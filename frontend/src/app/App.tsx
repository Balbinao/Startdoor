import { PrivateMainLayout } from '@components/layout/PrivateMainLayout';
import { PrivateRoute } from '@components/layout/PrivateRoute';
import { PublicMainLayout } from '@components/layout/PublicMainLayout';
import { ROUTES_CONST } from '@constants';
import { CompanyRegisterForm } from '@pages/CompanyRegisterForm';
import { StudentProfile } from '@pages/StudentProfile';
import { StudentProfileUpdate } from '@pages/StudentProfileUpdate';
import { StudentRegisterForm } from '@pages/StudentRegisterForm';
import { UserLoginForm } from '@pages/UserLoginForm';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <PrivateRoute
              publicPaths={[
                ROUTES_CONST.LOGIN,
                ROUTES_CONST.STUDENT_REGISTER,
                ROUTES_CONST.COMPANY_REGISTER,
              ]}
            />
          }
        >
          <Route path={ROUTES_CONST.ROOT_PUBLIC} element={<PublicMainLayout />}>
            <Route
              path={ROUTES_CONST.STUDENT_REGISTER}
              element={<StudentRegisterForm />}
            />
            <Route
              path={ROUTES_CONST.COMPANY_REGISTER}
              element={<CompanyRegisterForm />}
            />
            <Route path={ROUTES_CONST.LOGIN} element={<UserLoginForm />} />
          </Route>

          <Route
            path={ROUTES_CONST.ROOT_PRIVATE}
            element={<PrivateMainLayout />}
          >
            <Route
              index
              element={
                <Navigate to={ROUTES_CONST.STUDENT_PROFILE(1)} replace />
              }
            />
            <Route path="/perfil-estudante/:id" element={<StudentProfile />} />
            <Route
              path="/perfil-estudante-alterar/:id"
              element={<StudentProfileUpdate />}
            />
          </Route>

          <Route
            path="*"
            element={<Navigate to={ROUTES_CONST.STUDENT_PROFILE(1)} replace />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
