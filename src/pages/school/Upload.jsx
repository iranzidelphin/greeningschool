import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ImageUpload from "../../components/ImageUpload";
import Input, { Textarea, Select } from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { createActivity } from "../../utils/firestoreSchema";
import { useAuth } from "../../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const UploadActivity = () => {
  const { user, userRole } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    objective: "",
    category: "",
    image: null,
    imageUrl: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

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

  const handleImageSelect = (file, imageUrl) => {
    setFormData(prev => ({ 
      ...prev, 
      image: file,
      imageUrl: imageUrl 
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Get user data from Firestore
      let schoolName = "School";
      let schoolId = user?.uid;
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            schoolName = userData.displayName || "School";
            schoolId = userData.schoolId || user.uid;
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }

      // Create activity in Firestore
      await createActivity({
        title: formData.title,
        description: formData.description,
        objective: formData.objective,
        category: formData.category,
        imageUrl: formData.imageUrl,
        schoolId: schoolId,
        schoolName: schoolName,
        status: "pending", // Activities need admin approval
        likes: 0,
        comments: 0
      });
      
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
          image: null,
          imageUrl: null
        });
      }, 2000);
    } catch (err) {
      console.error("Error creating activity:", err);
      setError("Failed to submit activity. Please try again.");
      setLoading(false);
    }
  };

  return (
    <DashboardLayout subtitle="Share your school's environmental activities">
      <div className="max-w-3xl mx-auto">
        <Card padding="large">
          {success ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-2">Activity Submitted!</h3>
              <p className="text-gray-600">Your activity has been uploaded successfully and is pending approval.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Activity</h2>
                <p className="text-gray-600">Share your environmental initiatives with the community</p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

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
                  {loading ? "Submitting..." : "Submit Activity"}
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
