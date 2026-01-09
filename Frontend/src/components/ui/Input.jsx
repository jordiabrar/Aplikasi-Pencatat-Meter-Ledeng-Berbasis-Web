import { forwardRef } from "react";

const Input = forwardRef(({ label, error, className = "", containerClassName = "", icon, ...props }, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          className={`
            w-full px-4 py-3
            ${icon ? "pl-10" : ""} 
            border-2 border-gray-300 rounded-xl
            bg-white
            focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
            hover:border-gray-400
            transition-all duration-300
            disabled:bg-gray-50 disabled:cursor-not-allowed
            placeholder:text-gray-400
            ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        
        {/* Subtle glow effect on focus */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-blue-500/5 group-focus-within:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-fadeIn">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
