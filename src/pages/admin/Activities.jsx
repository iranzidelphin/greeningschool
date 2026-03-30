import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";

const AdminActivities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Mock activities data
  const activities = [
    {
      id: 1,
      title: "Tree Planting Campaign",
      school: "Green Valley High School",
      category: "Tree Planting",
      description: "Planted 50 indigenous trees in the school compound and surrounding areas.",
      objective: "Increase green cover and promote environmental awareness",
      date: "2024-03-15",
      status: "approved",
      images: 3
    },
    {
      id: 2,
      title: "Waste Management Workshop",
      school: "Sunrise Academy",
      category: "Waste Management",
      description: "Conducted a workshop on proper waste segregation and recycling techniques.",
      objective: "Educate students on sustainable waste management practices",
      date: "2024-03-14",
      status: "pending",
      images: 5
    },
    {
      id: 3,
      title: "Water Conservation Project",
      school: "Mountain View School",
      category: "Water Conservation",
      description: "Installed rainwater harvesting system and conducted awareness sessions.",
      objective: "Reduce water wastage and promote water conservation",
      date: "2024-03-13",
      status: "approved",
      images: 4
    },
    {
      id: 4,
      title: "Biodiversity Survey",
      school: "Green Valley High School",
      category: "Biodiversity",
      description: "Conducted a survey of local flora and fauna in the school vicinity.",
      objective: "Document and protect local biodiversity",
      date: "2024-03-12",
      status: "approved",
      images: 8
    },
    {
      id: 5,
      title: "Clean Energy Initiative",
      school: "Mountain View School",
      category: "Energy",
      description: "Installed solar panels to power school lighting system.",
      objective: "Promote renewable energy adoption in schools",
      date: "2024-03-11",
      status: "pending",
      images: 6
    },
    {
      id: 6,
      title: "Plastic-Free Campaign",
      school: "Sunrise Academy",
      category: "Waste Management",
      description: "Launched campaign to eliminate single-use plastics from school premises.",
      objective: "Reduce plastic pollution and promote sustainable alternatives",
      date: "2024-03-10",
      status: "rejected",
      images: 2
    }
  ];

  const categories = [
    "all",
    "Tree Planting",
    "Waste Management",
    "Water Conservation",
    "Biodiversity",
    "Energy"
  ];

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === "all" || activity.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (activityId) => {
    console.log("Deleting activity:", activityId);
    // UI only - would call API in real implementation
  };

  const handleApprove = (activityId) => {
    console.log("Approving activity:", activityId);
    // UI only - would call API in real implementation
  };

  const getStatusBadge = (status) => {
    const styles = {
      approved: "bg-emerald-100 text-emerald-700",
      pending: "bg-yellow-100 text-yellow-700",
      rejected: "bg-red-100 text-red-700"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <DashboardLayout
      requireAdmin={true}
      title="Manage Activities"
      subtitle="Review and moderate school activities"
    >
      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search activities by title or school..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <Card key={activity.id}>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Activity Image Placeholder */}
              <div className="w-full lg:w-48 h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-center">
                  <span className="text-4xl">📸</span>
                  <p className="text-sm text-emerald-700 mt-1">{activity.images} images</p>
                </div>
              </div>
              
              {/* Activity Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-sm text-emerald-600 font-medium">{activity.school}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="text-gray-900 font-medium">{activity.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="text-gray-900 font-medium">{activity.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Objective</p>
                    <p className="text-gray-900 font-medium">{activity.objective}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {activity.status === "pending" && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleApprove(activity.id)}
                    >
                      Approve
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(activity.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📸</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default AdminActivities;
