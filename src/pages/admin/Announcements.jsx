import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";

const AdminAnnouncements = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  // Mock announcements data
  const announcements = [
    {
      id: 1,
      title: "Annual Environmental Competition 2024",
      message: "We are excited to announce the annual environmental competition! Schools can submit their best environmental projects for a chance to win prizes and recognition. Submission deadline: April 30, 2024.",
      date: "2024-03-15",
      author: "Admin"
    },
    {
      id: 2,
      title: "New Tree Planting Guidelines",
      message: "Please review the updated tree planting guidelines. All schools are required to follow these guidelines for future tree planting activities. Key changes include species selection and maintenance protocols.",
      date: "2024-03-10",
      author: "Admin"
    },
    {
      id: 3,
      title: "Workshop: Waste Management Best Practices",
      message: "Join us for a virtual workshop on waste management best practices. Date: March 25, 2024, Time: 2:00 PM. All school coordinators are encouraged to attend.",
      date: "2024-03-08",
      author: "Admin"
    },
    {
      id: 4,
      title: "Platform Maintenance Notice",
      message: "The platform will undergo scheduled maintenance on March 20, 2024, from 10:00 PM to 2:00 AM. Please save your work accordingly.",
      date: "2024-03-05",
      author: "Admin"
    }
  ];

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsPosting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Posting announcement:", { title, message });
    
    setTitle("");
    setMessage("");
    setIsPosting(false);
    // UI only - would call API in real implementation
  };

  return (
    <DashboardLayout
      requireAdmin={true}
      title="Announcements"
      subtitle="Create and manage announcements for schools"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Announcement Form */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Announcement</h2>
          <form onSubmit={handlePostAnnouncement} className="space-y-4">
            <Input
              label="Title"
              placeholder="Enter announcement title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                placeholder="Enter announcement message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                required
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              loading={isPosting}
              disabled={!title.trim() || !message.trim()}
              className="w-full"
            >
              Post Announcement
            </Button>
          </form>
        </Card>

        {/* Recent Announcements */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Announcements</h2>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                  <span className="text-xs text-gray-500">{announcement.date}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{announcement.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Posted by {announcement.author}</span>
                  <div className="flex gap-2">
                    <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                      Edit
                    </button>
                    <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* All Announcements */}
      <Card className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">All Announcements</h2>
          <span className="text-sm text-gray-500">{announcements.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Author</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement) => (
                <tr key={announcement.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{announcement.title}</p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">{announcement.message}</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{announcement.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{announcement.author}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="px-3 py-1 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default AdminAnnouncements;
