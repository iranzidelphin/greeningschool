import React from "react";
import { useLocation } from "react-router-dom";

const Header = ({ title, subtitle }) => {
  const location = useLocation();
  
  // Get page title based on current path if not provided
  const getPageTitle = () => {
    if (title) return title;
    
    const path = location.pathname;
    if (path.startsWith("/admin/schools")) return "Manage Schools";
    if (path.startsWith("/admin/activities")) return "Manage Activities";
    if (path.startsWith("/admin/announcements")) return "Announcements";
    if (path.startsWith("/admin")) return "Admin Dashboard";
    if (path.startsWith("/dashboard/upload")) return "Upload Activity";
    if (path.startsWith("/dashboard/activities")) return "My Activities";
    if (path.startsWith("/dashboard/announcements")) return "Announcements";
    if (path.startsWith("/dashboard/profile")) return "Profile";
    if (path.startsWith("/dashboard")) return "School Dashboard";
    return "Dashboard";
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {getPageTitle()}
            </h1>
            {subtitle && (
              <p className="text-slate-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;