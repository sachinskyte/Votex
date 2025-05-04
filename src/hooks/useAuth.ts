import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [voterId, setVoterId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAuthStatus = useCallback(() => {
    const storedVoterId = localStorage.getItem('voterId');
    const verificationStatus = localStorage.getItem('voter_verified');
    
    setVoterId(storedVoterId);
    setIsAuthenticated(!!storedVoterId);
    setIsVerified(verificationStatus === 'true');
    
    return !!storedVoterId && verificationStatus === 'true';
  }, []);

  useEffect(() => {
    // Check authentication status on mount
    checkAuthStatus();
  }, [checkAuthStatus]);

  const logout = useCallback(() => {
    // Clear user authentication data
    localStorage.removeItem('voterId');
    localStorage.removeItem('authToken');
    localStorage.removeItem('voter_verified');
    localStorage.removeItem('vote-status');
    
    // Update state
    setIsAuthenticated(false);
    setIsVerified(false);
    setVoterId(null);
    
    toast({
      title: "Logged Out Successfully",
      description: "You've been logged out. Please verify your identity to log in again.",
    });
    
    // Redirect to verification page
    navigate('/verify');
  }, [navigate, toast]);

  return {
    isAuthenticated,
    isVerified,
    voterId,
    logout,
    checkAuthStatus
  };
};

export default useAuth; 