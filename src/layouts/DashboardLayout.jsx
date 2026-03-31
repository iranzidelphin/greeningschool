import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Notices from "../components/Notices";

const DashboardLayout = ({ 
  children, 
  requireAdmin = false,
  title,
  subtitle 
}) => {
  const { user, userRole, isAuthenticated, loading, userData } = useAuth();
  const [schoolName, setSchoolName] = useState("");
  const [schoolLocation, setSchoolLocation] = useState("");
  const [totalMembers, setTotalMembers] = useState(0);
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        if (user && userData?.schoolId) {
          const schoolDoc = await getDoc(doc(db, "schools", userData.schoolId));
          if (schoolDoc.exists()) {
            const school = schoolDoc.data();
            setSchoolName(school.name || "School");
            setSchoolLocation(school.location || "");
            setTotalMembers(typeof school.totalMembers === "number" ? school.totalMembers : 0);
          }
        }
      } catch (error) {
        console.error("Error fetching school data:", error);
      } finally {
        setLoadingUserData(false);
      }
    };

    fetchSchoolData();
  }, [user, userData]);

  if (loading || loadingUserData) {
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
    <div className="min-h-screen bg-gradient-to-br from-[#edf5ec] to-[#f7faf7] flex">
      <Sidebar isAdmin={userRole === "admin"} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* School Name Banner */}
        {schoolName && userRole === "school" && (
          <div className="bg-emerald-600 text-white px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">🏫</span>
              </div>
              <div>
                <p className="text-sm text-emerald-100">Welcome back,</p>
                <h2 className="font-bold text-lg">{schoolName}</h2>
              </div>
            </div>
            <div className="flex flex-col items-end text-sm text-emerald-100">
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {schoolLocation && (
                <span className="mt-1 text-xs opacity-90">
                  Location: {schoolLocation} · Members: {totalMembers}
                </span>
              )}
            </div>
          </div>
        )}
        
        <Header title={title} subtitle={subtitle} />
        
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-4 lg:p-6">
            <Notices />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
