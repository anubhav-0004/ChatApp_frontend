import React, { Suspense, useState, lazy } from "react";
import logo from "../../assets/logo2.png";
import { TbMenu2 } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { MdGroups2 } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut, IoIosAddCircle } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { Backdrop } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
const Search = lazy(() => import("../specific/Search"));
const NotificationDialogue = lazy(() => import("../specific/Notifications"));
const NewGroupDialogue = lazy(() => import("../specific/NewGroups"));

const Header = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [showOption, setShowOption] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
    setShowOption((prev) => !prev);
  };
  const openSearch = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const navigateToGrp = () => navigate("/group");
  const logOutHandler = () => {
    console.log("Log Out Clicked");
  };
  const openNotification = () => {
    setIsNotification((prev) => !prev);
  };
  return (
    <>
      <div
        className="w-full sticky h-[4rem] max-lg:h-[3rem] bg-[rgb(142,121,73)] py-2 px-4 flex justify-start items-center gap-x-2 border-b-2 border-[#322b70]"
        style={{
          backgroundImage:
            "linear-gradient(to right bottom, rgb(82 77 168), rgb(2 9 47 / 69%))",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          className="rounded-[50%] max-w-12 max-lg:max-w-9 max-md:max-w-7"
        />
        <span className="text-2xl font-semibold text-orange-50">Sandesh</span>
        <div className=" flex-grow"></div>
        <div className="flex lg:gap-x-5 lg:pr-2 gap-x-1 max-md:hidden">
          <IoSearch
            className="text-2xl text-orange-50 cursor-pointer shadow-md rounded-[40%]"
            onClick={openSearch}
          />
          <IoIosAddCircle
            className="text-2xl text-orange-50 cursor-pointer shadow-md rounded-[40%] p-[0px]"
            onClick={openNewGroup}
          />
          <MdGroups2
            className="text-2xl text-orange-50 cursor-pointer shadow-md rounded-[40%]"
            onClick={navigateToGrp}
          />
          <FaBell
            className="text-2xl text-orange-50 cursor-pointer shadow-md rounded-[40%] p-[3px]"
            onClick={openNotification}
          />
          <IoMdLogOut
            className="text-2xl text-orange-50 cursor-pointer shadow-md rounded-[40%]"
            onClick={logOutHandler}
          />
        </div>
        <BsThreeDotsVertical
          className="md:hidden scale-125 p-[1px] text-zinc-200 cursor-pointer"
          onClick={handleMobile}
        />
      </div>
      {showOption && (
        <div
          className="absolute inset-0 h-[100vh] flex items-start pt-[3rem] justify-end bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-dialog-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleMobile();
            }
          }}
        >
          <div className="bg-[#39395a] border border-[#52529f] rounded-lg shadow-lg max-w-md max-md:max-w-[45%] w-full">
            <div className="py-2 px-1 flex flex-col">
              <div className="flex flex-col lg:gap-x-5 lg:pr-2 gap-x-1 gap-y-1">
                <div className="flex gap-x-1">
                  <IoSearch
                    className="text-2xl text-slate-300 cursor-pointer shadow-md rounded-[40%]"
                    onClick={openSearch}
                  />
                  <p className=" text-slate-300">Search</p>
                </div>
                <div className="flex gap-x-1">
                  <IoIosAddCircle
                    className="text-2xl text-slate-300 cursor-pointer shadow-md rounded-[40%] p-[0px]"
                    onClick={openNewGroup}
                  />
                  <p className="text-slate-300">New Group</p>
                </div>
                <div className="flex gap-x-1">
                  <MdGroups2
                    className="text-2xl text-slate-300 cursor-pointer shadow-md rounded-[40%]"
                    onClick={navigateToGrp}
                  />
                  <p className="text-slate-300">Groups</p>
                </div>
                <div className="flex gap-x-1">
                  <FaBell
                    className="text-2xl text-slate-300 cursor-pointer shadow-md rounded-[40%] p-[3px]"
                    onClick={openNotification}
                  />
                  <p className="text-slate-300">Notifications</p>
                </div>
                <div className="flex gap-x-1">
                  <IoMdLogOut
                    className="text-2xl text-slate-300 cursor-pointer shadow-md rounded-[40%]"
                    onClick={logOutHandler}
                  />
                  <p className="text-slate-300">Log Out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Search onClose={() => setIsSearch(false)} />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialogue onClose={() => setIsNewGroup(false)} />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialogue onClose={() => setIsNotification(false)} />
        </Suspense>
      )}
    </>
  );
};

export default Header;
