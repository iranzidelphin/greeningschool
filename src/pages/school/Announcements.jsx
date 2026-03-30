import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import AnnouncementCard from "../../components/AnnouncementCard";

const SchoolAnnouncements = () => {
  const announcements = [
    { id: 1, title: "Annual Green Schools Competition", message: "Registration is now open for the 2024 Annual Green Schools Competition.", date: "2 days ago", priority: "high" },
    { id: 2, title: "New Badge System", message: "We've updated our badge system with new achievements.", date: "1 week ago", priority: "normal" },
    { id: 3, title: "Monthly Report Due", message: "Please submit your monthly environmental impact report by the end of the month.", date: "3 days ago", priority: "high" }
  ];

  return (
    <DashboardLayout subtitle="Stay updated with the latest news">
      <div className="max-w-3xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Announcements</h2>
        <div className="space-y-4">
          {announcements.map((a) => <AnnouncementCard key={a.id} announcement={a} />)}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SchoolAnnouncements;