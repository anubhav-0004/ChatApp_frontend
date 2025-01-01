import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IoMdAttach } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { LuSendHorizontal } from "react-icons/lu";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMesssages } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const Chat = () => {
  const user = {
    _id: "20072003",
    name: "Anubhav Mishra",
  };
  return (
    <div className="w-full h-full max-sm:h-[99%] flex flex-col">
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
      <form className="flex items-center relative justify-between border border-[#6d6d75] gap-x-3 px-2 py-1 bg-[#646471] h-[8%]">
        <input type="file" name="fileInput" id="fileInput" className="hidden" />
        <label
          htmlFor="fileInput"
          className="text-[#e9e0f9] text-2xl absolute cursor-pointer left-4 mb-1 bg-[#5c5c8a] rotate-[45deg] border border-slate-400 p-[.4rem] w-10 h-10 rounded-[50%]"
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
          className="text-2xl text-[#e9e0f9] cursor-pointer absolute right-4 bg-[#5c5c8a] border border-slate-400 p-[.4rem] w-10 h-10 rounded-[50%] -rotate-[35deg] mb-1"
        />
      </form>
      <FileMenu />
    </div>
  );
};

const Chatss = () => (
  <div>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2  leading-6">
      1 asdfg sdfg asdfs sdfs srrfcf mkjhu dsfg sdfg gfvdcth hyrtgdftyr
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      2 asdfg sdfg asdfs sdfs srrfcf mkjhu trgfde egdd d
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      3 asdfg sdfg asdfs sdfs srrfcf mkjhu ae trge rgrg k rgvsef{" "}
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      4 asdfg sdfg asdfs sdfs srrfcf mkjhu helloo hello helloooo helloooo
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      5 asdfg sdfg asdfs sdfs srrfcf mkjhu df df hgtfd
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      6 asdfg sdfg asdfs sdfs srrfcf mkjhu ert uy dftr wrtf sr5trwrt 455 edred
      dsrtrgfd
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      1 asdfg sdfg asdfs sdfs srrfcf mkjhu ert rtfe y dgyt yhdfhr rw 23 edr
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      2 asdfg sdfg asdfs sdfs srrfcf mkjhu werty etyhrte tuyrtdgtyr trtry teyr
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      3 asdfg sdfg asdfs sdfs srrfcf mkjhu rtytwretgtjtk ghh hyeg hyrge r
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      4 asdfg sdfg asdfs sdfs srrfcf mkjhudergf frte srtes e453r756r6 dt5
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      5 asdfg sdfg asdfs sdfs srrfcf mkjhus s sqre sfertwef tew
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      6 asdfg sdfg asdfs sdfs srrfcf mkjhu wert der 962 fggb 54tb tt
    </p>
  </div>
);

export default AppLayout(Chat);
