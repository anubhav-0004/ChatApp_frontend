import { Backdrop } from "@mui/material";
import axios from "axios";
import React, {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdArrowRoundBack, IoMdAttach } from "react-icons/io";
import { IoReorderThree } from "react-icons/io5";
import { LuSendHorizontal } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import EditGroup from "../components/dialogs/EditGroup";
import AvatarCard from "../components/shared/AvatarCard";
import MessageComponent from "../components/shared/MessageComponent";
import { server } from "../constants/config";
import { sampleChats, sampleMesssages } from "../constants/sampleData";
import {
  useChatDetailsQuery,
  useGetMessagesQuery,
  useLazyAllUsersQuery,
} from "../redux/api/reduxAPI";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import FileMenu from "../components/dialogs/FileMenu";
import { useInfiniteScroll, useSocketEvents } from "../hooks/hook";
import { NEW_MESSAGE } from "../constants/event";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { getSocket } from "../Socket";

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobile = () => setIsMobileMenuOpen((prev) => !prev);
  const navigateBack = () => navigate(-1);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [myGrp, setMyGrp] = useState([]);
  const [allUsers] = useLazyAllUsersQuery();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const socket = getSocket();

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data, setData } = useInfiniteScroll(
    containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.message
  );

  const allMessages = [...data, ...messages];
  const chatInfo = useChatDetailsQuery({ id: chatId, skip: !chatId });
  const members = chatInfo?.data?.chat?.members;

  const getGrp = async () => {
    const data = await axios.get(`${server}/api/v1/chats/my/groups`, {
      withCredentials: true,
    });
    setMyGrp(data.data.groups);
    return data;
  };

  const getAllUsers = async () => {
    await allUsers()
      .then(({ data }) => setUsers(data?.filteredData))
      .catch((e) => console.log(e));
  };

  const { isFileMenu } = useSelector((state) => state.misc);
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(!isFileMenu));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessage("");
      setMessages([]);
      setData([]);
      setPage(1);
    };
  }, [chatId]);

  const newMessageHandler = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const eventArr = { [NEW_MESSAGE]: newMessageHandler };

  useSocketEvents(socket, eventArr);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);


    if (messagesEndRef.current && data.length < 30) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }

    // we can either use .then or directly set grps inside the function
    // getGrp().then((data1) => console.log(data1));
    getGrp();
    getAllUsers();
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerHeight, chatId, messages, data]);

  const { user } = useSelector((state) => state.auth);
  const [isEditGroup, setIsEditGroup] = useState(false);
  const editHandler = () => setIsEditGroup((prev) => !prev);

  return (
    <div
      className="grid place-items-center grid-flow-col max-md:grid-cols-1 grid-cols-[35%_65%]"
      style={{ height: viewportHeight }}
    >
      <div className="bg-gradient-to-r from-[#6158c2] to-[#483b9a] max-md:hidden overflow-y-auto relative w-full h-full  shadow-md">
        <GroupList myGroups={myGrp} chatId={chatId} />
      </div>
      <div className="overflow-y-hidden bg-gradient-to-br from-[#7772aa] to-[#5d5ba3] w-full h-full">
        {chatId ? (
          <>
            <div className="flex h-[7.5%] md:h-[8.5%] items-center px-4 justify-between py-2 bg-[#2e1f7bcd] shadow-lg">
              <IoMdArrowRoundBack
                className="bg-[#333] rounded-[50%] text-white max-md:p-[0.23rem] max-md:w-12 p-2 w-10 h-10 cursor-pointer transition-transform hover:scale-110"
                onClick={navigateBack}
              />
              <div
                className="flex flex-grow mx-4 items-center justify-center gap-x-1 text-[#f29e9e] h-10 text-2xl cursor-pointer"
                onClick={editHandler}
              >
                <img
                  src={myGrp.find((chat) => chat._id === chatId)?.avatar[0]}
                  alt="DP"
                  className="border border-[#8267a3] rounded-full w-8 h-8 object-cover"
                />
                <p className="font-medium max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-white">
                  {myGrp.find((chat) => chat._id === chatId)?.name}
                </p>
                <MdEdit className="ml-5 max-md:ml-0 text-[#f2f2f2] w-7 h-7 cursor-pointer hover:text-[#b5b5b5]" />
              </div>
              <IoReorderThree
                className="bg-[#333] rounded-[50%] text-white md:hidden p-2 max-md:p-[0.23rem] max-md:w-12 w-10 h-10 cursor-pointer transition-transform hover:scale-110"
                onClick={handleMobile}
              />
            </div>
            <div
              className="px-2 py-1 w-full h-[85%] md:h-[84%] overflow-y-auto flex flex-col relative"
              ref={containerRef}
            >
              {allMessages.map((message, index) => (
                <MessageComponent key={index} message={message} user={user} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form
              className="flex relative items-center justify-between border-t border-[#6d6d75] gap-x-3 px-2 py-1 bg-[#2e1f7bcd] h-[7.5%]"
              onSubmit={submitHandler}
            >
              <div
                className="text-[#e9e0f9] text-2xl cursor-pointer bg-[#5c5c8a] rotate-[45deg] border border-slate-400 p-2 w-10 h-10 rounded-full"
                onClick={handleFileOpen}
              >
                <IoMdAttach />
              </div>
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow caret-white border-none placeholder-gray-200 outline-none max-md:px-0 px-3 text-white bg-transparent rounded-md h-[80%]"
              />
              <button type="submit">
                <LuSendHorizontal className="text-2xl absolute bottom-[0.45rem] right-4 text-[#e9e0f9] cursor-pointer bg-[#5c5c8a] border border-slate-400 p-2 w-10 h-10 rounded-full -rotate-[35deg]" />
              </button>
            </form>
            <FileMenu chatId={chatId} />
            {isEditGroup && (
              <Suspense fallback={<Backdrop open />}>
                <EditGroup
                  group={myGrp}
                  chatId={chatId}
                  onClose={() => setIsEditGroup(false)}
                  allUsers={users}
                />
              </Suspense>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="border bg-gradient-to-r from-[#6158c2] to-[#483b9a] overflow-y-auto relative w-full h-full md:hidden">
              <GroupList myGroups={myGrp} chatId={chatId} />
            </div>
            <p className="w-fit mx-auto text-3xl py-1 px-4 rounded-lg border border-[#4e4d4d] text-[#7d3415] bg-[#ece3e341] max-md:hidden">
              Click on a Group
            </p>
          </div>
        )}
      </div>
      <div
        className={`fixed max-md:block hidden overflow-y-auto top-1 left-0 max-h-[98%] bg-[#6158c2] shadow-lg border-r w-64 transform transition-transform z-30 duration-500 rounded-lg ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <GroupList
          myGroups={myGrp}
          chatId={chatId}
          handleMobile={handleMobile}
        />
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

const GroupList = ({ myGroups = [], chatId, handleMobile }) => {
  const navigate = useNavigate();
  const navigateBack = () => navigate("/");
  return (
    <div className="w-[96%] mx-auto py-1 relative min-h-[99vh]">
      <div className="sticky top-0 z-10 border border-[#716bbc] shadow-[#655fad] bg-[#363453] bg-gradient-to-r from-[#363453] to-[#2a0e66] p-4 flex justify-between items-center rounded-lg shadow-md mb-1">
        <span className="text-2xl font-semibold text-white">Groups</span>
        <AiOutlineHome
          className="text-white text-3xl cursor-pointer bg-[#483b9a] p-1 rounded-full"
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
        <div className="text-center mt-3 font-bold text-white">No Groups</div>
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
        className={`flex items-center p-2 border-b mb-2 rounded-lg shadow-md shadow-[#a39cf4b1] transition-transform ${
          chatId === String(_id)
            ? "bg-[#5c3f32] text-[#e9f7a0]"
            : "bg-[#363453] text-[#e9d9fe]"
        }`}
      >
        <AvatarCard avatar={avatar} />
        <p className="text-lg font-medium">{name}</p>
      </div>
    </Link>
  );
});

export default Groups;
