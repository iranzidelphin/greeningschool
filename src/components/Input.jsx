import React, { forwardRef } from "react";

const Input = forwardRef(({ 
  label,
  error,
  helperText,
  className = "",
  containerClassName = "",
  icon: Icon,
  ...props 
}, ref) => {
  const baseStyles = "block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors duration-200";
  const errorStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";
  const iconStyles = Icon ? "pl-10" : "";

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${iconStyles} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export const Textarea = forwardRef(({ 
  label,
  error,
  helperText,
  className = "",
  containerClassName = "",
  rows = 4,
  ...props 
}, ref) => {
  const baseStyles = "block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors duration-200 resize-none";
  const errorStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export const Select = forwardRef(({ 
  label,
  error,
  helperText,
  className = "",
  containerClassName = "",
  options = [],
  ...props 
}, ref) => {
  const baseStyles = "block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors duration-200";
  const errorStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Input;