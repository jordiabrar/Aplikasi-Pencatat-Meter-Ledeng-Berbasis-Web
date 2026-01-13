import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <img src="/water-outline-svgrepo-com.svg" alt="Logo" className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Tirta Musi</h1>
          <p className="text-blue-100">Sistem Pencatatan Meter Air</p>
        </div>

        {/* Auth Form */}
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
