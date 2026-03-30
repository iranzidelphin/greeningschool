import React from "react";
import { useLocation } from "react-router-dom";

const Header = ({ title, subtitle }) => {
  const location = useLocation();
  
  // Get page title based on current path if not provided
  const getPageTitle = () => {
    if (title) return title;
    
    const path = location.pathname;
    const titles = {
      "/admin": "Admin Dashboard",
      "/admin/schools": "Manage Schools",
      "/admin/activities": "Manage Activities",
      "/admin/announcements": "Announcements",
      "/admin/statistics": "Statistics",
      "/dashboard": "School Dashboard",
      "/upload": "Upload Activity",
      "/activities": "My Activities",
      "/announcements": "Announcements",
      "/progress": "Progress",
      "/profile": "Profile",
    };
    return titles[path] || "Dashboard";
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getPageTitle()}
            </h1>
            {subtitle && (
              <p className="text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
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