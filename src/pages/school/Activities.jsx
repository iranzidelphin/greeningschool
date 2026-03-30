import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ActivityCard from "../../components/ActivityCard";
import Input from "../../components/Input";
import { Select } from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { getSchoolActivities, getUser } from "../../utils/firestoreSchema";

const SchoolActivities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!user?.uid) return;
      setLoading(true);
      try {
        const u = await getUser(user.uid);
        const schoolId = u?.schoolId || user.uid;
        const data = await getSchoolActivities(schoolId, { limitCount: 100 });
        if (mounted) setActivities(data);
      } catch {
        if (mounted) setActivities([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [user?.uid]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Tree Planting", label: "Tree Planting" },
    { value: "Recycling", label: "Recycling" },
    { value: "Gardening", label: "Gardening" },
    { value: "Energy", label: "Energy" },
    { value: "Waste Management", label: "Waste Management" }
  ];

  const filteredActivities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return activities.filter((activity) => {
      const matchesSearch =
        !q || (activity.description || "").toLowerCase().includes(q);
      const matchesCategory =
        categoryFilter === "all" || activity.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [activities, categoryFilter, searchQuery]);

  return (
    <DashboardLayout subtitle="Manage and view your school's environmental activities">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-emerald-600">{activities.length}</div>
          <div className="text-sm text-gray-600">Total Activities</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-emerald-600">
            {activities.reduce((acc, a) => acc + a.likes, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Likes</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-emerald-600">12</div>
          <div className="text-sm text-gray-600">This Month</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-emerald-600">#5</div>
          <div className="text-sm text-gray-600">Ranking</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={categories}
          />
        </div>
        <a href="/dashboard/upload">
          <Button variant="primary" className="w-full md:w-auto">
            <span className="mr-2">+</span> Upload New
          </Button>
        </a>
      </div>

      {/* Activities Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-slate-600 py-10">
            Loading your activities...
          </div>
        ) : (
          filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={{
                schoolName: activity.schoolName || "Your School",
                date: activity.date || activity.createdAt || "",
                image: activity.imageUrl || null,
                description: activity.description || "",
                likes: activity.likes || 0,
                comments: activity.comments || 0,
                category: activity.category || "General",
              }}
            />
          ))
        )}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities found</h3>
          <p className="text-gray-600 mb-4">Start sharing your environmental initiatives!</p>
          <a href="/dashboard/upload">
            <Button variant="primary">Upload Activity</Button>
          </a>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SchoolActivities;