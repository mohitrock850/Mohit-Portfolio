import { useAdmin } from '../context/AdminContext';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const { admin, logout } = useAdmin();
  const location = useLocation();

  if (!admin) return <Navigate to="/admin/login" />;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
        <nav className="space-y-2">
          <Link
            to="/admin/dashboard/projects"
            className={`block px-3 py-2 rounded hover:bg-gray-800 ${location.pathname.includes('projects') ? 'bg-gray-800' : ''}`}
          >
            Projects
          </Link>
          <Link
            to="/admin/dashboard/resume"
            className={`block px-3 py-2 rounded hover:bg-gray-800 ${location.pathname.includes('resume') ? 'bg-gray-800' : ''}`}
          >
            Resume
          </Link>
          <Link
            to="/admin/dashboard/messages"
            className={`block px-3 py-2 rounded hover:bg-gray-800 ${location.pathname.includes('messages') ? 'bg-gray-800' : ''}`}
          >
            Messages
          </Link>
        </nav>
        <button
          onClick={logout}
          className="mt-auto w-full text-left px-3 py-2 hover:bg-red-600 rounded mt-8"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-950">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;