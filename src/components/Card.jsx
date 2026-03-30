import React from "react";

const Card = ({ 
  children, 
  className = "", 
  padding = "normal",
  shadow = "md",
  hover = false 
}) => {
  const baseStyles = "bg-white rounded-xl overflow-hidden";
  
  const paddings = {
    none: "",
    small: "p-3",
    normal: "p-5",
    large: "p-8"
  };
  
  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl"
  };
  
  const hoverStyles = hover ? "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer" : "";

  const paddingStyle = paddings[padding] || paddings.normal;
  const shadowStyle = shadows[shadow] || shadows.md;

  return (
    <div className={`${baseStyles} ${shadowStyle} ${paddingStyle} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>{children}</div>
);

export default Card;