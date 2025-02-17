
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { student } = useSelector((state) => state.student);

  
  const isAuthenticated = !!student?._id;

  if (!isAuthenticated) {
   
    return <Navigate to="/login" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
