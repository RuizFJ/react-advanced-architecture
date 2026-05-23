import { Link, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <Link
          to="/users"
          className={`text-sm ${
            location.pathname === "/users"
              ? "text-gray-900 font-medium"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Usuarios
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Mi App</h1>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
