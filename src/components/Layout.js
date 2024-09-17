import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { FaAngleDoubleDown } from "react-icons/fa";
import { message } from "antd";

import { FaUsersGear } from "react-icons/fa6";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSideBrOpen, setSideBrOpen] = useState(false);

  const user = { name: localStorage.getItem('user') };

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate("/login");
  };

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  // Define header colors for specific paths
  const getHeaderColor = () => {
    switch (location.pathname) {
      case "/emptylegbookings":
        return "bg-purple-600";
      case "/dashboard":
        return "bg-blue-600";
      case "/emptylegs":
        return "bg-purple-600";
      case "/emptylegsAllCategories":
        return "bg-purple-600";
      default:
        return "bg-indigo-600";
    }
  };



  // let isRole = localStorage.getItem('role') == 'operator' ||  localStorage.getItem('role') == 'admin'  ? true : false



  return (
    <div className="flex ">
      {isSideBrOpen ? (
        <aside className="w-64 min-h-screen overflow-hidden text-black transition-all duration-300 ease-in-out border shadow-md bg-gray-50">
          <div className="flex items-center justify-between p-4 cursor-pointer">
            <h2 className="text-2xl font-bold">  {localStorage.getItem('role') || 'Control'} Panel </h2>
            <GiHamburgerMenu className="text-2xl" onClick={() => setSideBrOpen(false)} />
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <Link
                  to={"/dashboard"}
                  className="flex items-center px-4 py-2 duration-300 ease-in-out hover:bg-gray-500 hover:text-white ransition-all"
                >
                  <MdDashboard className="m-2" />
                  Dashboard
                </Link>
              </li>
              <li className={`${localStorage.getItem('role') == 'super-admin' ? 'flex' : 'hidden'}`}>
                <Link
                  to={"/users"}
                  className="px-4 py-2 w-[100%] hover:bg-gray-500 hover:text-white flex items-center ransition-all duration-300 ease-in-out"
                >
                  <FaUsersGear className="m-2" />
                  Users
                </Link>
              </li>



              <li className={`${localStorage.getItem('role') == 'super-admin' ? 'flex' : 'hidden'}`}>
                <Link
                  to={"/logs"}
                  className="px-4 py-2 w-[100%] hover:bg-gray-500 hover:text-white flex items-center ransition-all duration-300 ease-in-out"
                >
                  <FaUsersGear className="m-2" />
                  Website Logs
                </Link>
              </li>

            </ul>
          </nav>
        </aside>
      ) : (
        <aside className={`w-12  text-white min-h-screen flex flex-col items-center transition-all duration-300 ease-in-out overflow-hidden shadow-2xl`}>
          <div className="p-4 cursor-pointer ">
            <GiHamburgerMenu className="text-2xl text-black" onClick={() => setSideBrOpen(true)} />
          </div>
        </aside>
      )}

      <div className="flex flex-col flex-1">
        <header className={`${getHeaderColor()} p-4 text-white shadow-md flex justify-between items-center mx-1`}>
          <div className="container flex items-center justify-between mx-auto space-x-4">
            <h1 className="text-xl font-bold">{localStorage.getItem('role') || 'Control'}  Panel </h1>
            <div>
              {user ? (
                <div className="flex items-center ml-auto space-x-4">
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
                  className="px-4 py-2 ml-auto text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
