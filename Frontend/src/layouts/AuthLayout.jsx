import { Outlet } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand - Enhanced */}
        <div className="text-center mb-8 sm:mb-10 animate-fadeIn">
          {/* Logo Container with multiple effects */}
          <div className="relative inline-block mb-4 sm:mb-5">
            {/* Main logo container */}
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-3xl shadow-2xl transform hover:scale-105 hover:rotate-3 transition-all duration-300">
              {/* Logo image */}
              <img 
                src="/water-outline-svgrepo-com.svg" 
                alt="Tirta Musi Logo" 
                className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-lg" 
              />
            </div>
          </div>

          {/* Title with enhanced styling */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
              <span className="inline-block transform hover:scale-110 transition-transform duration-300">
                Tirta Musi
              </span>
            </h1>
            
            {/* Subtitle with icon */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-200"></div>
              <p className="text-sm sm:text-base md:text-lg text-blue-100 font-semibold tracking-wide flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Sistem Pencatatan Meter Air
              </p>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-200"></div>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <Outlet />

        {/* Footer badge */}
        <div className="text-center mt-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs text-white/90 font-medium">Sistem Aktif & Aman</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
