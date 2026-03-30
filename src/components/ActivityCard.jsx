import React from "react";
import Card, { CardContent, CardHeader } from "./Card";

const ActivityCard = ({ 
  activity,
  onDelete,
  isAdmin = false 
}) => {
  const { 
    schoolName = "Unknown School",
    date = new Date().toLocaleDateString(),
    image = null,
    description = "",
    likes = 0,
    comments = 0,
    category = "General"
  } = activity;

  return (
    <Card hover={!isAdmin}>
      {/* Header */}
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-lg">🏫</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{schoolName}</h4>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
            {category}
          </span>
          {isAdmin && onDelete && (
            <button 
              onClick={onDelete}
              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </CardHeader>

      {/* Image */}
      {image && (
        <div className="mb-4 -mx-5 -mt-4">
          <img 
            src={image} 
            alt="Activity" 
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* Content */}
      <CardContent>
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
        
        {/* Actions */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
          <button className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm font-medium">{likes} Likes</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium">{comments} Comments</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;