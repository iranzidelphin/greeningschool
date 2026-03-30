import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ImageUpload from "../../components/ImageUpload";
import Input, { Textarea, Select } from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";

const UploadActivity = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    objective: "",
    category: "",
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = [
    { value: "", label: "Select a category" },
    { value: "Tree Planting", label: "Tree Planting" },
    { value: "Recycling", label: "Recycling" },
    { value: "Gardening", label: "Gardening" },
    { value: "Energy", label: "Energy Conservation" },
    { value: "Waste Management", label: "Waste Management" },
    { value: "Water Conservation", label: "Water Conservation" },
    { value: "Awareness", label: "Awareness Campaign" },
    { value: "Other", label: "Other" }
  ];

  const handleImageSelect = (file, preview) => {
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSuccess(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        title: "",
        description: "",
        objective: "",
        category: "",
        image: null
      });
    }, 2000);
  };

  return (
    <DashboardLayout subtitle="Share your school's environmental activities">
      <div className="max-w-3xl mx-auto">
        <Card padding="large">
          {success ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-2">Activity Submitted!</h3>
              <p className="text-gray-600">Your activity has been uploaded successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Activity</h2>
                <p className="text-gray-600">Share your environmental initiatives with the community</p>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Photo
                </label>
                <ImageUpload onImageSelect={handleImageSelect} />
              </div>

              <Input
                label="Activity Title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Tree Planting Day 2024"
              />

              <Select
                label="Category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                options={categories}
              />

              <Textarea
                label="Description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what your school did during this activity..."
                rows={4}
              />

              <Input
                label="Objective"
                name="objective"
                required
                value={formData.objective}
                onChange={handleChange}
                placeholder="e.g., To reduce carbon footprint and provide shade"
              />

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Submit Activity"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => window.history.back()}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UploadActivity;