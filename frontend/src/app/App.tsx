import { OwnerRoute } from '@components/layout/OwnerRoute';
import { PrivateMainLayout } from '@components/layout/PrivateMainLayout';
import { PrivateRoute } from '@components/layout/PrivateRoute';
import { ProfileRedirect } from '@components/layout/ProfileRedirect';
import { PublicMainLayout } from '@components/layout/PublicMainLayout';
import { ROUTES_CONST } from '@constants';
import { CompanyProfile } from '@pages/CompanyProfile';
import { CompanyProfileUpdateForm } from '@pages/CompanyProfileUpdateForm';
import { CompanyRegistrationForm } from '@pages/CompanyRegistrationForm';
import { ReviewForm } from '@pages/ReviewForm';
import { StudentProfile } from '@pages/StudentProfile';
import { StudentProfileUpdateForm } from '@pages/StudentProfileUpdateForm';
import { StudentRegistrationForm } from '@pages/StudentRegistrationForm';
import { UserLoginForm } from '@pages/UserLoginForm';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

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
            <Route index element={<ProfileRedirect />} />
            <Route
              path={ROUTES_CONST.STUDENT.PROFILE_URL}
              element={
                <OwnerRoute>
                  <StudentProfile />
                </OwnerRoute>
              }
            />
            <Route
              path={ROUTES_CONST.STUDENT.PROFILE_UPDATE_URL}
              element={
                <OwnerRoute>
                  <StudentProfileUpdateForm />
                </OwnerRoute>
              }
            />

            <Route
              path={ROUTES_CONST.REVIEW.REVIEW_UPDADE_URL}
              element={
                <OwnerRoute>
                  <ReviewForm />
                </OwnerRoute>
              }
            />
            <Route
              path={ROUTES_CONST.REVIEW.REVIEW_VIEW_URL}
              element={
                <OwnerRoute>
                  <ReviewForm />
                </OwnerRoute>
              }
            />

            <Route
              path={ROUTES_CONST.COMPANY.PROFILE_URL}
              element={
                <OwnerRoute>
                  <CompanyProfile />
                </OwnerRoute>
              }
            />
            <Route
              path={ROUTES_CONST.COMPANY.PROFILE_UPDATE_URL}
              element={
                <OwnerRoute>
                  <CompanyProfileUpdateForm />
                </OwnerRoute>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<ProfileRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
