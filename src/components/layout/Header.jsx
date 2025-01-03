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
        className="w-full sticky h-[4rem] bg-[rgb(142,121,73)] py-2 max-md:py-1 px-4 flex justify-start items-center gap-x-2 border-b-2 border-[#322b70]"
        style={{
          backgroundImage:
            "linear-gradient(to right bottom, rgb(82 77 168), rgb(2 9 47 / 69%))",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          className="rounded-[50%] max-w-12 max-lg:max-w-10 max-md:hidden max-md:max-w-9"
        />
        <span className="text-2xl pt-[0.2rem] font-semibold max-md:pl-[0.1rem] max-md:pt-3 bg-gradient-to-r from-[#ff9c3f] via-white to-[#27f527] bg-clip-text text-transparent max-md:animate-pulse">Sandesh</span>
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
          className="md:hidden scale-125 max-md:scale-150 p-[1px] text-zinc-200 cursor-pointer"
          onClick={handleMobile}
        />
      </div>
      {showOption && (
        <div
          className="absolute inset-0 h-[100vh] flex items-start pt-[4rem] justify-end bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-dialog-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleMobile();
            }
          }}
        >
          <div className="bg-[#39395a] border border-[#52529f] rounded-lg shadow-lg mr-2 max-w-md max-md:max-w-[35%] w-full">
              <div className="flex flex-col gap-y-3 px-4 py-4">
                  <p className=" text-slate-300" onClick={openSearch}>Search</p>
                  <p className="text-slate-300" onClick={openNewGroup}>New Group</p>
                  <p className="text-slate-300" onClick={navigateToGrp}>Groups</p>
                  <p className="text-slate-300" onClick={openNotification}>Notifications</p>
                  <p className="text-slate-300" onClick={logOutHandler}>Log Out</p>
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
