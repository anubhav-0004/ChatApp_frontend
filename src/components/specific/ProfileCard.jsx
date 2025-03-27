import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { MdEmail, MdInfoOutline } from "react-icons/md";
import { FaCalendar, FaUserCircle } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi2";
import moment from "moment";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(userData);
    }, 2500);

    return () => clearTimeout(timer);
  }, [userData]);


  return (
    <div className="flex items-center justify-center flex-col p-5 w-full">
      {user?.avatar?.url ? (
        <img
          src={user?.avatar?.url}
          className="rounded-[50%] border-2 border-yellow-600 w-52 h-52 text-zinc-200 bg-zinc-500 mb-2 object-cover"
        />
      ) : (
        <RxAvatar className="rounded-[50%] border-2 border-yellow-600 w-52 h-52 text-zinc-200 bg-zinc-500 mb-2" />
      )}
      <Profile
        heading={"Name"}
        text={user?.name || "-"}
        Icon={
          <FaUserCircle className="bg-[#eba488] text-[white] rounded-lg p-[5px] w-8 h-8 border" />
        }
      />
      <Profile
        heading={"Bio"}
        text={user?.bio || "-"}
        Icon={
          <MdInfoOutline className="bg-[#465846] text-[white] rounded-md p-[3px] w-8 h-8 border" />
        }
      />
      <Profile
        heading={"User_name"}
        text={user?.username}
        Icon={
          <HiIdentification className="text-[#4d5362] rounded-md p-[1px] w-8 h-7 bg-[#ddcbfb] border" />
        }
      />
      <Profile
        heading={"Email"}
        text={user?.email || "No mail id"}
        Icon={
          <MdEmail className="bg-[#b45d3b] text-[white] rounded-md p-[1px] w-8 h-7 border" />
        }
      />

      <Profile
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={
          <FaCalendar className="bg-[#fe9690] text-[white] rounded-md p-[5px] w-8 h-8 border" />
        }
      />
    </div>
  );
};

const Profile = ({ text, Icon, heading }) => (
  <div className="flex w-3/4 items-center gap-x-4 my-2 px-4 py-[0.5rem] bg-[#525284] rounded-md shadow-md shadow-[#7070b3]">
    
    {Icon && <div className="flex-shrink-0 ml-4">{Icon}</div>}

    <div className="flex flex-col">
      <h6 className="text-sm font-semibold text-gray-300">{heading}</h6>
      <p className="text-lg text-white">{text}</p>
    </div>

  </div>
);


export default ProfileCard;
