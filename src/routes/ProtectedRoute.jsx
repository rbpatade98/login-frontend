import { Navigate } from 'react-router-dom';
import useAuth from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/constants';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // AppRoutes handles the loading state

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
