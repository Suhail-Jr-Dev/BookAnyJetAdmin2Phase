import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineBook } from 'react-icons/ai';
import { MdDashboard } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { FaAngleDoubleDown } from "react-icons/fa";
import { message } from "antd";
import { FaUsers } from 'react-icons/fa';
import { MdQuestionAnswer } from 'react-icons/md';
import { FaUsersGear } from "react-icons/fa6";
import { BiClipboard } from 'react-icons/bi';
import { MdOutlineClose } from "react-icons/md";



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
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.ctrlKey && event.key === 'm') {
  //       setIsCategoryOpen(!isCategoryOpen);
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [isCategoryOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'm') {
        setSideBrOpen((prevState) => !prevState);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSideBrOpen]);






  // let isRole = localStorage.getItem('role') == 'operator' ||  localStorage.getItem('role') == 'admin'  ? true : false



  return (
    <div className="flex transition-all duration-500  ease-in-out">
      {isSideBrOpen ? (
        <aside className="w-64 min-h-screen overflow-hidden text-black transition-all duration-300 ease-in-out border shadow-md bg-gray-50">
          <div className="flex items-center justify-between p-4 cursor-pointer">
            <h2 className="text-2xl font-bold">  {localStorage.getItem('role') || 'Control'} Panel </h2>
            <MdOutlineClose className="text-2xl hover:bg-gray-600 hover:fill-white h-[2rem] w-[2.2rem] rounded-full" onClick={() => setSideBrOpen(false)} />
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <Link
                  to={"/dashboard"}
                  className="flex items-center px-4 py-2 duration-300 ease-in-out hover:bg-gray-500 hover:text-white ransition-all"
                >
                  <MdDashboard className="m-2 w-[1.3rem] h-[1.3rem]" />
                  Dashboard
                </Link>
              </li>
              <li className={`${localStorage.getItem('role') == 'super-admin' ? 'flex' : 'hidden'}`}>
                <Link
                  to={"/users"}
                  className="px-4 py-2 w-[100%] hover:bg-gray-500 hover:text-white flex items-center ransition-all duration-300 ease-in-out"
                >
                  <FaUsers className="m-2 w-[1.3rem] h-[1.3rem]" />
                  Users
                </Link>
              </li>

              {/* <li className={`${localStorage.getItem('role') == 'super-admin' ? 'flex' : 'hidden'}`}>
                <Link
                  to={"/logs"}
                  className="px-4 py-2 w-[100%] hover:bg-gray-500 hover:text-white flex items-center ransition-all duration-300 ease-in-out"
                >
                  <BiClipboard className="m-2 w-[1.3rem] h-[1.3rem]" />
                  Website Logs
                </Link>
              </li> */}




              <li className={`${localStorage.getItem('role') == 'super-admin' ? 'flex' : 'hidden'}`}>
                <Link
                  to={"/enquiries"}
                  className="px-4 py-2 w-[100%] hover:bg-gray-500 hover:text-white flex items-center ransition-all duration-300 ease-in-out"
                >
                  <MdQuestionAnswer className="m-2 w-[1.3rem] h-[1.3rem]" />
                  Enquiries
                </Link>
              </li>


              <li className={`${localStorage.getItem('role') == 'super-admin' ? 'flex' : 'hidden'}`}>
                <Link
                  to={"/bookings"}
                  className="px-4 py-2 w-[100%] hover:bg-gray-500 hover:text-white flex items-center ransition-all duration-300 ease-in-out"
                >
                  <AiOutlineBook className="m-2 w-[1.3rem] h-[1.3rem]" />
                  Bookings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      ) : (
        <aside className={`min-w-[3rem] h-screen text-white min-h-screen flex flex-col items-center transition-all duration-300 ease-in-out overflow-hidden shadow-2xl`}>
          <div className="p-4 cursor-pointer ">
            <GiHamburgerMenu className="text-2xl text-black" onClick={() => setSideBrOpen(true)} />
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <Link
                  to={"/dashboard"}
                  className="flex items-center px-4 py-2 duration-300 ease-in-out hover:text-white ransition-all"
                >
                  <div className="hover:bg-gray-500 hover:scale-125 transition-all duration-300 rounded-full" title="Dashboard">
                    <MdDashboard className="m-2 w-[1.3rem] h-[1.3rem] fill-black hover:fill-white" />
                  </div>
                </Link>
              </li>
              <li className={`${localStorage.getItem('role') == 'super-admin' ? 'flex' : 'hidden'}`}>
                <Link
                  to={"/users"}
                  className="px-4 py-2 w-[100%] hover:text-white flex items-center ransition-all duration-300 ease-in-out"
                >
                  <div className="hover:bg-gray-500 hover:scale-125 transition-all duration-300 rounded-full" title="Users">
                    <FaUsers className="m-2 w-[1.3rem] h-[1.3rem] fill-black hover:fill-white" />
                  </div>

                </Link>
              </li>



              {/* <li className={`${localStorage.getItem('role') == 'super-admin' ? 'flex' : 'hidden'}`}>
                <Link
                  to={"/logs"}
                  className="px-4 py-2 w-[100%] hover:bg-gray-500 hover:text-white flex items-center ransition-all duration-300 ease-in-out"
                >
                  <BiClipboard className="m-2 w-[1.3rem] h-[1.3rem]" />
                  Website Logs
                </Link>
              </li> */}




              <li className={`${localStorage.getItem('role') == 'super-admin' ? 'flex' : 'hidden'}`}>
                <Link
                  to={"/enquiries"}
                  className="px-4 py-4 w-[100%] hover:text-white flex items-center ransition-all duration-300 ease-in-out"
                >
                  <div className="hover:bg-gray-500 hover:scale-125 transition-all duration-300 rounded-full" title="Enquiries">
                    <MdQuestionAnswer className="m-2 w-[1.3rem] h-[1.3rem] fill-black hover:fill-white" />

                  </div>
                </Link>
              </li>


              <li className={`${localStorage.getItem('role') == 'super-admin' ? 'flex' : 'hidden'}`}>
                <Link
                  to={"/bookings"}
                  className="px-4 py-2 w-[100%] hover:text-white flex items-center ransition-all duration-300 ease-in-out"
                >
                  <div className="hover:bg-gray-500 hover:scale-125 transition-all duration-300 rounded-full" title="Bookings">
                    <AiOutlineBook className="m-2 w-[1.3rem] h-[1.3rem] fill-black hover:fill-white" />
                  </div>
                </Link>
              </li>

            </ul>
          </nav>
        </aside>
      )
      }

      <div className="flex flex-col flex-1">
        <header className={`${getHeaderColor()} p-4 text-white shadow-md flex justify-between items-center`}>
          <div className="container flex items-center justify-between mx-auto space-x-4">
            <h1 className="text-xl font-bold">{localStorage.getItem('role') || 'Control'}  Panel </h1>
            <div>
              {user ? (
                <div className="flex items-center ml-auto space-x-4">
                  <span className="font-semibold">{user?.name?.slice(0, 1)?.toUpperCase() + user?.name?.slice(1)}</span>
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
    </div >
  );
};

export default Layout;
