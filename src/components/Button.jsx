import React from "react";

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  disabled = false,
  onClick,
  type = "button",
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 disabled:bg-emerald-400",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500 disabled:bg-gray-100",
    outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500 disabled:border-emerald-300 disabled:text-emerald-300",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:bg-red-400",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500 disabled:text-gray-400",
    white: "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm focus:ring-emerald-500"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };

  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;