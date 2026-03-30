import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import ActivityCard from "../../components/ActivityCard";
import AnnouncementCard from "../../components/AnnouncementCard";
import ProgressBar from "../../components/ProgressBar";
import Card from "../../components/Card";
import { useAuth } from "../../contexts/AuthContext";
import { loggedInSchoolProfile } from "../../data/schoolClubSample";

const PROFILE_IMAGE_KEY = "gs_school_profile_image";

const SchoolDashboard = () => {
  const { user } = useAuth();
  const school = loggedInSchoolProfile;
  const [profileImage, setProfileImage] = useState(school.profileImage);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROFILE_IMAGE_KEY);
      if (stored) setProfileImage(stored);
    } catch {
      /* ignore */
    }
    const onStorage = (e) => {
      if (e.key === PROFILE_IMAGE_KEY && e.newValue) setProfileImage(e.newValue);
    };
    const onImageUpdate = (e) => {
      if (e.detail) setProfileImage(e.detail);
      else setProfileImage(school.profileImage);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("gs-profile-image-updated", onImageUpdate);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("gs-profile-image-updated", onImageUpdate);
    };
  }, []);

  const displayImage = profileImage || user?.photoURL || school.profileImage;

  const stats = [
    { title: "Total Activities", value: "24", icon: "🌱", trend: "12% from last month", trendUp: true, color: "emerald" },
    { title: "Trees Planted", value: "156", icon: "🌳", trend: "8% from last month", trendUp: true, color: "blue" },
    { title: "Likes Received", value: "1,234", icon: "❤️", trend: "23% from last month", trendUp: true, color: "purple" },
    { title: "Rank", value: "#12", icon: "🏆", trend: "3 positions up", trendUp: true, color: "orange" }
  ];

  const recentActivities = [
    {
      id: 1,
      schoolName: school.name,
      date: "2 days ago",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
      description: "Planted 25 new trees in the school compound as part of our monthly green initiative.",
      likes: 45,
      comments: 8,
      category: "Tree Planting"
    },
    {
      id: 2,
      schoolName: school.name,
      date: "1 week ago",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop",
      description: "Organized a recycling competition between classes. Collected over 500 plastic bottles.",
      likes: 67,
      comments: 12,
      category: "Recycling"
    }
  ];

  const announcements = [
    {
      id: 1,
      title: "Annual Green Schools Competition",
      message: "Registration is now open for the 2024 Annual Green Schools Competition. Showcase your environmental projects and win amazing prizes!",
      date: "2 days ago",
      priority: "high"
    },
    {
      id: 2,
      title: "New Badge System Launched",
      message: "We've updated our badge system with new achievements. Check your progress page to see what you can earn next!",
      date: "1 week ago",
      priority: "normal"
    }
  ];

  const overallProgress = 65;

  return (
    <DashboardLayout subtitle="Your school club overview and live projects.">
      {/* School profile + club leadership */}
      <Card className="mb-8 overflow-hidden p-0 border border-emerald-100/80 shadow-sm">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/5 min-h-[220px]">
            <img
              src={displayImage}
              alt={school.name}
              className="h-full w-full min-h-[220px] object-cover"
            />
          </div>
          <div className="flex-1 p-6 lg:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{school.name}</h2>
                <p className="text-slate-600 mt-1">{school.location}</p>
                <p className="text-sm text-slate-500 mt-3 max-w-xl">
                  Use a photo of your school building or students in club activities. Update it anytime in{" "}
                  <Link to="/dashboard/profile" className="text-emerald-700 font-medium hover:underline">
                    Profile
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-center min-w-[120px]">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">Members</p>
                <p className="text-3xl font-bold text-emerald-700">{school.totalMembers}</p>
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-1">
                  Club president
                </p>
                <p className="font-semibold text-slate-900">{school.clubPresident.name}</p>
                <p className="text-sm text-slate-600">{school.clubPresident.detail}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-1">
                  Teacher in charge
                </p>
                <p className="font-semibold text-slate-900">{school.teacherMentor.name}</p>
                <p className="text-sm text-slate-600">{school.teacherMentor.detail}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Activity progress</h3>
            <p className="text-sm text-slate-600 mb-6">
              How far each club project has progressed (update targets in your activity log).
            </p>
            <div className="space-y-5">
              {school.activityProjects.map((project) => (
                <ProgressBar
                  key={project.id}
                  label={project.title}
                  progress={project.progress}
                  size="md"
                />
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Annual goals</h3>
            <ProgressBar progress={overallProgress} size="lg" label="Overall environmental goals" />
            <p className="mt-4 text-slate-600 text-sm">
              You have completed {overallProgress}% of your annual environmental goals.
            </p>
          </Card>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Club members</h3>
            <ul className="divide-y divide-slate-100 max-h-[320px] overflow-y-auto">
              {school.members.map((m) => (
                <li key={m.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-semibold text-sm shrink-0">
                      {m.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-900 truncate">{m.name}</span>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">{m.role}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 mt-3">
              Total listed above: {school.members.length} · Full club: {school.totalMembers} members.
            </p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick actions</h3>
            <div className="space-y-3">
              <Link
                to="/dashboard/upload"
                className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <span className="text-2xl">📸</span>
                <span className="font-medium text-slate-900">Upload activity</span>
              </Link>
              <Link
                to="/dashboard/activities"
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <span className="text-2xl">📊</span>
                <span className="font-medium text-slate-900">View activities</span>
              </Link>
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <span className="text-2xl">👤</span>
                <span className="font-medium text-slate-900">School profile & photo</span>
              </Link>
            </div>
          </Card>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Announcements</h3>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SchoolDashboard;
