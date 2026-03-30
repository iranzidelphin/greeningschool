import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Public Pages
import Home from "../pages/public/Home";
import Schools from "../pages/public/Schools";
import SchoolDetail from "../pages/public/SchoolDetail";
import Activities from "../pages/public/Activities";
import Impact from "../pages/public/Impact";

// Auth Pages
import Login from "../pages/Login";
import Register from "../pages/Register";

// School Dashboard Pages
import SchoolDashboard from "../pages/school/Dashboard";
import SchoolActivities from "../pages/school/Activities";
import SchoolUpload from "../pages/school/Upload";
import SchoolAnnouncements from "../pages/school/Announcements";
import SchoolProfile from "../pages/school/Profile";

// Admin Dashboard Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminSchools from "../pages/admin/Schools";
import AdminActivities from "../pages/admin/Activities";
import AdminAnnouncements from "../pages/admin/Announcements";

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, userRole, loading } = useAuth();

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

  return children;
};

// Public Route Component (redirects authenticated users)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, userRole, loading } = useAuth();

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

  if (isAuthenticated) {
    return <Navigate to={userRole === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/public/schools" element={<Schools />} />
      <Route path="/public/schools/:id" element={<SchoolDetail />} />
      <Route path="/public/activities" element={<Activities />} />
      <Route path="/public/impact" element={<Impact />} />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* School Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <SchoolDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/activities"
        element={
          <ProtectedRoute>
            <SchoolActivities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/upload"
        element={
          <ProtectedRoute>
            <SchoolUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/announcements"
        element={
          <ProtectedRoute>
            <SchoolAnnouncements />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <SchoolProfile />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/schools"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminSchools />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/activities"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminActivities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/announcements"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminAnnouncements />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
