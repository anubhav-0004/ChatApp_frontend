import React, { useState, useEffect } from "react";
import Header from "./Header";
import Tittle from "../shared/Tittle";
import ChatList from "../specific/ChatList";
import ProfileCard from "../specific/ProfileCard";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { sampleChats } from "../../constants/sampleData";
import { useMyChatsQuery } from "../../redux/api/reduxAPI";
import { useErrors } from "../../hooks/hook";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";

const AppLayout = (WrappedComponent) => {
  return function LayoutWrapper(props) {
    const params = useParams();
    const navigate = useNavigate();
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);
    const [chatId, setChatId] = useState(params.chatId || null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
    const [showChatList, setShowChatList] = useState(true);
    const chatId2 = useLocation().pathname.split("/").filter(Boolean).pop();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      setChatId(params.chatId);
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

    useEffect(() => {
      if (chatId) {
        setShowChatList(false);
      }
    }, [chatId]);

    const handleChatSelect = (selectedChatId) => {
      navigate(`/chat/${selectedChatId}`);
      setChatId(selectedChatId);
      if (isMobile) {
        setShowChatList(false);
      }
    };

    const [id, setId] = useState("");
    const [grpChat, setGrpChat] = useState(false);
    const handleDeleteChat = (e, _id, groupChat) => {
      setId(_id);
      setGrpChat(groupChat);
      e.preventDefault();
      setShowModal(true);
    };

    const handleDeleteChatFun = async (e) => {
      e.preventDefault();
      try {
        await axios.delete(`${server}/api/v1/chats/${id}`,{
          withCredentials: true,
        });
        toast.success("Chat deleted.");
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Can not delete chat.")
      }
      setShowModal(false);
    };

    return (
      <>
        <Tittle />
        <Header />
        {isMobile && !showChatList && (
          <button
            onClick={() => {
              setShowChatList(true);
              navigate(`/chat`);
              setChatId(null);
            }}
            className="absolute flex top-[0.7rem] right-[1rem] scale-125  border border-[#8282d1] z-50 px-2 py-1 bg-[#383857] text-slate-300 rounded"
          >
            Back
          </button>
        )}
        {isMobile && !showChatList && (
          <div
            className="absolute flex h-[3.50rem] max-md:h-[4rem] top-[0rem] left-[0rem]  border border-[#8282d1] z-40 px-2 gap-x-2 w-[100vw] py-[0.1rem] text-2xl font-medium bg-[#383857] text-slate-300 rounded items-center justify-center"
            style={{
              backgroundImage:
                "linear-gradient(to right bottom, rgb(82 77 168), rgb(2 9 47 / 69%))",
            }}
          >
            <img
              src={data?.chats?.find((chat) => chat._id === chatId2)?.avatar[0]}
              alt="DP"
              className="border border-[#8267a3] rounded-full w-10 h-10"
            />
            <p className="max-w-[54%] overflow-hidden ml-1 text-ellipsis whitespace-nowrap">
              {data?.chats?.find((chat) => chat._id === chatId2)?.name}
            </p>
            <div className="bg-white min-w-2 flex-grow"></div>
          </div>
        )}
        <div className="w-auto h-[calc(100vh-4rem)] max-md:h-[calc(100vh-3.5rem)] relative grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[30%_40%_30%] overflow-hidden">
          {isMobile ? (
            showChatList ? (
              <div className="w-full h-full border-r-2 border-slate-500 overflow-y-auto bg-[#3d3d5c] flex flex-col">
                <ChatList
                  chats={data?.chats}
                  chatId={chatId}
                  newMessageAlert={[{ chatId, count: 4 }]}
                  onlineUsers={["1", "2"]}
                  handleDeleteChat={handleDeleteChat}
                  onChatSelect={handleChatSelect}
                />
              </div>
            ) : (
              <div className="w-full relative h-full bg-slate-200 flex overflow-x-hidden overflow-y-auto">
                <WrappedComponent chatId={chatId} {...props} />
              </div>
            )
          ) : (
            <>
              <div className="w-full border-r-2 border-slate-500 overflow-y-auto bg-[#3d3d5c] flex flex-col max-sm:hidden">
                <ChatList
                  chats={data?.chats}
                  chatId={chatId}
                  newMessageAlert={[{ chatId, count: 4 }]}
                  onlineUsers={["1", "2"]}
                  handleDeleteChat={handleDeleteChat}
                  onChatSelect={handleChatSelect}
                />
                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-96 max-md:w-80 text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Do you want to delete this chat?
                      </h3>
                      <div className="flex justify-around mt-4">
                        <button
                          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          onClick={handleDeleteChatFun}
                        >
                          Yes
                        </button>
                        <button
                          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                          onClick={() => setShowModal(false)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full bg-slate-200">
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
