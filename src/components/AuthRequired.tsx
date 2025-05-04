import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

interface AuthRequiredProps {
  children: React.ReactNode;
}

const AuthRequired: React.FC<AuthRequiredProps> = ({ children }) => {
  const { isAuthenticated, isVerified, checkAuthStatus } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Check auth status on component mount
    checkAuthStatus();
    setIsChecking(false);
  }, [checkAuthStatus]);

  // Show nothing while checking auth status
  if (isChecking) {
    return null;
  }

  // If not authenticated or not verified, redirect to verification page
  if (!isAuthenticated || !isVerified) {
    return <Navigate to="/verify" replace />;
  }

  // Otherwise, render the protected content
  return <>{children}</>;
};

export default AuthRequired; 