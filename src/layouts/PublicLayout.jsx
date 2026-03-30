import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import Notices from "../components/Notices";

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, userRole } = useAuth();
  const isHome = location.pathname === "/";

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
    <div className="min-h-screen bg-[#f5f8f1] text-slate-900">
      {isHome && (
        <div className="bg-[#031f19] text-emerald-100/90 text-xs border-b border-emerald-200/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4">
              <p>Address: Kigali, Rwanda</p>
              <p>📞 +250 788 123 456</p>
              <p>✉️ info@greeningschool.rw</p>
            </div>
            <div className="flex items-center gap-2">
              <a href="#" className="h-6 w-6 rounded-full bg-emerald-500/25 text-emerald-100 flex items-center justify-center hover:bg-emerald-500/40 transition-colors">f</a>
              <a href="#" className="h-6 w-6 rounded-full bg-emerald-500/25 text-emerald-100 flex items-center justify-center hover:bg-emerald-500/40 transition-colors">ig</a>
              <a href="#" className="h-6 w-6 rounded-full bg-emerald-500/25 text-emerald-100 flex items-center justify-center hover:bg-emerald-500/40 transition-colors">wa</a>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`sticky z-50 border-b backdrop-blur-md ${
          isHome
            ? "top-0 bg-[#03211a]/80 border-emerald-200/10"
            : "top-0 bg-white/95 border-emerald-100/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                <span className="text-xl text-white">e</span>
              </div>
              <div>
                <h1 className={`font-bold text-lg leading-tight ${isHome ? "text-white" : "text-emerald-900"}`}>GreeningSchool</h1>
                <p className={`text-xs ${isHome ? "text-emerald-300" : "text-emerald-600"}`}>Natural Environment</p>
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
                      ? isHome
                        ? "text-white"
                        : "text-emerald-700"
                      : isHome
                      ? "text-emerald-100/80 hover:text-white"
                      : "text-slate-600 hover:text-emerald-700"
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
        <Notices />
      </main>

      {/* Footer */}
      <footer className="bg-[#0c2a24] text-emerald-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-lg text-white">e</span>
                </div>
                <div>
                  <h1 className="font-bold text-white text-lg">GreeningSchool</h1>
                </div>
              </div>
              <p className="text-emerald-100/80 text-sm max-w-md">
                Preserving nature through recycling, sustainability consulting,
                and climate-smart community actions.
              </p>
              <div className="mt-5 flex items-center gap-2">
                <a href="#" className="h-8 w-8 rounded-full bg-emerald-500/25 text-emerald-100 flex items-center justify-center hover:bg-emerald-500/40 transition-colors">f</a>
                <a href="#" className="h-8 w-8 rounded-full bg-emerald-500/25 text-emerald-100 flex items-center justify-center hover:bg-emerald-500/40 transition-colors">ig</a>
                <a href="#" className="h-8 w-8 rounded-full bg-emerald-500/25 text-emerald-100 flex items-center justify-center hover:bg-emerald-500/40 transition-colors">wa</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-emerald-100/80">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/public/schools" className="hover:text-white">Schools</Link></li>
                <li><Link to="/public/activities" className="hover:text-white">Activities</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-emerald-100/80">
                <li>✉️ info@greeningschool.rw</li>
                <li>📞 +250 788 123 456</li>
                <li>💬 WhatsApp: +250 788 123 456</li>
                <li>📍 Kigali, Rwanda</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-emerald-200/20 mt-8 pt-8 text-center text-sm text-emerald-100/70">
            © {new Date().getFullYear()} GreeningSchool. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;