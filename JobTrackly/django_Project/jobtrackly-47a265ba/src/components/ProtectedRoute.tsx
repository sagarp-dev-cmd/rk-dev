import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user,loading  } = useAuth();

   if (loading) {
    // While checking localStorage → show loading
    return <div>Loading...</div>; // You can replace with spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
