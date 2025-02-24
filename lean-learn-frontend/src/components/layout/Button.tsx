import { cn } from "../../styles/utils";
import React from "react";

const Button = ({
  variant = "primary",
  className,
  children,
  handleClick,
  loading = false
}: {
  variant?: string;
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
  handleClick?: () => void;
}) => {
  return (
    <button
      className={cn(
        "px-4 py-2 inset-1 border-b-4 border-x-1 border-t-1 rounded-lg font-medium transform hover:scale-95 transition-transform duration-200",
        variant === "primary" && "bg-sky-600 border-sky-700 text-gray-800 hover:bg-blue-600",
        variant === "secondary" && "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-300",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        className
      )}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <span className="inline-flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;