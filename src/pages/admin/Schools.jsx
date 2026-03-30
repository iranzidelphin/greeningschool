import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";

const AdminSchools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock schools data
  const schools = [
    {
      id: 1,
      name: "Green Valley High School",
      location: "Kigali, Rwanda",
      email: "contact@greenvalley.rw",
      phone: "+250 788 123 456",
      status: "approved",
      activities: 12,
      students: 450,
      joinedDate: "2023-09-15"
    },
    {
      id: 2,
      name: "Sunrise Academy",
      location: "Musanze, Rwanda",
      email: "info@sunriseacademy.rw",
      phone: "+250 788 234 567",
      status: "approved",
      activities: 8,
      students: 320,
      joinedDate: "2023-10-20"
    },
    {
      id: 3,
      name: "Mountain View School",
      location: "Huye, Rwanda",
      email: "admin@mountainview.rw",
      phone: "+250 788 345 678",
      status: "approved",
      activities: 15,
      students: 580,
      joinedDate: "2023-08-10"
    },
    {
      id: 4,
      name: "Eco Warriors School",
      location: "Kigali, Rwanda",
      email: "ecowarriors@gmail.com",
      phone: "+250 788 456 789",
      status: "pending",
      activities: 0,
      students: 0,
      joinedDate: "2024-03-10"
    },
    {
      id: 5,
      name: "Nature's Gift Academy",
      location: "Musanze, Rwanda",
      email: "naturesgift@gmail.com",
      phone: "+250 788 567 890",
      status: "pending",
      activities: 0,
      students: 0,
      joinedDate: "2024-03-12"
    },
    {
      id: 6,
      name: "Lake View Primary",
      location: "Rubavu, Rwanda",
      email: "lakeview@school.rw",
      phone: "+250 788 678 901",
      status: "rejected",
      activities: 0,
      students: 0,
      joinedDate: "2024-02-28"
    }
  ];

  const filteredSchools = schools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || school.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleApprove = (schoolId) => {
    console.log("Approving school:", schoolId);
    // UI only - would call API in real implementation
  };

  const handleReject = (schoolId) => {
    console.log("Rejecting school:", schoolId);
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
      title="Manage Schools"
      subtitle="View and manage registered schools"
    >
      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search schools by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Schools List */}
      <div className="space-y-4">
        {filteredSchools.map((school) => (
          <Card key={school.id}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🏫</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                      {getStatusBadge(school.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Location</p>
                        <p className="text-gray-900">{school.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="text-gray-900">{school.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone</p>
                        <p className="text-gray-900">{school.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Joined</p>
                        <p className="text-gray-900">{school.joinedDate}</p>
                      </div>
                    </div>
                    {school.status === "approved" && (
                      <div className="flex gap-6 mt-3 text-sm">
                        <div>
                          <span className="text-gray-500">Activities:</span>{" "}
                          <span className="font-medium text-gray-900">{school.activities}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Students:</span>{" "}
                          <span className="font-medium text-gray-900">{school.students}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {school.status === "pending" && (
                <div className="flex gap-2 lg:flex-shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(school.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReject(school.id)}
                  >
                    Reject
                  </Button>
                </div>
              )}
              
              {school.status === "approved" && (
                <div className="flex gap-2 lg:flex-shrink-0">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏫</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schools found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default AdminSchools;
