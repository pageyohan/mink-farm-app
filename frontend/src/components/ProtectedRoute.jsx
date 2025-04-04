// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthApi from '../services/AuthApi';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = AuthApi.isAuthenticated();

  // Vérifier l'authentification
  if (!isAuthenticated) {
    // Rediriger vers la page de connexion avec l'URL de retour
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  // Si authentifié, afficher le contenu
  return children;
};

export default ProtectedRoute;