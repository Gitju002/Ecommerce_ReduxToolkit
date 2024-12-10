import React, { useState } from "react";

const SelectBox = ({
  options = [],
  onChange,
  value,
  className = "",
  disabled = false,
  size = "base",
  variant = "default",
  width = "w-full",
  defaultValue = "",
  ...props
}) => {
  const [hasValue, setHasValue] = useState(value !== defaultValue);

  const handleChange = (e) => {
    setHasValue(e.target.value !== defaultValue);
    if (onChange) onChange(e);
  };

  const sizeClasses = {
    small: "text-sm py-1 px-2",
    base: "text-base py-2 px-3",
    large: "text-lg py-3 px-4",
  };

  const variantClasses = {
    default:
      "bg-white text-gray-700 border border-gray-300 focus:border-blue-500",
    outline:
      "bg-transparent text-gray-700 border border-gray-300 focus:bg-gray-100",
  };

  return (
    <select
      onChange={handleChange}
      value={value}
      className={`rounded-full transition-all duration-300 outline-none focus:ring-1 focus:ring-slate-300 focus:ring-offset-1 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 ${sizeClasses[size]} ${variantClasses[variant]} ${width} ${className}`}
      disabled={disabled}
      style={{
        color: hasValue
          ? "inherit"
          : "var(--tw-text-opacity, rgba(107, 114, 128, 1))",
      }}
      {...props}
    >
      {defaultValue && <option value={defaultValue}>{defaultValue}</option>}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
