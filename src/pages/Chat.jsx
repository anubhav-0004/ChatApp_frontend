import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { LuSendHorizontal } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import MessageComponent from "../components/shared/MessageComponent";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../constants/config";
import { NEW_MESSAGE } from "../constants/event";
import { useErrors, useInfiniteScroll, useSocketEvents } from "../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import bgImage from '../chat-background.jpg'
import {
  useChatDetailsQuery,
  useGetMessagesQuery,
} from "../redux/api/reduxAPI";

const Chat = ({ socket }) => {
  const chatId = useLocation().pathname.split("/").filter(Boolean).pop();

  const { user } = useSelector((state) => state.auth);
  const containerRef = useRef(null);

  const chatInfo = useChatDetailsQuery({ id: chatId, skip: !chatId });
  const members = chatInfo?.data?.chat?.members;

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const errors = [
    { isError: chatInfo.isError, error: chatInfo.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [chatDetails, setChatDetails] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { data, setData } = useInfiniteScroll(
    containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.message
  );

  const allMessages = [...data, ...messages];

  const { isFileMenu } = useSelector((state) => state.misc);
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(!isFileMenu));
  };

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

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    if (messagesEndRef.current && data.length < 30) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }

    getChatDetails(chatId);

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerHeight, chatId, messages, data]);

  useEffect(()=>{

    dispatch(removeNewMessagesAlert(chatId));
    return ()=> {
      setMessage('');
      setMessages([]);
      setData([]);
      setPage(1);
    };
  }, [chatId]);

  const newMessageHandler = useCallback((data) => {
    if(data?.chatId !== chatId) return;
    setMessages((prev) => [...prev, data.message]);
  }, [chatId]);

  const eventArr = { [NEW_MESSAGE]: newMessageHandler };

  useSocketEvents(socket, eventArr);
  useErrors(errors);


  const userFirstName = user.name?.split(" ")[0];
  const cleanChatName = chatDetails?.name
  ?.split("-")
  ?.filter((name) => name.trim() !== userFirstName)
  ?.join(" - ");


  return (
    <div
      className="w-full flex flex-col overflow-hidden z-40 relative"
      style={{
        height: `calc(${viewportHeight}px - ${
          window.innerWidth >= 768 ? 60 : 55
        }px)`,
      }}
    >
    
      <div
        className="min-h-[3rem] px-4 py-3 text-[#aea3f5] text-2xl font-semibold 
             bg-[#4b4b7a] text-center hover:bg-[#5a5a8e] 
             transition-colors duration-200 max-[450px]:hidden"
      >
        {chatDetails.groupChat ? chatDetails?.name : cleanChatName}
      </div>

      <div
        ref={containerRef}
        className="text-[#dfd3ad] w-full max-md:h-[91%] h-[90%] text-xl opacity-95 p-2 overflow-y-auto flex flex-col"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundAttachment: "fixed",
        }}
      >
        {allMessages.map((message, index) => (
          <MessageComponent key={index} message={message} user={user} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="flex items-center relative rounded-t-sm m-0 justify-between border border-[#86869d] gap-x-3 px-2 pt-1 bg-[#2d2d56] max-md:h-[9%] h-[10%]"
        onSubmit={submitHandler}
      >
        <div
          className="text-[#e9e0f9] text-2xl absolute cursor-pointer bottom-[0.8rem] max-md:bottom-[0.4rem] left-4 max-md:left-2 bg-[#5c5c8a] rotate-[45deg] border border-slate-400 p-[.4rem] w-10 h-10 rounded-[50%]"
          onClick={handleFileOpen}
        >
          <IoMdAttach />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex flex-grow caret-white border-none placeholder-gray-200 outline-none px-16 text-white bg-transparent rounded-md h-[80%]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          <LuSendHorizontal className="text-2xl text-[#e9e0f9] cursor-pointer absolute bottom-[0.7rem] max-md:bottom-[0.40rem] right-4 max-md:right-2 bg-[#5c5c8a] border border-slate-400 p-[.4rem] w-10 h-10 rounded-[50%] -rotate-[35deg]" />
        </button>
      </form>
      <FileMenu chatId={chatId}/>
    </div>
  );
};

export default AppLayout(Chat); 
