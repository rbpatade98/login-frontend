import useAuthStore from '@/features/auth/store/useAuthStore';

// Convenience hook — re-exports commonly used auth state and actions
const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const resetEmail = useAuthStore((state) => state.resetEmail);

  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const logout = useAuthStore((state) => state.logout);
  const initialize = useAuthStore((state) => state.initialize);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    resetEmail,
    login,
    register,
    logout,
    initialize,
  };
};

export default useAuth;
