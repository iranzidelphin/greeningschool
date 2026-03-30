import React from "react";
import { Link } from "react-router-dom";
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from "./Card";
import Button from "./Button";

const SchoolCard = ({ 
  school,
  to,
  onApprove,
  onReject,
  isAdmin = false 
}) => {
  const { 
    name = "Unknown School",
    location = "Unknown Location",
    activities = 0,
    status = "pending",
    joinedDate = new Date().toLocaleDateString(),
    profileImage,
  } = school;

  const statusStyles = {
    approved: "bg-emerald-100 text-emerald-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700"
  };

  const card = (
    <Card hover={!isAdmin && !!to}>
      <CardHeader className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {profileImage ? (
            <img
              src={profileImage}
              alt=""
              className="w-12 h-12 rounded-full object-cover border border-emerald-100"
            />
          ) : (
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏫</span>
            </div>
          )}
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{location}</CardDescription>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>📅 Joined: {joinedDate}</span>
          <span>🌱 {activities} Activities</span>
        </div>
        
        {isAdmin && status === "pending" && (
          <div className="flex gap-2 mt-4">
            <Button 
              variant="primary" 
              size="sm" 
              className="flex-1"
              onClick={onApprove}
            >
              Approve
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={onReject}
            >
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (to && !isAdmin) {
    return (
      <Link to={to} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl">
        {card}
      </Link>
    );
  }

  return card;
};

export default SchoolCard;