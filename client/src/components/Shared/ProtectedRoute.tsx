import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../store/auth-context';
import FullScreenLoadingIndicator from './FullScreenLoadingIndicator';

const ProtectedRoute = ({ children }: { children: any }) => {
  const auth = useAuth();
  if (auth?.loading) {
    return <FullScreenLoadingIndicator />;
  }
  if (!auth?.currentUser) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
