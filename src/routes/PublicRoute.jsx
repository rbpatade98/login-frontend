import { Navigate } from 'react-router-dom';
import useAuth from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/constants';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated) {
    const destination = user?.role === 'admin' ? '/admin' : ROUTES.DASHBOARD;
    return <Navigate to={destination} replace />;
  }

  return children;
};

export default PublicRoute;
