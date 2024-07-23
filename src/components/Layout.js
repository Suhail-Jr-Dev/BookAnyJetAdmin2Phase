import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Importing images from the image folder
import down from '../assets/images/down_arrow.svg';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { FaAngleDoubleDown } from "react-icons/fa";

// End of importing the images

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSideBrOpen, setSideBrOpen] = useState(false);

  const user = { name: "John Doe" };

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isSideBrOpen ? (
        <aside className="w-64 bg-gray-800 text-white min-h-screen transition-all duration-300 ease-in-out overflow-hidden">
          <div className="p-4 flex justify-between items-center cursor-pointer">
            <h2 className="text-2xl font-bold">Admin Panel </h2>
            <GiHamburgerMenu className="text-2xl" onClick={() => setSideBrOpen(false)} />
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <Link
                  to={"/dashboard"}
                  className="px-4 py-2 hover:bg-gray-700 flex items-center"
                >
                  <MdDashboard className="mr-0.5" />
                  Dashboard
                </Link>
              </li>
              <li className="border-t border-gray-700 mt-2 pt-2">
                <button
                  onClick={toggleCategory}
                  className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-gray-700 flex justify-between items-center"
                >

                  <div className="flex items-center justify-center">
                    <MdOutlineCategory className="m-1"/>
                    Category
                  </div>

                  <FaAngleDoubleDown />
                </button>
                <ul
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isCategoryOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    } space-y-2 pl-4`}
                >
                  <li>
                    <Link
                      to={"/charters"}
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Charters
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/emptylegs"}
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Emptylegs
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
      ) : (
        <aside className="w-12 bg-gray-800 text-white min-h-screen flex flex-col items-center transition-all duration-300 ease-in-out overflow-hidden">
          <div className="p-4 cursor-pointer">
            <GiHamburgerMenu className="text-2xl" onClick={() => setSideBrOpen(true)} />
          </div>
        </aside>
      )}

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
