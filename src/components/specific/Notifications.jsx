import { Avatar } from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../../constants/sampleData";



const Notificaions = ({ onClose }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  const friendRequestHandler = ({ id, accept }) => {
    console.log("Send Friend Request", id);
  };

  
  return (
    <div
      className="absolute inset-0 h-[100vh] max-md:px-10 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full min-h-[60%] max-h-[70%]">
        <div className="flex justify-between items-center border-b p-4">
          <h3
            id="search-dialog-title"
            className="text-lg font-semibold text-center"
          >
            Notifications
          </h3>
          <button
            className="text-gray-500 hover:text-gray-800 bg-red-300 border border-red-200 hover:bg-red-400 delay-100 px-2 py-[2px] rounded-sm"
            onClick={handleClose}
            aria-label="Close Search Modal"
          >
            ✕
          </button>
        </div>

        <div className="px-4 py-2 overflow-y-auto max-h-[28rem] md:max-h-[20rem]">
        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((i) => (
            <div>
            <NotificaionItem
              key={i._id}
              sender={i.sender}
              _id={i._id}
              handler={friendRequestHandler}
            />
                    <div className="flex-col flex-grow"></div>

            </div>
            
          ))
          
        ) : (
          <div>No Notificatons</div>
        )}
        </div>
      </div>
    </div>
  );
};

const NotificaionItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <div className="flex items-center bg-[#e3e1e1] gap-2 my-2 px-4 py-2 border rounded w-[95%] mx-auto border-zinc-400">
      {avatar ? (
        <img
          className="w-12 h-12 max-md:w-9 max-md:h-9 max-md:scale-125 rounded-full"
          src={avatar}
          alt={name}
        />
      ) : (
        <Avatar />
      )}
      <p className="w-full max-md:text-sm font-semibold">
        {name}{" "}
        <span className="font-normal max-md:hidden">
          sent you a friend request
        </span>
        <span className="font-normal md:hidden">as friend ??</span>
      </p>
      <button
        onClick={() => handler({ _id, accept: true })}
        className="text-green-700 opacity-90 bg-green-200 border px-1 rounded max-md:text-sm"
      >
        Accept
      </button>
      <button
        onClick={() => handler({ _id, accept: false })}
        className="text-red-500 opacity-90 bg-red-200 border px-1 rounded max-md:text-sm"
      >
        Remove
      </button>
    </div>
  );
});

export default Notificaions;
