import React, { useEffect, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { LuSendHorizontal } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import MessageComponent from "../components/shared/MessageComponent";
import { sampleMesssages } from "../constants/sampleData";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../constants/config";

const Chat = ({ chatId1 }) => {
  const user = {
    _id: "20072003",
    name: "Anubhav Mishra",
  };

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const chatId = useLocation().pathname.split("/").filter(Boolean).pop();
  const navigate = useNavigate();
  const [chatDetails, setChatDetails] = useState({});

  const getChatDetails = async (id) => {
    try {
      const res = await axios.get(`${server}/api/v1/chats/${id}`, {
        withCredentials: true,
      });
      setChatDetails(res?.data?.chat);
    } catch (error) {
      console.log(error);
      toast.error("Can not open chat.");
      navigate(`/`);
    }
  };

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    getChatDetails(chatId);

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerHeight, chatId]);

  return (
    <div
      className="w-full flex flex-col overflow-hidden z-40 relative "
      style={{
        height: `calc(${viewportHeight}px - ${
          window.innerWidth >= 768 ? 60 : 55
        }px)`,
      }}
    >
      <div
        className="min-h-[3rem] px-4 py-2 text-[#aea3f5] text-2xl font-semibold 
             bg-[#4b4b7a] text-center hover:bg-[#5a5a8e] 
             transition-colors duration-200 max-[450px]:hidden"
      >
        {chatDetails?.name}
      </div>

      <div
        className="text-[#dfd3ad] w-full max-md:h-[91%] h-[90%] text-xl opacity-95 p-2 overflow-y-auto flex flex-col"
        style={{
          backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/030/663/503/non_2x/brown-background-high-quality-free-photo.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundAttachment: "fixed",
        }}
      >
        {sampleMesssages.map((message, index) => (
          <MessageComponent key={index} message={message} user={user} />
        ))}
      </div>
      <form className="flex items-center relative rounded-t-sm justify-between border border-[#86869d] gap-x-3 px-2 pt-1 bg-[#2d2d56] max-md:h-[9%] h-[10%]">
        <input type="file" name="fileInput" id="fileInput" className="hidden" />
        <label
          htmlFor="fileInput"
          className="text-[#e9e0f9] text-2xl absolute cursor-pointer bottom-[0.8rem] max-md:bottom-[0.4rem] left-4 max-md:left-2 bg-[#5c5c8a] rotate-[45deg] border border-slate-400 p-[.4rem] w-10 h-10 rounded-[50%]"
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
          className="text-2xl text-[#e9e0f9] cursor-pointer absolute bottom-[0.8rem] max-md:bottom-[0.40rem] right-4 max-md:right-2 bg-[#5c5c8a] border border-slate-400 p-[.4rem] w-10 h-10 rounded-[50%] -rotate-[35deg]"
        />
      </form>
      <FileMenu />
    </div>
  );
};

export default AppLayout(Chat);
