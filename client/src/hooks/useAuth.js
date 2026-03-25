import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, profile, loading, logout, initAuth, setUser, setProfile } = useAuthStore();

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    logout,
    initAuth,
    setUser,
    setProfile,
  };
};
