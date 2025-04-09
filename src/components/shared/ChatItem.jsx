import React, { memo } from "react";
import { MdGroups3 } from "react-icons/md";
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
  newMessageAlertCount,
}) => {
  const sameSender = chatId === String(_id);
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => {
        e.preventDefault();
        handleDeleteChat(e, _id, groupChat);
      }}
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
            alt="DP"
            className="w-full h-full object-cover rounded-full text-green-400"
          />
        </div>
        {groupChat && (
          <MdGroups3 className="absolute top-8 right-6 w-5 h-5 text-blue-700 bg-[#abd7f2] rounded-full animate-pulse"></MdGroups3>
        )}
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          {newMessageAlertCount !== 0 && <p className="text-xs text-[#d08484] font-thin">{newMessageAlertCount} New Message</p>}
        </div>
        {isOnline && (
          <div className="absolute right-6 w-3 h-3 bg-green-500 rounded-full"></div>
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
