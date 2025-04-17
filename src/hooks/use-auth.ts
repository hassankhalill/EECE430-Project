
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'patient' | 'doctor' | 'admin';

export const useAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = useCallback((role: UserRole, email: string) => {
    // In a real app, this would verify credentials with a backend
    // For demo, just store authentication in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    
    // Redirect to appropriate dashboard
    navigate(`/${role}`);
    
    toast({
      title: "Logged In",
      description: `Welcome back! You're now logged in as ${role}.`,
    });
  }, [navigate, toast]);

  const logout = useCallback(() => {
    // Clear auth data from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    // Redirect to auth page
    navigate('/auth');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  }, [navigate, toast]);

  const checkAuth = useCallback(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  }, []);

  const getUserRole = useCallback((): UserRole => {
    return (localStorage.getItem('userRole') as UserRole) || 'patient';
  }, []);

  const getUserEmail = useCallback(() => {
    return localStorage.getItem('userEmail') || '';
  }, []);

  return {
    login,
    logout,
    checkAuth,
    getUserRole,
    getUserEmail,
  };
};
