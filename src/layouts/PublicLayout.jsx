import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, userRole } = useAuth();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/public/schools", label: "Schools" },
    { path: "/public/activities", label: "Activities" },
    { path: "/public/impact", label: "Impact" },
  ];

  const getDashboardLink = () => {
    if (!isAuthenticated) return "/login";
    return userRole === "admin" ? "/admin" : "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🌿</span>
              </div>
              <div>
                <h1 className="font-bold text-emerald-800 text-lg leading-tight">Greening</h1>
                <p className="text-emerald-600 text-xs">Schools</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-emerald-600"
                      : "text-gray-600 hover:text-emerald-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to={getDashboardLink()}>
                  <Button variant="primary" size="sm">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="hidden sm:block">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🌿</span>
                </div>
                <div>
                  <h1 className="font-bold text-emerald-800 text-lg">Greening Schools</h1>
                </div>
              </div>
              <p className="text-gray-600 text-sm max-w-md">
                Empowering Rwandan schools to protect the environment and showcase their 
                environmental impact through the ARCOS environmental club initiative.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-emerald-600">Home</Link></li>
                <li><Link to="/public/schools" className="hover:text-emerald-600">Schools</Link></li>
                <li><Link to="/public/activities" className="hover:text-emerald-600">Activities</Link></li>
                <li><Link to="/login" className="hover:text-emerald-600">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📧 info@greeningschools.rw</li>
                <li>📍 Kigali, Rwanda</li>
                <li>🌐 ARCOS Environmental Club</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Greening Schools. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;