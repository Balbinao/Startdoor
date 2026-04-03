import { ROUTES_CONST } from '@constants';
import { useAuth } from '@hooks/useAuth';
import type { ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ProfileRedirect } from '../ProfileRedirect';

interface OwnerRouteProps {
  children: ReactNode;
}

export function OwnerRoute({ children }: OwnerRouteProps) {
  const { id: paramId } = useParams<{ id: string }>();
  const { getUserId } = useAuth();
  const userId = getUserId();

  if (!userId) {
    return <Navigate to={ROUTES_CONST.LOGIN} replace />;
  }

  if (paramId !== String(userId)) {
    return <ProfileRedirect />;
  }

  return <>{children}</>;
}
