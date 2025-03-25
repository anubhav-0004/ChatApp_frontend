import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUsersGear } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { Link, useLocation, Navigate } from "react-router-dom";
import { server } from "../../constants/config";
import toast from "react-hot-toast";

const AdminLayout = ({ children }) => {
  const adminTabs = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      Icon: <MdSpaceDashboard />,
    },
    {
      name: "Users",
      path: "/admin/users",
      Icon: <RiUserSettingsFill />,
    },
    {
      name: "Chats",
      path: "/admin/chat",
      Icon: <FaUsersGear />,
    },
    {
      name: "Messages",
      path: "/admin/message",
      Icon: <TiMessages />,
    },
  ];

  const [isAdmin, setIsAdmin] = useState(true);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isAdmin) return <Navigate to="/login" />;

  const logOutHandler = async () => {
    try {
      const data = await axios.get(`${server}/api/v1/admin/logout`,{withCredentials: true})
      toast.success(data?.data?.message);
      setIsAdmin(false);
    } catch (error) {
      console.log(error)
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const location = useLocation();

  const Sidebar = () => {
    return (
      <div
        className={`${
          !isDrawerOpen ? "max-md:hidden" : ""
        } bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]`}
      >
        <div
          className={`fixed md:static top-0 left-0 h-full bg-opacity-90 max-md:min-w-[80%] shadow-xl max-md:bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] z-40 border-r border-gray-600 transition-transform duration-500 md:translate-x-0 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center md:hidden bg-[#16213e] text-2xl font-medium py-2 px-4">
            <button
              onClick={toggleDrawer}
              className="p-2 text-red-500 font-bold border border-red-400 hover:bg-red-100 rounded-md"
            >
              <IoIosArrowRoundBack />
            </button>
          </div>
          <div className="p-4 pb-0">
            {adminTabs.map((tab) => (
              <Link key={tab.path} to={tab.path}>
                <div
                  className={`flex items-center px-4 py-3 text-lg gap-x-3 rounded-lg mb-4 text-white bg-[#1f3795] ${
                    location.pathname === tab.path
                      ? "border-2 border-[#fa9aaa] bg-opacity-90 bg-[#2a2a94]"
                      : "border border-[#b6b4b4]"
                  }`}
                >
                  <span className="text-xl">{tab.Icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <button
            className="flex w-[92%] max-md:w-[87%] border border-[#b6b4b4] mx-auto items-center px-4 py-3 text-lg gap-x-3 rounded-lg mb-4 text-white bg-[#1f3795] hover:bg-[#33337b]"
            onClick={logOutHandler}
          >
            <span>
              <AiOutlineLogout />
            </span>
            <span className="font-medium">LogOut</span>
          </button>
        </div>

        {isDrawerOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 md:hidden z-30"
            onClick={toggleDrawer}
          ></div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="h-[4rem] bg-gradient-to-r from-[#0f3460] to-[#1a1a2e] text-white border-b flex items-center justify-between px-4 max-md:px-2">
        <span className="text-3xl font-normal">Admin Dashboard</span>
        {!isDrawerOpen && (
          <button
            onClick={toggleDrawer}
            className="p-2 bg-[#141453] border border-[#1f1f95] text-white rounded-md md:hidden"
          >
            <IoMenu className="text-2xl" />
          </button>
        )}
      </div>
      <div
        className="bg-gradient-to-br from-[#0f3460] via-[#1a1a2e] to-[#16213e] grid grid-cols-[25%_75%] max-md:grid-cols-1"
        style={{ height: viewportHeight - 64 }}
      >
        <Sidebar />
        <div className="overflow-auto p-5 max-md:p-1 rounded-md shadow-inner bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
