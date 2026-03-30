import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";

const Sidebar = ({ isAdmin = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const adminNavItems = [
    { path: "/admin", label: "Dashboard", icon: "🏠" },
    { path: "/admin/schools", label: "Manage Schools", icon: "🏫" },
    { path: "/admin/activities", label: "Manage Activities", icon: "📸" },
    { path: "/admin/announcements", label: "Announcements", icon: "📢" },
  ];

  const schoolNavItems = [
    { path: "/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/dashboard/upload", label: "Upload Activity", icon: "📸" },
    { path: "/dashboard/activities", label: "My Activities", icon: "🌱" },
    { path: "/dashboard/announcements", label: "Announcements", icon: "📢" },
    { path: "/dashboard/profile", label: "Profile", icon: "👤" },
  ];

  const navItems = isAdmin ? adminNavItems : schoolNavItems;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-emerald-600 text-white rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white shadow-xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col min-h-screen
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌿</span>
            </div>
            <div>
              <h1 className="font-bold text-emerald-800 text-lg leading-tight">Greening</h1>
              <p className="text-emerald-600 text-sm">Schools</p>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 bg-emerald-50 m-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
              <span className="text-lg">{user?.displayName?.[0] || "U"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-emerald-600 capitalize">
                {isAdmin ? "Administrator" : "School"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? "bg-emerald-600 text-white shadow-md" 
                        : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                      }
                    `}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-100">
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={handleLogout}
          >
            <span className="mr-2">🚪</span> Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;