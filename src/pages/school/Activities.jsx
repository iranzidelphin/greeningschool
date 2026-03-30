import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ActivityCard from "../../components/ActivityCard";
import Input from "../../components/Input";
import { Select } from "../../components/Input";
import Button from "../../components/Button";

const SchoolActivities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Sample activities data
  const activities = [
    {
      id: 1,
      schoolName: "Your School",
      date: "August 18, 2023",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
      description: "Students participated in a large-scale tree planting initiative, planting over 200 native trees in the school compound and surrounding community areas.",
      likes: 142,
      comments: 28,
      category: "Tree Planting"
    },
    {
      id: 2,
      schoolName: "Your School",
      date: "April 21, 2022",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop",
      description: "A comprehensive recycling drive was organized where students collected plastic bottles, paper, and other recyclable materials.",
      likes: 96,
      comments: 15,
      category: "Recycling"
    },
    {
      id: 3,
      schoolName: "Your School",
      date: "June 12, 2022",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
      description: "Students established a school garden growing vegetables and herbs. This hands-on learning experience taught children about sustainable agriculture.",
      likes: 120,
      comments: 22,
      category: "Gardening"
    },
    {
      id: 4,
      schoolName: "Your School",
      date: "March 15, 2023",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
      description: "Installation of solar panels to power the school's computer lab. This renewable energy project reduces the school's carbon footprint.",
      likes: 187,
      comments: 34,
      category: "Energy"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Tree Planting", label: "Tree Planting" },
    { value: "Recycling", label: "Recycling" },
    { value: "Gardening", label: "Gardening" },
    { value: "Energy", label: "Energy" },
    { value: "Waste Management", label: "Waste Management" }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
        {filteredActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
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