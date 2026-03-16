import { useStore } from '@contexts/store/useStore';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  publicPaths?: string[];
}

export const PrivateRoute = observer(
  ({ publicPaths = [] }: PrivateRouteProps) => {
    const { authStore } = useStore();
    const location = useLocation();

    if (publicPaths.includes(location.pathname)) return <Outlet />;
    if (!authStore.isAuthenticated) return <Navigate to="/login" replace />;
    return <Outlet />;
  },
);
