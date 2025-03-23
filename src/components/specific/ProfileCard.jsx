import React from "react";
import { RxAvatar } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaFacebook, FaCalendar, FaUser } from "react-icons/fa";
import moment from "moment";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const myState = useSelector((state) => state.auth.user);
  return (
    <div className="flex items-center justify-center flex-col p-5 w-full">
      {myState?.avatar?.url ? <img src={myState?.avatar?.url} className="rounded-[50%] border-2 border-yellow-600 w-52 h-52 text-zinc-200 bg-zinc-500 mb-2 object-cover" /> : <RxAvatar className="rounded-[50%] border-2 border-yellow-600 w-52 h-52 text-zinc-200 bg-zinc-500 mb-2" />}
      <Profile heading={"Sultanpur"} text={myState?.name} />
      <Profile
        heading={"Email"}
        text={"xyz@gmail.com"}
        Icon={
          <MdEmail className="bg-[#b45d3b] text-[white] rounded-md p-[1px] w-8 h-7" />
        }
      />
      <Profile
        heading={"InstaGram"}
        text={"@anubhav_0004"}
        Icon={
          <FaInstagram
            className="text-[white] rounded-md p-[2px] w-8 h-8"
            style={{
              backgroundImage:
                "linear-gradient(to right, #f9ce34,#ee2a5b , #ee2a7b, #6228d7)",
            }}
          />
        }
      />
      <Profile
        heading={"Facebook"}
        text={"anubhav_0004"}
        Icon={
          <FaFacebook className="bg-[#3242f5] text-[white] rounded-md p-[3px] w-8 h-8" />
        }
      />
      <Profile
        heading={"Joined"}
        text={moment("2022-11-15T20:24:00.000Z").fromNow()}
        Icon={
          <FaCalendar className="bg-[#fe9690] text-[white] rounded-md p-[5px] w-8 h-8" />
        }
      />
    </div>
  );
};

const Profile = ({ text, Icon, heading }) => (
  <div className="flex w-3/4 justify-center text-center items-center gap-x-3 my-2 px-3 py-1 bg-[#525284] rounded-md shadow-md shadow-[#7070b3]">
    {Icon && Icon}
    <div className="flex flex-col ">
      <p className="text-lg">{text}</p>
      <h6 className="text-sm">{heading}</h6>
    </div>
  </div>
);

export default ProfileCard;
