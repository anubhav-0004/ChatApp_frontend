import React, { Suspense, useState, lazy } from "react";
import logo from "../../assets/logo2.png";
import { IoSearch } from "react-icons/io5";
import { MdGroups2 } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut, IoIosAddCircle } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { Backdrop } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import axios from "axios";
import { server } from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsNewGroup,
  setIsAddMember,
  setIsNotification,
  setIsSearch,
  setIsFileMenu,
  setIsDeleteMenu,
  setUploadingLoader,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import toast from "react-hot-toast";
import { resetNotificationCount } from "../../redux/reducers/chat";

const Search = lazy(() => import("../specific/Search"));
const NotificationDialogue = lazy(() => import("../specific/Notifications"));
const NewGroupDialogue = lazy(() => import("../specific/NewGroups"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSearch, isNewGroup, isNotification } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);
  const [isMobile, setIsMobile] = useState(false);
  const [showOption, setShowOption] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
    setShowOption((prev) => !prev);
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));
    setShowOption(false);
  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
    setShowOption(false);
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
    setShowOption(false);
  };

  const navigateToGrp = () => navigate("/group");
  const logOutHandler = async () => {
    //Logic to logout
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not log out.");
    }
  };
  return (
    <>
      <div
        className="w-full brightness-110 sticky max-md:h-[3.5rem] h-[4rem] bg-[rgb(190,172,129)] py-2 max-md:py-1 px-4 flex justify-start items-center gap-x-2 border-b-2 border-[#3f3879]"
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
        <span className="text-2xl pt-[0.2rem] font-semibold max-md:pl-[0.1rem] max-md:pt-[0.4rem] bg-gradient-to-r from-[#ff9c3f] via-white to-[#27f527] bg-clip-text text-transparent">
          Sandesh
        </span>
        <div className=" flex-grow"></div>
        <div className="flex lg:gap-x-5 lg:pr-2 gap-x-1 max-md:hidden">
          <abbr title="Search">
            <IoSearch
              className="text-2xl text-orange-50 cursor-pointer shadow-md rounded-[40%]"
              onClick={openSearch}
            />
          </abbr>
          <abbr title="Create Group">
            <IoIosAddCircle
              className="text-2xl text-orange-50 cursor-pointer shadow-md rounded-[40%] p-[0px]"
              onClick={openNewGroup}
            />
          </abbr>
          <abbr title="All Groups">
            <MdGroups2
              className="text-2xl text-orange-50 cursor-pointer shadow-md rounded-[40%]"
              onClick={navigateToGrp}
            />
          </abbr>
          <abbr title="Notifications">
            <div className="relative inline-block">
              <button className="rounded-lg">
                <FaBell
                  className="text-2xl text-orange-50 cursor-pointer shadow-md rounded-[40%] p-[3px]"
                  onClick={openNotification}
                />
              </button>
              <span
                className={`absolute top-0 right-0 inline-flex items-center justify-center p-[0.2rem] text-xs font-semibold leading-none text-white bg-[#f45252c1] rounded-full border transform translate-x-1/2 -translate-y-1/2 ${
                  notificationCount ? "block" : "hidden"
                }`}
              >
                {notificationCount}
              </span>
            </div>
          </abbr>
          <abbr title="Admin Pannel">
            <Link to={"/admin"}>
              <MdOutlineAdminPanelSettings className="text-2xl text-orange-200 hover:text-orange-300 cursor-pointer shadow-md rounded-[40%]" />
            </Link>
          </abbr>
          <abbr title="LogOut">
            <IoMdLogOut
              className="text-2xl text-orange-50 cursor-pointer shadow-md rounded-[40%]"
              onClick={logOutHandler}
            />
          </abbr>
        </div>
        <MdGroups2
          className="text-2xl text-orange-50 md:hidden cursor-pointer shadow-md mr-2 rounded-[40%]"
          onClick={navigateToGrp}
        />
        <BsThreeDotsVertical
          className="md:hidden scale-125 max-md:scale-150 p-[1px] text-zinc-200 cursor-pointer"
          onClick={handleMobile}
        />
      </div>
      {showOption && (
        <div
          className="absolute inset-0 h-[100vh] flex items-start pt-[4rem] justify-end bg-black bg-opacity-50 z-40"
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
            <div className="flex flex-col gap-y-2 px-2 py-2 text-orange-300">
              <p className=" text-slate-300" onClick={openSearch}>
                Search
              </p>
              <p className="text-slate-300" onClick={openNewGroup}>
                New Group
              </p>
              <p className="text-slate-300" onClick={openNotification}>
                Notifications
              </p>
              <p className="text-slate-300" onClick={logOutHandler}>
                Log Out
              </p>
              <Link to={"/admin"}>Admin</Link>
            </div>
          </div>
        </div>
      )}
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Search onClose={() => dispatch(setIsSearch(false))} />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialogue onClose={() => dispatch(setIsNewGroup(false))} />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialogue
            onClose={() => dispatch(setIsNotification(false))}
          />
        </Suspense>
      )}
    </>
  );
};

export default Header;
