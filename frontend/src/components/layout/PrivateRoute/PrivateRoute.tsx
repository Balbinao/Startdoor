import { USER_ROLES_CONST } from '@constants';
import { useStore } from '@contexts/store/useStore';
import { useAuth } from '@hooks/useAuth';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  publicPaths?: string[];
}

export const PrivateRoute = observer(
  ({ publicPaths = [] }: PrivateRouteProps) => {
    const { authStore } = useStore();
    const { getUserId, getUserRole } = useAuth();
    const location = useLocation();

    if (publicPaths.includes(location.pathname)) return <Outlet />;
    if (!authStore.isAuthenticated) return <Navigate to="/login" replace />;
    if (!getUserId()) return <Navigate to="/login" replace />;
    if (
      getUserRole() !== USER_ROLES_CONST.ESTUDANTE &&
      getUserRole() !== USER_ROLES_CONST.EMPRESA
    )
      <Navigate to="/login" replace />;

    return <Outlet />;
  },
);
