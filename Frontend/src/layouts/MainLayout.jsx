import { Outlet } from "react-router-dom";
import { ArrowRightOnRectangleIcon, UserCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";

function MainLayout({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Modern Header with Glass Effect */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-5">
            {/* Logo Section - Enhanced */}
            <div className="flex items-center space-x-3 sm:space-x-4 group">
              <div className="relative">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <img src="/water-outline-svgrepo-com.svg" alt="Tirta Musi Logo" className="w-7 h-7 sm:w-8 sm:h-8 filter brightness-0 invert" />
                </div>
              </div>
              <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Tirta Musi
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 hidden sm:block">
                  Sistem Pencatatan Meter Air
                </p>
              </div>
            </div>

            {/* User Section - Enhanced */}
            {user && (
              <div className="flex items-center gap-3 sm:gap-4">
                {/* User Info Card */}
                <div className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2.5 rounded-xl border border-blue-200/50 shadow-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                    <UserCircleIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">{user.username}</p>
                    <p className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      Petugas
                    </p>
                  </div>
                </div>

                {/* Mobile User Badge */}
                <div className="sm:hidden flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-lg border border-blue-200/50">
                  <UserCircleIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-bold text-gray-900">{user.username}</span>
                </div>

                {/* Logout Button - Enhanced */}
                <button 
                  onClick={onLogout} 
                  className="group relative px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ArrowRightOnRectangleIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">Logout</span>
                  </span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom gradient line */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex justify-center">
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
