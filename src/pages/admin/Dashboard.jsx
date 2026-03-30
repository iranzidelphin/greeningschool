import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import Card from "../../components/Card";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // Mock data for statistics
  const stats = {
    totalSchools: 24,
    totalActivities: 156,
    activeUsers: 89,
    pendingApprovals: 5
  };

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      school: "Green Valley High",
      activity: "Tree Planting Campaign",
      date: "2024-03-15",
      status: "approved"
    },
    {
      id: 2,
      school: "Sunrise Academy",
      activity: "Waste Management Workshop",
      date: "2024-03-14",
      status: "pending"
    },
    {
      id: 3,
      school: "Mountain View School",
      activity: "Water Conservation Project",
      date: "2024-03-13",
      status: "approved"
    }
  ];

  // Mock pending schools
  const pendingSchools = [
    { id: 1, name: "Eco Warriors School", location: "Kigali", date: "2024-03-10" },
    { id: 2, name: "Nature's Gift Academy", location: "Musanze", date: "2024-03-12" }
  ];

  return (
    <DashboardLayout
      requireAdmin={true}
      title="Admin Dashboard"
      subtitle="Overview of the Greening Schools platform"
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Schools"
          value={stats.totalSchools}
          icon="🏫"
          trend="+12%"
          trendUp={true}
        />
        <StatCard
          title="Total Activities"
          value={stats.totalActivities}
          icon="📸"
          trend="+8%"
          trendUp={true}
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon="👥"
          trend="+15%"
          trendUp={true}
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon="⏳"
          trend="-2%"
          trendUp={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            <Link
              to="/admin/activities"
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{activity.activity}</h3>
                  <p className="text-sm text-gray-600">{activity.school}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === "approved"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending School Approvals */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pending School Approvals</h2>
            <Link
              to="/admin/schools"
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {pendingSchools.map((school) => (
              <div
                key={school.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{school.name}</h3>
                  <p className="text-sm text-gray-600">{school.location}</p>
                  <p className="text-xs text-gray-500">Applied: {school.date}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/schools"
            className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏫</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Manage Schools</h3>
              <p className="text-sm text-gray-600">View and approve schools</p>
            </div>
          </Link>
          <Link
            to="/admin/activities"
            className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📸</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Manage Activities</h3>
              <p className="text-sm text-gray-600">Review and moderate activities</p>
            </div>
          </Link>
          <Link
            to="/admin/announcements"
            className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📢</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Create Announcement</h3>
              <p className="text-sm text-gray-600">Post updates to schools</p>
            </div>
          </Link>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default AdminDashboard;
