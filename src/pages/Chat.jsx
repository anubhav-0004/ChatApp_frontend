import React, { useEffect, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { LuSendHorizontal } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import MessageComponent from "../components/shared/MessageComponent";
import { sampleChats, sampleMesssages } from "../constants/sampleData";

const Chat = () => {
  const user = {
    _id: "20072003",
    name: "Anubhav Mishra",
  };

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const chatId = useLocation().pathname.split("/").filter(Boolean).pop();

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="w-full flex flex-col overflow-hidden"
      style={{ height: viewportHeight - 56 }}
    >
      <div
        className="text-[#dfd3ad] w-full max-md:h-[91%] h-[90%] text-xl opacity-95 p-2 overflow-y-auto flex flex-col"
        style={{
          backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW0GqVqurY1V77t3jqPKUVYKRXa_HzZ4BBkw&s")`,
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
      <form className="flex items-center relative rounded-t-sm justify-between border border-[#86869d] gap-x-3 px-2 py-1 bg-[#2d2d56] max-md:h-[9%] h-[10%]">
        <input type="file" name="fileInput" id="fileInput" className="hidden" />
        <label
          htmlFor="fileInput"
          className="text-[#e9e0f9] text-2xl absolute cursor-pointer bottom-[0.89rem] max-md:bottom-[0.6rem] left-4 bg-[#5c5c8a] rotate-[45deg] border border-slate-400 p-[.4rem] w-10 h-10 rounded-[50%]"
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
          className="text-2xl text-[#e9e0f9] cursor-pointer absolute bottom-[0.89rem] max-md:bottom-[0.60rem] right-4 bg-[#5c5c8a] border border-slate-400 p-[.4rem] w-10 h-10 rounded-[50%] -rotate-[35deg]"
        />
      </form>
      <FileMenu />
    </div>
  );
};

export default AppLayout(Chat);
