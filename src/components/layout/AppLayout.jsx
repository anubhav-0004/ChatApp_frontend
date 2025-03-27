import React, { useState, useEffect } from "react";
import Header from "./Header";
import Tittle from "../shared/Tittle";
import ChatList from "../specific/ChatList";
import ProfileCard from "../specific/ProfileCard";
import { BsThreeDotsVertical, BsX } from "react-icons/bs";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  useLazyAllUsersQuery,
  useMyChatsQuery,
} from "../../redux/api/reduxAPI";
import { useErrors } from "../../hooks/hook";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import EditGroup from "../dialogs/EditGroup";
import ChatDetailModal from "../shared/ChatDetailModal";
import DeleteChatModal from "../shared/DeleteChatModal";

const AppLayout = (WrappedComponent) => {
  return function LayoutWrapper(props) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    const [allUsers] = useLazyAllUsersQuery();

    useErrors([{ isError, error }]);

    const [chatId, setChatId] = useState(params.chatId || null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
    const [showChatList, setShowChatList] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState("");
    const [grpChat, setGrpChat] = useState(false);
    const [isShowChatDetails, setIsShowChatDetails] = useState(false);
    const [selectedChatDetails, setSelectedChatDetails] = useState([]);
    const [isGroupDetails, setIsGroupDetails] = useState(false);
    const [selectedGrp, setSelectedGrp] = useState();
    const [grpForModal, setGrpForModal] = useState([]);
    const [users, setUsers] = useState([]);
    const [currAvatar, setCurrAvatar] = useState("");

    const chatId2 = location.pathname.split("/").filter(Boolean).pop();
    const selectedChat = data?.chats?.find((chat) => chat._id === chatId2);

    const getCurrUser = async (userId) => {
      try {
        const res = await axios(`${server}/api/v1/user/getuser?id=${userId}`, {
          withCredentials: true,
        });
        setSelectedChatDetails(res?.data?.user);
      } catch (error) {
        console.log(error);
      }
    };

    const closeGrpDetailsModal = (e) => {
      e?.preventDefault();
      setIsGroupDetails(false);
    };

    const getCurrGroup = async (id) => {
      try {
        const res = await axios.get(
          `${server}/api/v1/chats/${id}?populate=true`,
          {
            withCredentials: true,
          }
        );
        setGrpForModal([res?.data?.chat]);
      } catch (error) {
        console.log(error);
      }
    };

    const getAllUsers = async () => {
      await allUsers()
        .then(({ data }) => setUsers(data?.filteredData))
        .catch((e) => console.log(e));
    };

    const clickHandler = (e) => {
      e.preventDefault();
      if (selectedChat?.groupChat) {
        setIsGroupDetails(true);
      } else {
        setIsShowChatDetails(true);
      }
    };

    const closeModal = () => {
      setIsShowChatDetails(false);
      setSelectedChatDetails({});
    };

    const deleteChatHandler = async () => {
      // e?.preventDefault();
      console.log("object");
      const id = params.chatId;
      try {
        const res = await axios.delete(`${server}/api/v1/chats/${id}`, {
          withCredentials: true,
        });
        navigate(`/`);
        toast.success(res?.data?.message || "abc");
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      const handleResize = () => {
        const mobileView = window.innerWidth <= 450;
        setIsMobile(mobileView);
        if (!mobileView && !showChatList) {
          setShowChatList(true);
        }
      };

      if (selectedChat?.groupChat) {
        setSelectedGrp(selectedChat?._id);
        getCurrGroup(selectedGrp);
      } else {
        if (isShowChatDetails) {
          getCurrUser(selectedChat?.members[0]);
        }
      }
      setCurrAvatar(selectedChat?.avatar);

      getAllUsers();

      handleResize();
      setChatId(params.chatId);
      if (chatId) setShowChatList(false);

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [params.chatId, chatId, showChatList, isShowChatDetails]);

    const handleChatSelect = (selectedChatId) => {
      navigate(`/chat/${selectedChatId}`);
      setChatId(selectedChatId);
      if (isMobile) setShowChatList(false);
    };

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      setId(_id);
      setGrpChat(groupChat);
      // setShowModal(true);
    };

    // const handleDeleteChatFun = async (e) => {
    //   e.preventDefault();
    //   try {
    //     await axios.delete(`${server}/api/v1/chats/${id}`, {
    //       withCredentials: true,
    //     });
    //     toast.success("Chat deleted.");
    //   } catch (error) {
    //     console.error(error);
    //     toast.error(error?.response?.data?.message || "Cannot delete chat.");
    //   }
    //   setShowModal(false);
    // };

    return (
      <>
        <Tittle />
        <Header />

        {/* Mobile Back Button */}
        {isMobile && !showChatList && (
          <button
            onClick={() => {
              setShowChatList(true);
              navigate(`/`);
              setChatId(null);
            }}
            className="absolute flex top-[0.7rem] right-[1rem] scale-125 border border-[#8282d1] z-50 px-2 py-1 bg-[#383857] text-slate-300 rounded"
          >
            Back
          </button>
        )}

        {isShowChatDetails && (
          <ChatDetailModal
            deleteChatHandler={deleteChatHandler}
            closeModal={closeModal}
            selectedChatDetails={selectedChatDetails}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        )}

        {isGroupDetails && (
          <EditGroup
            onClose={closeGrpDetailsModal}
            group={grpForModal}
            chatId={selectedGrp}
            allUsers={users}
            avatarUrl={currAvatar}
          />
        )}

        {/* Mobile Chat Header: shows name and dp on mobile */}
        {isMobile && !showChatList && (
          <div
            className="absolute flex h-[3.5rem] max-md:h-[4rem] top-0 left-0 border border-[#8282d1] z-40 w-full px-2 gap-x-2 py-[0.1rem] text-2xl font-medium bg-[#383857] text-slate-300 rounded items-center justify-center"
            style={{
              backgroundImage:
                "linear-gradient(to right bottom, rgb(82 77 168), rgb(2 9 47 / 69%))",
            }}
            onClick={clickHandler}
          >
            <img
              src={selectedChat?.avatar?.[0]}
              alt="DP"
              className="border-2 border-[#152a59] rounded-full w-10 h-10 object-cover"
            />
            <p className="max-w-[54%] overflow-hidden text-2xl font-semibold ml-1 text-ellipsis whitespace-nowrap">
              {selectedChat?.name}
            </p>
            <div className="bg-white min-w-2 flex-grow"></div>
          </div>
        )}

        {/* Main Layout */}
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
                <WrappedComponent chatId1={chatId} {...props} />
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
                {/* {showModal && (
                  <DeleteChatModal
                    handleDeleteChatFun={handleDeleteChatFun}
                    setShowModal={setShowModal(false)}
                  />
                )} */}
              </div>

              <div className="w-full bg-slate-200">
                <WrappedComponent chatId1={chatId} {...props} />
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
