import { Avatar, Icon as IconButton } from "@mui/material";
import React, { memo } from "react";
import { IoIosAddCircle, IoIosRemoveCircle  } from "react-icons/io";

const UserItem = ({ user, handler, handlerIsLoading, isAdded= true }) => {
  const { name, _id, avatar } = user;
  return (
    <div className="flex items-center gap-x-3 w-[93%] rounded py-2 bg-[#e0dcdc] mx-auto my-2 px-3 border border-gray-300">
      {!avatar ? (
        <Avatar />
      ) : (
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
      )}
      <p>{name}</p>
      <p className=" flex-grow"></p>
      {
        isAdded ? (<IoIosRemoveCircle
        className="text-[#cf2f32c4] border border-[#f75e34ea] rounded-[50%] w-[8%] h-[8%]"
        onClick={() => handler(_id)}
        disabled={handlerIsLoading}
      />) : (<IoIosAddCircle
        className="text-[#5252ec] border border-[#5252ec] rounded-[50%] w-[8%] h-[8%]"
        onClick={() => handler(_id)}
        disabled={handlerIsLoading}
      />)
      }
    </div>
  );
};

export default memo(UserItem);
