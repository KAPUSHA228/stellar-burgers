import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

interface ProtectedRouteProps {
  children: ReactNode;
  isPublic?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  isPublic = false
}) => {
  const location = useLocation();
  const { user, isAuthChecked, loading } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
