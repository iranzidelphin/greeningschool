import React from "react";

const ProgressBar = ({ 
  progress, 
  size = "md", 
  showLabel = true,
  label = "Progress",
  color = "emerald",
  className = "" 
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  const sizes = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6"
  };
  
  const colors = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    red: "bg-red-500"
  };

  const sizeClass = sizes[size] || sizes.md;
  const colorClass = colors[color] || colors.emerald;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2 gap-2">
          <span className="text-sm font-medium text-gray-700 truncate">{label}</span>
          <span className="text-sm font-bold text-emerald-600 shrink-0">{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClass} overflow-hidden`}>
        <div
          className={`${colorClass} ${sizeClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;