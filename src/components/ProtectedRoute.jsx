import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!user) {
    // Redirect to login while saving the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User role is not authorized, redirect to their own dashboard or home
    // Determine where to send them based on their actual role
    let redirectPath = '/';
    switch (user.role) {
      case 'student':
        redirectPath = '/dashboard/student';
        break;
      case 'freelancer':
        redirectPath = '/dashboard/freelancer';
        break;
      case 'teacher':
        redirectPath = '/dashboard/teacher';
        break;
      case 'employer':
        redirectPath = '/dashboard/employer';
        break;
      case 'admin':
        redirectPath = '/dashboard/admin';
        break;
      default:
        redirectPath = '/';
    }

    // Prevent infinite redirect loop if they are already on their dashboard
    if (location.pathname.startsWith(redirectPath)) {
      return children;
    }

    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
