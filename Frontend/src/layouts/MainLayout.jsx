import { Outlet } from "react-router-dom";

function MainLayout({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center p-1.5">
                <img src="/water-outline-svgrepo-com.svg" alt="Logo" className="w-full h-full" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Tirta Musi</h1>
                <p className="text-xs text-gray-500">Sistem Meter Air</p>
              </div>
            </div>

            {user && (
              <div className="flex items-center gap-3">
                {/* User Info - Desktop */}
                <div className="hidden sm:flex items-center gap-3 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-2.5 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900 tracking-tight">{user.username}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                      <p className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Petugas Lapangan
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Info - Mobile */}
                <div className="flex sm:hidden items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-50 px-3 py-2 rounded-xl border border-blue-200">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-900">{user.username}</span>
                </div>

                {/* Logout Button - Modern Design */}
                <button 
                  onClick={onLogout} 
                  className="group relative px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
                  
                  <div className="relative flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm hidden sm:inline">Keluar</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
