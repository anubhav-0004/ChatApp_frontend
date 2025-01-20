import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaUsersGear } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";


const AdminLayout = ({ children }) => {
  const adminTabs = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      Icon: <MdSpaceDashboard />,
    },
    {
      name: "Users",
      path: "/admin/users-management",
      Icon: <RiUserSettingsFill />,
    },
    {
      name: "Groups",
      path: "/admin/groups-management",
      Icon: <FaUsersGear />,
    },
    {
      name: "Messages",
      path: "/admin/messages",
      Icon: <TiMessages />,
    }
  ];
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control the drawer for mobile view

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const location = useLocation();

  const Sidebar = () => {
    return (
      <div
        className={`${
          !isDrawerOpen ? "max-md:hidden" : ""
        } bg-gradient-to-br from-[#cb8686] via-[#be9a9a] to-[#aa876f]`}
      >
        <div
          className={`fixed md:static top-0 left-0 h-full bg-opacity-90 max-md:min-w-[70%] shadow-lg max-md:bg-white z-40 border-r-2 border-slate-300 transition-transform duration-500 md:translate-x-0 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center md:hidden bg-black bg-opacity-20 text-2xl font-medium py-[.35rem] px-6">
            <button
              onClick={toggleDrawer}
              className="p-1 m-[0.1rem] text-red-500 font-bold md:hidden border border-red-400 hover:bg-red-200 bg-white rounded-md"
            >
              <IoMdClose />
            </button>
          </div>
          <div className="p-2">
            {adminTabs.map((tab) => (
              <Link key={tab.path} to={tab.path}>
                <div
                  className={`flex items-center px-2 py-3 text-xl gap-x-1 rounded-md mb-3 text-[#f7f3cf] bg-black bg-opacity-40 hover:bg-opacity-50 ${
                    location.pathname === tab.path
                      ? "border-2 bg-opacity-75 "
                      : ""
                  }`}
                >
                  <span className="text-xl">{tab.Icon}</span>
                  <span className="ml-2">{tab.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {isDrawerOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 md:hidden z-30"
            onClick={toggleDrawer}
          ></div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="h-[3rem] bg-gradient-to-br from-[#b87878] to-[#7a6252] text-white border-b flex items-center justify-between px-2">
        <span className="text-2xl font-normal text-black">DashBoard</span>
        {!isDrawerOpen && (
          <button
            onClick={toggleDrawer}
            className="p-2 m-2 bg-slate-500 text-white rounded-md md:hidden"
          >
            <IoMenu className="cursor-pointer md:hidden" />
          </button>
        )}
      </div>
      <div
        className="bg-gradient-to-br from-[#b87878]  grid grid-cols-[35%_65%] via-[#be9a9a] to-[#7a6252] max-md:grid-cols-1"
        style={{ height: viewportHeight - 48 }}
      >
        <Sidebar />
        <div className="overflow-auto">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
