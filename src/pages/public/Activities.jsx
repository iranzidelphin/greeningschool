import React, { useEffect, useMemo, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import ActivityCard from "../../components/ActivityCard";
import Input from "../../components/Input";
import { Select } from "../../components/Input";
import { getApprovedActivities } from "../../utils/firestoreSchema";

const Activities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getApprovedActivities({ limitCount: 100 });
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
  }, []);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Tree Planting", label: "Tree Planting" },
    { value: "Recycling", label: "Recycling" },
    { value: "Gardening", label: "Gardening" },
    { value: "Energy", label: "Energy" },
    { value: "Waste Management", label: "Waste Management" },
    { value: "Water Conservation", label: "Water Conservation" }
  ];

  const filteredActivities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return activities.filter((activity) => {
      const matchesSearch =
        !q ||
        (activity.schoolName || "").toLowerCase().includes(q) ||
        (activity.description || "").toLowerCase().includes(q) ||
        (activity.title || "").toLowerCase().includes(q);
      const matchesCategory =
        categoryFilter === "all" || activity.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [activities, categoryFilter, searchQuery]);

  return (
    <PublicLayout>
      <div className="bg-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Environmental Activities
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Browse inspiring environmental initiatives from schools across Rwanda
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
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
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-slate-600 py-10">
              Loading activities...
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={{
                  schoolName: activity.schoolName || "School",
                  date: activity.date || activity.createdAt || "",
                  image: activity.imageUrl || activity.image || null,
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
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default Activities;