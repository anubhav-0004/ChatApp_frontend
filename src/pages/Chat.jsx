import React, { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IoMdAttach } from "react-icons/io";
import { LuSendHorizontal } from "react-icons/lu";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMesssages } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const Chat = () => {
  const user = {
    _id: "20072003",
    name: "Anubhav Mishra",
  };

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="w-full flex flex-col"
      style={{ height: viewportHeight - 64 }}
    >
      <div
        className="text-[#dfd3ad] w-full h-[92%] text-xl opacity-95 p-2 overflow-y-auto flex flex-col"
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
      <form className="flex items-center relative justify-between border border-[#86869d] gap-x-3 px-2 py-1 bg-[#2d2d56] h-[8%]">
        <input type="file" name="fileInput" id="fileInput" className="hidden"/>
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
      <FileMenu />
    </div>
  );
};


export default AppLayout(Chat);
