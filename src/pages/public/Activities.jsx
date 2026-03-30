import React, { useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import ActivityCard from "../../components/ActivityCard";
import Input from "../../components/Input";
import { Select } from "../../components/Input";

const Activities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Sample activities data
  const activities = [
    {
      id: 1,
      schoolName: "Kigali International Academy",
      date: "August 18, 2023",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
      description: "Students participated in a large-scale tree planting initiative, planting over 200 native trees in the school compound and surrounding community areas. The activity aimed to combat deforestation and create shade for future generations.",
      likes: 142,
      comments: 28,
      category: "Tree Planting"
    },
    {
      id: 2,
      schoolName: "Eco Warriors High School",
      date: "April 21, 2022",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop",
      description: "A comprehensive recycling drive was organized where students collected plastic bottles, paper, and other recyclable materials. The collected items were sorted and sent to local recycling facilities.",
      likes: 96,
      comments: 15,
      category: "Recycling"
    },
    {
      id: 3,
      schoolName: "Green Sprouts Primary",
      date: "June 12, 2022",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
      description: "Students established a school garden growing vegetables and herbs. This hands-on learning experience taught children about sustainable agriculture and healthy eating habits.",
      likes: 120,
      comments: 22,
      category: "Gardening"
    },
    {
      id: 4,
      schoolName: "Rwanda Environmental School",
      date: "March 15, 2023",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
      description: "Installation of solar panels to power the school's computer lab. This renewable energy project reduces the school's carbon footprint and serves as an educational tool for students.",
      likes: 187,
      comments: 34,
      category: "Energy"
    },
    {
      id: 5,
      schoolName: "Sustainable Future Academy",
      date: "September 5, 2023",
      image: "https://images.unsplash.com/photo-1618477461853-5f8dd68aa395?w=600&h=400&fit=crop",
      description: "Students conducted a waste audit and implemented a composting system for organic waste from the school cafeteria. The compost is now used in the school's garden.",
      likes: 78,
      comments: 12,
      category: "Waste Management"
    },
    {
      id: 6,
      schoolName: "Nature Guardians School",
      date: "October 22, 2023",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
      description: "Water conservation awareness campaign where students learned about rainwater harvesting and installed water-saving devices throughout the school.",
      likes: 95,
      comments: 18,
      category: "Water Conservation"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Tree Planting", label: "Tree Planting" },
    { value: "Recycling", label: "Recycling" },
    { value: "Gardening", label: "Gardening" },
    { value: "Energy", label: "Energy" },
    { value: "Waste Management", label: "Waste Management" },
    { value: "Water Conservation", label: "Water Conservation" }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
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