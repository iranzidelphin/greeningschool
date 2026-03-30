import React from "react";
import Card from "./Card";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend,
  trendUp = true,
  color = "emerald" 
}) => {
  const colorStyles = {
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600"
  };

  const trendColor = trendUp ? "text-emerald-600" : "text-red-600";
  const trendIcon = trendUp ? "↑" : "↓";

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 ${trendColor} font-medium`}>
              {trendIcon} {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorStyles[color]}`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;