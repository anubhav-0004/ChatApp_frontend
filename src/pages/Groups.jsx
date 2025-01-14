import React, { useState, useEffect, memo, Suspense } from "react";
import { IoReorderThree } from "react-icons/io5";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleMesssages, sampleUser } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { IoMdAttach } from "react-icons/io";
import { LuSendHorizontal } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Backdrop } from "@mui/material";
import EditGroup from "../components/dialogs/EditGroup";


const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const navigateBack = () => {
    navigate(-1);
  };
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const user = {
    _id: "20072003",
    name: "Anubhav Mishra",
  };

  const [isEditGroup, setIsEditGroup] = useState(false);
  const editHandler = () => {
    setIsEditGroup((prev) => !prev);
  };

  return (
    <div
      className="grid place-items-center grid-flow-col max-md:grid-cols-1 grid-cols-[35%_65%]"
      style={{ height: viewportHeight }}
    >
      <div className="border bg-[#6158c2] overflow-y-auto relative w-full h-full max-md:hidden">
        <GroupList myGroups={sampleChats} chatId={chatId} />
      </div>

      <div className="overflow-y-hidden bg-[#7772aa] w-full h-full">
        {chatId ? (
          <>
            <div className="flex h-[7.5%] md:h-[8.5%] items-center px-4 justify-between py-2 bg-[#2e1f7bcd]">
              <IoMdArrowRoundBack
                className="bg-black rounded-[50%] text-[white] p-2 w-10 h-10 cursor-pointer"
                onClick={navigateBack}
              />
              <div
                className="flex flex-grow mx-4 items-center justify-center gap-x-1 text-[#f29e9e] h-10 text-2xl cursor-pointer"
                onClick={editHandler}
              >
                <img
                  src={
                    sampleChats.find((chat) => chat._id === chatId)?.avatar[0]
                  }
                  alt=""
                  className="border border-[#8267a3] rounded-[50%] text-white w-7 h-7"
                />
                <p className="font-medium max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {sampleChats.find((chat) => chat._id === chatId)?.name}
                </p>
                <MdEdit className="border border-white ml-5 rounded-[50%] text-white p-[0.3rem] w-7 h-7" />
              </div>
              <IoReorderThree
                className="bg-black rounded-[50%] text-white p-[0.3rem] w-10 h-10 cursor-pointer"
                onClick={handleMobile}
              />
            </div>
            <div className="px-2 py-1 w-full h-[85%] md:h-[84%] overflow-y-auto flex flex-col">
              {sampleMesssages.map((message, index) => (
                <MessageComponent key={index} message={message} user={user} />
              ))}
            </div>
            <form className="flex items-center relative justify-between border border-[#6d6d75] gap-x-3 px-2 py-1 bg-[#40409a] h-[7.5%]">
              <input
                type="file"
                name="fileInput"
                id="fileInput"
                className="hidden"
              />
              <label
                htmlFor="fileInput"
                className="text-[#e9e0f9] text-2xl absolute cursor-pointer left-4 bg-[#5c5c8a] rotate-[45deg] border border-slate-400 p-[.4rem] w-10 h-10 rounded-[50%]"
              >
                <IoMdAttach />
              </label>
              <input
                type="text"
                placeholder="Type a message"
                className="flex flex-grow caret-white border-none placeholder-gray-200 outline-none px-16 text-white bg-transparent rounded-md h-[80%]"
              />
              <LuSendHorizontal
                type="submit"
                className="text-2xl text-[#e9e0f9] cursor-pointer absolute right-4 bg-[#5c5c8a] border border-slate-400 p-[.4rem] w-10 h-10 rounded-[50%] -rotate-[35deg]"
              />
            </form>
            {isEditGroup && (
              <Suspense fallback={<Backdrop open />}>
                <EditGroup group={sampleChats} chatId={chatId} onClose={() => setIsEditGroup(false)} allUsers={sampleUser} />
              </Suspense>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="border bg-[#6158c2] overflow-y-auto relative w-full h-full md:hidden">
              <GroupList myGroups={sampleChats} chatId={chatId} />
            </div>
            <p className="w-fit mx-auto text-3xl py-1 px-4 rounded-lg border border-[#4e4d4d] text-[#7d3415] bg-[#ece3e341] max-md:hidden">
              Click on a Group
            </p>
          </div>
        )}
      </div>
      <div
        className={`fixed max-md:block hidden overflow-y-auto top-[0.4rem] z-50 left-0 max-h-[98%] bg-[#6158c2] shadow-lg border-r w-64 transform transition-transform duration-500 rounded-lg ease-in-out ${
          isMobileMenuOpen ? "-translate-x-[0.2rem]" : "-translate-x-[15.75rem]"
        }`}
      >
        <GroupList
          myGroups={sampleChats}
          chatId={chatId}
          handleMobile={handleMobile}
        />
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId, handleMobile }) => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  return (
    <div className="w-[96%] mx-auto py-2 relative">
      <div className="w-full rounded-lg flex justify-between px-7 items-center text-3xl font-medium text-zinc-300 h-[3.5rem] shadow-lg border-b-2 border-[#342b58d3] bg-[#3c2b7c]">
        <span>Groups</span>
        <AiOutlineHome
          className="bg-[#361b6a74] rounded-[50%] text-[white] border p-2 w-10 h-10 cursor-pointer"
          onClick={navigateBack}
        />
      </div>
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem
            group={group}
            key={group._id}
            chatId={chatId}
            handleMobile={handleMobile}
          />
        ))
      ) : (
        <div className=" text-center">No Groups</div>
      )}
    </div>
  );
};

const GroupListItem = memo(({ group, chatId, handleMobile }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
        handleMobile();
      }}
    >
      <div
        className="flex items-center mt-1 shadow-lg shadow-[#8b86b6] py-2 rounded-lg px-1 border-b border-zinc-400"
        style={{
          backgroundColor: chatId === String(_id) ? "#3a3845" : "#484382",
        }}
      >
        <AvatarCard avatar={avatar} />
        <p className="text-lg text-[#cfbd98]">{name}</p>
      </div>
    </Link>
  );
});

export default Groups;
