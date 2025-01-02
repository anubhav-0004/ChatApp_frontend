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
  onChatSelect ,
}) => {
  const onClickHandler = (e) => {
    e.stopPropagation();
    onChatSelect && onChatSelect();
  };
  return (
    <div>
      {chats?.map((data, index) => {
        const { _id, name, avatar, groupChat, members, newMessage, isOnline } =
          data;
        const newMessageAlertCount = newMessageAlert.find(
          (alert) => alert.chatId === _id
        )?.count || 0;
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
      })}
    </div>
  );
};

export default ChatList;
