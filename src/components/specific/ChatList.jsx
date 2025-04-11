import React from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
  onChatSelect,
}) => {
  const onClickHandler = (e) => {
    e.stopPropagation();
    if(String(chats._id) === chatId)
    onChatSelect && onChatSelect();
  };
  return (
    <div>
      {chats.length > 0 ? 
      (chats?.map((data, index) => {
        const { _id, name, avatar, groupChat, members, newMessage, isOnline } =
          data;
        const newMessageAlertCount =
          newMessageAlert.find((alert) => alert.chatId === _id)?.count || 0;
        return (
          <div key={_id}>
            <ChatItem
              key={_id}
              newMessageAlertCount={newMessageAlertCount}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              groupChat={groupChat}
              chatId={chatId}
              index={index}
              handleDeleteChat={handleDeleteChat}
              newMessage={newMessage}
              onClick={onClickHandler}
            />
          </div>
        );
      })) : <div className="px-4 py-2 w-[98%] mt-5 md:mt-2 mx-auto bg-gradient-to-r from-[#58588e] to-[#4949c3] text-[#d3d1d1] border-b border-indigo-300 rounded-lg shadow-lg text-md md:text-lg text-center hover:brightness-105 transition-all duration-200">
  Search & add friends to start a chat
</div>
}
    </div>
  );
};

export default ChatList;
