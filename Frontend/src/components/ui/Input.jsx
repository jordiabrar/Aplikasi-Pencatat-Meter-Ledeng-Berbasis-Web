import { forwardRef } from "react";

const Input = forwardRef(({ label, error, className = "", containerClassName = "", icon, ...props }, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}

        <input
          ref={ref}
          className={`
            w-full px-4 py-2.5 
            ${icon ? "pl-10" : ""} 
            border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            transition-all duration-200
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
