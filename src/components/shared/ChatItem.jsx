import React, { memo } from "react";
import { Link } from "react-router-dom";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  chatId,
  groupChat = false,
  isOnline,
  newMessage,
  index = 0,
  handleDeleteChat,
  onClick,
}) => {
  const sameSender = chatId === String(_id)
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      onClick={onClick} 
    >
      <div
        className="flex items-center gap-4 p-4 relative border-b border-zinc-400 rounded-r-sm"
        style={{
          backgroundColor: sameSender ? "rgb(46 39 39)" : "#3d3d5c",
          color: sameSender ? "#cbd0ad" : "#f5f2e3",
        }}
      >
        <div className="w-12 h-12 relative">
          <img
            src={avatar[0]}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
          {groupChat && (
            <div className="absolute top-4 right-4 w-4 h-4 bg-blue-500 rounded-full">groupChat</div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          {newMessage && <p>{newMessage.count} New Message</p>}
        </div>
        {isOnline && (
          <div className="absolute right-6 w-3 h-3 bg-green-500 rounded-full"></div>
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
