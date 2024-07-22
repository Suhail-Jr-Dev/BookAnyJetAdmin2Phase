import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const user = { name: "John Doe" };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white min-h-screen">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link
                to={"/dashboard"}
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Dashboard
              </Link>
              <Link
                to={"/charters"}
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Charters
              </Link>
              <Link
                to={"/emptylegs"}
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Emptylegs
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-indigo-600 p-4 text-white shadow-md flex justify-between items-center mx-1">
          <div className="container mx-auto flex items-center space-x-4 justify-between">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <div>
              {user ? (
                <div className="ml-auto flex items-center space-x-4">
                  <span className="font-semibold">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-white rounded"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
