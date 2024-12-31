import React, { useState, useEffect } from "react";
import Header from "./Header";
import Tittle from "../shared/Tittle";
import ChatList from "../specific/ChatList";
import ProfileCard from "../specific/ProfileCard";
import { useNavigate, useParams } from "react-router-dom";
import { sampleChats } from "../../constants/sampleData";

const AppLayout = (WrappedComponent) => {
  return function LayoutWrapper(props) {
    const params = useParams();
    const navigate = useNavigate();
    const [chatId, setChatId] = useState(params.chatId || null); // Manage chatId state
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
    const [showChatList, setShowChatList] = useState(true);

    useEffect(() => {
      setChatId(params.chatId); // Update chatId when the URL changes
    }, [params.chatId]);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 450);
        if (window.innerWidth > 450 && showChatList === false) {
          setShowChatList(true);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [showChatList]);

    const handleChatSelect = (selectedChatId) => {
      navigate(`/chat/${selectedChatId}`); // Update URL
      setChatId(selectedChatId); // Update state immediately
      if (isMobile) {
        setShowChatList(false); // Close chat list on mobile
      }
    };

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete", _id, groupChat);
    };

    return (
      <>
        <Tittle />
        <Header />
        <div className="w-auto h-[calc(100vh-4rem)] max-lg:h-[calc(100vh-3rem)] relative grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[30%_40%_30%]">
          {isMobile ? (
            showChatList ? (
              <div className="w-full h-full border-r-2 border-slate-500 overflow-y-auto bg-[#3d3d5c] flex flex-col">
                <ChatList
                  chats={sampleChats}
                  chatId={chatId}
                  newMessageAlert={[{ chatId, count: 4 }]}
                  onlineUsers={["1", "2"]}
                  handleDeleteChat={handleDeleteChat}
                  onChatSelect={handleChatSelect} // Pass handleChatSelect
                />
              </div>
            ) : (
              <div className="w-full h-full bg-slate-200 flex overflow-y-auto">
                <button
                  onClick={() => {
                    setShowChatList(true);
                    navigate(-1);
                  }}
                  className="absolute -top-[2.5rem] border border-[#4c4c7d] right-1 z-50 px-2 py-1 bg-[#383857] text-slate-300 rounded"
                >
                  Back
                </button>
                <WrappedComponent chatId={chatId} {...props} /> 
              </div>
            )
          ) : (
            <>
              <div className="w-full border-r-2 border-slate-500 overflow-y-auto bg-[#3d3d5c] flex flex-col max-sm:hidden">
                <ChatList
                  chats={sampleChats}
                  chatId={chatId}
                  newMessageAlert={[{ chatId, count: 4 }]}
                  onlineUsers={["1", "2"]}
                  handleDeleteChat={handleDeleteChat}
                  onChatSelect={handleChatSelect} // Pass handleChatSelect
                />
              </div>
              <div className="w-full bg-slate-200 overflow-y-auto">
                <WrappedComponent chatId={chatId} {...props} /> 
              </div>
              <div className="w-full max-lg:hidden border-l-2 border-slate-500 bg-[#3d3d5c] text-[#dfd3ad] p-2">
                <ProfileCard />
              </div>
            </>
          )}
        </div>
      </>
    );
  };
};

export default AppLayout;