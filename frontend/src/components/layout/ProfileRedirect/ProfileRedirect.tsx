import { ROUTES_CONST, USER_ROLES_CONST } from '@constants';
import { useAuth } from '@hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const ProfileRedirect = () => {
  const { getUserId, getUserRole } = useAuth();
  const userId = getUserId();
  const userRole = getUserRole();

  if (!userId) {
    return <Navigate to={ROUTES_CONST.LOGIN} replace />;
  }

  if (userRole === USER_ROLES_CONST.EMPRESA) {
    return <Navigate to={ROUTES_CONST.COMPANY.PROFILE_BY_ID(userId)} replace />;
  }

  return <Navigate to={ROUTES_CONST.STUDENT.PROFILE_BY_ID(userId)} replace />;
};
