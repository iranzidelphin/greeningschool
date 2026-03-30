import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";

const PROFILE_IMAGE_KEY = "gs_school_profile_image";

const SchoolProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: "Green Valley High School",
    location: "Kigali, Rwanda",
    email: user?.email || "contact@greenvalley.rw",
    phone: "+250 788 123 456",
    description: "A leading environmental school in Rwanda, committed to sustainability and green initiatives.",
    studentCount: "450",
    teacherCount: "25",
    establishedYear: "2015",
    profileImageUrl: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROFILE_IMAGE_KEY);
      if (stored) {
        setFormData((prev) => ({ ...prev, profileImageUrl: stored }));
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    try {
      const url = (formData.profileImageUrl || "").trim();
      if (url) {
        localStorage.setItem(PROFILE_IMAGE_KEY, url);
      } else {
        localStorage.removeItem(PROFILE_IMAGE_KEY);
      }
      window.dispatchEvent(
        new CustomEvent("gs-profile-image-updated", { detail: url || null })
      );
    } catch {
      /* ignore */
    }
    setIsEditing(false);
  };

  return (
    <DashboardLayout subtitle="Manage your school profile">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {formData.profileImageUrl ? (
              <img
                src={formData.profileImageUrl}
                alt=""
                className="w-24 h-24 rounded-2xl object-cover border border-emerald-100 flex-shrink-0"
              />
            ) : (
              <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">🏫</span>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{formData.schoolName}</h1>
              <p className="text-gray-600 mb-4">{formData.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">📍</span>
                  <span className="text-gray-700">{formData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">📧</span>
                  <span className="text-gray-700">{formData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">📞</span>
                  <span className="text-gray-700">{formData.phone}</span>
                </div>
              </div>
            </div>
            <Button
              variant={isEditing ? "outline" : "primary"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </Card>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* School Information */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">School Information</h2>
            <div className="space-y-4">
              <Input
                label="School or club photo URL"
                name="profileImageUrl"
                type="url"
                placeholder="https://… (school building or students)"
                value={formData.profileImageUrl}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="School Name"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </Card>

          {/* School Statistics */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">School Statistics</h2>
            <div className="space-y-4">
              <Input
                label="Number of Students"
                name="studentCount"
                type="number"
                value={formData.studentCount}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="Number of Teachers"
                name="teacherCount"
                type="number"
                value={formData.teacherCount}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="Established Year"
                name="establishedYear"
                value={formData.establishedYear}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Environmental Stats */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-md font-semibold text-gray-900 mb-4">Environmental Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">156</div>
                  <div className="text-sm text-gray-600">Trees Planted</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-600">Activities</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">1,234</div>
                  <div className="text-sm text-gray-600">Likes Received</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">#12</div>
                  <div className="text-sm text-gray-600">Ranking</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-6 flex justify-end">
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}

        {/* Account Settings */}
        <Card className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-600">Receive email updates about announcements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Public Profile</h3>
                <p className="text-sm text-gray-600">Make your school visible on public pages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SchoolProfile;
