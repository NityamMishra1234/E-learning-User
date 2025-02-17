
import React from "react";

const Button = ({ children, className, onClick, type = "button", ...props }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-600 bg-indigo-500 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
