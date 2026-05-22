import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">Mi App</h1>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
