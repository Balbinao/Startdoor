import { PrivateMainLayout } from '@components/layout/PrivateMainLayout';
import { PrivateRoute } from '@components/layout/PrivateRoute';
import { PublicMainLayout } from '@components/layout/PublicMainLayout';
import { ROUTES_CONST } from '@constants';
import { CompanyProfile } from '@pages/CompanyProfile';
import { CompanyProfileUpdateForm } from '@pages/CompanyProfileUpdateForm';
import { CompanyRegistrationForm } from '@pages/CompanyRegistrationForm';
import { StudentProfile } from '@pages/StudentProfile';
import { StudentProfileUpdateForm } from '@pages/StudentProfileUpdateForm';
import { StudentRegistrationForm } from '@pages/StudentRegistrationForm';
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
                ROUTES_CONST.STUDENT.REGISTRATION,
                ROUTES_CONST.COMPANY.REGISTRATION,
              ]}
            />
          }
        >
          <Route path={ROUTES_CONST.ROOT_PUBLIC} element={<PublicMainLayout />}>
            <Route
              path={ROUTES_CONST.STUDENT.REGISTRATION}
              element={<StudentRegistrationForm />}
            />
            <Route
              path={ROUTES_CONST.COMPANY.REGISTRATION}
              element={<CompanyRegistrationForm />}
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
                <Navigate to={ROUTES_CONST.STUDENT.PROFILE(1)} replace />
              }
            />
            <Route path="/perfil-estudante/:id" element={<StudentProfile />} />
            <Route path="/perfil-empresa/:id" element={<CompanyProfile />} />

            <Route
              path="/perfil-estudante-alterar/:id"
              element={<StudentProfileUpdateForm />}
            />
            <Route
              path="/perfil-empresa-alterar/:id"
              element={<CompanyProfileUpdateForm />}
            />
          </Route>

          <Route
            path="*"
            element={<Navigate to={ROUTES_CONST.STUDENT.PROFILE(1)} replace />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
