import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = ({ 
  children, 
  requireAdmin = false,
  title,
  subtitle 
}) => {
  const { user, userRole, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && userRole !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (!requireAdmin && userRole === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isAdmin={userRole === "admin"} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header title={title} subtitle={subtitle} />
        
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;