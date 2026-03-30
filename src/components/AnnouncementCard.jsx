import React from "react";
import Card, { CardContent, CardHeader, CardTitle } from "./Card";

const AnnouncementCard = ({ 
  announcement,
  isAdmin = false,
  onDelete 
}) => {
  const { 
    title = "",
    message = "",
    date = new Date().toLocaleDateString(),
    priority = "normal"
  } = announcement;

  const priorityStyles = {
    high: "bg-red-100 text-red-700 border-red-200",
    normal: "bg-emerald-100 text-emerald-700 border-emerald-200",
    low: "bg-gray-100 text-gray-700 border-gray-200"
  };

  return (
    <Card hover={!isAdmin}>
      <CardHeader className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${priorityStyles[priority]}`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
            <span className="text-xs text-gray-400">{date}</span>
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        {isAdmin && onDelete && (
          <button 
            onClick={onDelete}
            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors ml-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm leading-relaxed">
          {message}
        </p>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;