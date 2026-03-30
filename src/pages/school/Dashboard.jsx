import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import ActivityCard from "../../components/ActivityCard";
import AnnouncementCard from "../../components/AnnouncementCard";
import ProgressBar from "../../components/ProgressBar";
import Card from "../../components/Card";

const SchoolDashboard = () => {
  // Sample data
  const stats = [
    { title: "Total Activities", value: "24", icon: "🌱", trend: "12% from last month", trendUp: true, color: "emerald" },
    { title: "Trees Planted", value: "156", icon: "🌳", trend: "8% from last month", trendUp: true, color: "blue" },
    { title: "Likes Received", value: "1,234", icon: "❤️", trend: "23% from last month", trendUp: true, color: "purple" },
    { title: "Rank", value: "#12", icon: "🏆", trend: "3 positions up", trendUp: true, color: "orange" }
  ];

  const recentActivities = [
    {
      id: 1,
      schoolName: "Your School",
      date: "2 days ago",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
      description: "Planted 25 new trees in the school compound as part of our monthly green initiative.",
      likes: 45,
      comments: 8,
      category: "Tree Planting"
    },
    {
      id: 2,
      schoolName: "Your School",
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

  const progress = 65;

  return (
    <DashboardLayout subtitle="Welcome back! Here's what's happening with your school.">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Section */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
            <ProgressBar progress={progress} size="lg" />
            <p className="mt-4 text-gray-600">
              You're doing great! You've completed {progress}% of your annual environmental goals. 
              Keep up the good work!
            </p>
          </Card>

          {/* Recent Activities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a href="/dashboard/upload" className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                <span className="text-2xl">📸</span>
                <span className="font-medium text-gray-900">Upload Activity</span>
              </a>
              <a href="/dashboard/activities" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-2xl">📊</span>
                <span className="font-medium text-gray-900">View Activities</span>
              </a>
              <a href="/dashboard/profile" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-2xl">👤</span>
                <span className="font-medium text-gray-900">Edit Profile</span>
              </a>
            </div>
          </Card>

          {/* Announcements */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h3>
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