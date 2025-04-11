import React, { useEffect, useState } from "react";
import UserItem from "../shared/UserItem";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { server } from "../../constants/config";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";

const EditGroup = ({ onClose, group, chatId, allUsers, avatarUrl }) => {
  if (!chatId) {
    const segments = location.pathname.split("/");
    chatId = segments[segments.length - 1];
  }
  const handleClose = () => onClose && onClose();
  const groupName = group?.find((chat) => chat._id === chatId);
  const admin = groupName?.creator;
  const [users, setUsers] = useState([]);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [addMember, setAddMember] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const location = useLocation();

  const grpMembers = async (chatId) => {
    const data = await axios.get(
      `${server}/api/v1/chats/${chatId}?populate=true`,
      {
        withCredentials: true,
      }
    );
    setUsers(data.data.chat.members);
  };

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    grpMembers(chatId);
    return () => window.removeEventListener("resize", handleResize);
  }, [chatId]);

  const toggleAddMember = () => setAddMember((prev) => !prev);

  const addMemberToGroup = async (user) => {
    const queryParams = new URLSearchParams(location.search);
    let chatId = queryParams.get("group");
    if(!chatId){
      const segments = location.pathname.split("/");
    chatId = segments[segments.length - 1];
    }
    try {
      const data = await axios.put(
        `${server}/api/v1/chats/addmembers`,
        {
          chatId: chatId,
          members: [user],
        },
        { withCredentials: true }
      );
      toast.success(`${data?.data?.allUsersName} added to grp` || "User added");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "User can not added");
    }
  };

  const removeMemberFromGroup = async (user) => {
    const queryParams = new URLSearchParams(location.search);
    let chatId = queryParams.get("group");
    if(!chatId){
      const segments = location.pathname.split("/");
    chatId = segments[segments.length - 1];
    }
    try {
      const data = await axios.put(
        `${server}/api/v1/chats/removemembers`,
        {
          chatId: chatId,
          userId: user,
        },
        { withCredentials: true }
      );
      toast.success(data?.message || "User removed");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "User not removed");
    }
  };

  const deleteGroup = async () => {
    try {
      await axios.delete(`${server}/api/v1/chats/${groupName._id}`, {
        withCredentials: true,
      });
      toast.success("Group Deleted Successfully.");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Can not delete");
    }
    setShowDeletePopup(false);
  };

  const [grpName, setGrpName] = useState(groupName?.name.toString());
  // console.log(groupName);
  const [grpBio, setGrpBio] = useState(groupName?.bio);
  const [editName, setEditName] = useState(false);
  const toggleEditName = () => setEditName((prev) => !prev);
  const saveHandler = async () => {
    try {
      toggleEditName();
      await axios.put(
        `${server}/api/v1/chats/${chatId}?name=${encodeURIComponent(
          grpName
        )}&bio=${encodeURIComponent(grpBio)}`,
        {}, // Empty object for PUT body
        { withCredentials: true }
      );

      toast.success("Group details updated.");
    } catch (error) {
      console.error("Error updating group:", error);
      toast.error("Cann't update details.");
    }
  };

  const notInGrpUsers = allUsers?.filter((user) =>
    users.every((currUser) => user._id !== currUser._id)
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      style={{ height: viewportHeight }}
    >
      <div className="bg-white rounded-lg shadow-xl max-h-[91%] max-w-4xl w-full mx-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 max-md:py-3 py-4">
          <h3 className="text-lg font-semibold text-gray-800">Group Details</h3>
          <button
            className="text-red-500 hover:text-white max-md:w-9 max-md:h-9 w-12 h-12 hover:bg-red-500 bg-red-100 border border-red-300 rounded-full p-2 max-md:p-[0.3rem] transition"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-6 max-md:gap-3 px-6 py-4 max-md:py-3 max-md:grid-cols-1 overflow-hidden flex-grow">
          {/* Left Section */}
          <div className="bg-gray-200 p-6 max-md:p-3 relative rounded-lg shadow flex flex-col items-center space-y-4 max-md:space-y-2 max-sm:space-y-1">
            <img
              src={groupName?.avatar?.[0] || avatarUrl?.[0]}
              alt="Group Avatar"
              className="w-32 h-32 max-sm:h-24 max-sm:w-24 rounded-full object-cover border border-[#274878]"
            />
            <MdOutlineDeleteOutline
              className="absolute top-3 w-8 h-8 border border-red-400 rounded p-1 right-6 text-red-500 bg-red-100 hover:bg-red-200 cursor-pointer"
              onClick={() => setShowDeletePopup(true)}
            />
            <h1 className="text-xl font-semibold text-gray-800">{grpName}</h1>
            <p className="text-sm text-gray-600 flex items-center space-x-1">
              <span>Group &nbsp;</span>•{" "}
              <span>{groupName?.members?.length || 0} Members</span>
            </p>
            <p className="text-center text-gray-500">{grpBio}</p>
            {!editName ? (
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-800 transition"
                onClick={toggleEditName}
              >
                Change Group Details
              </button>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-800 transition"
                onClick={saveHandler}
              >
                Save Changes
              </button>
            )}
            {editName && (
              <div className="m-4 gap-y-3 flex flex-col relative">
                <label
                  htmlFor="grpName"
                  className="absolute left-4 top-0 transform rounded-lg bg-gradient-to-b from-gray-100 to-white px-1 -translate-y-1/2 text-sm text-gray-500 transition-all duration-200 ease-in-out"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  name="grpName"
                  id="grpName"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base text-gray-700 placeholder-transparent focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Group Name"
                  value={grpName}
                  onChange={(e) => setGrpName(e.target.value)}
                />
                <label
                  htmlFor="grpName"
                  className="absolute left-4 top-[3.5rem] transform rounded-lg bg-gradient-to-b from-gray-100 to-white px-1 -translate-y-1/2 text-sm text-gray-500 transition-all duration-200 ease-in-out"
                >
                  Group Bio
                </label>
                <input
                  type="text"
                  name="grpName"
                  id="grpName"
                  value={grpBio}
                  onChange={(e) => setGrpBio(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base text-gray-700 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Group Bio"
                />
              </div>
            )}
            {addMember ? (
              <button
                className="mt-4 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
                onClick={toggleAddMember}
              >
                View Members
              </button>
            ) : (
              <button
                className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                onClick={toggleAddMember}
              >
                Add Member
              </button>
            )}
            <p className="max-md:hidden absolute bottom-3 right-6 text-sm italic text-indigo-500 opacity-30 tracking-wide">
              Anubhav Mishra
            </p>
          </div>

          {/* Right Section: list of users */}
          <div
            className={`bg-gray-200 p-6 max-md:p-3 rounded-lg shadow flex flex-col overflow-hidden border-2 ${
              !addMember ? "border-green-500" : "border-blue-500"
            }`}
          >
            <div
              className={`font-semibold text-center py-2 rounded-t-lg ${
                !addMember
                  ? "bg-green-700 text-white"
                  : "bg-blue-700 text-white"
              }`}
            >
              {addMember ? "All Users" : "Group Members"}
            </div>
            <div className="overflow-y-auto flex-grow space-y-4 max-md:space-y-2 max-md:mt-0 mt-2">
              {(addMember ? notInGrpUsers : users)?.map((user) => (
                <UserItem
                  user={user}
                  key={user._id}
                  handler={addMemberToGroup}
                  handler2={removeMemberFromGroup}
                  handlerIsLoading={false}
                  isAdded={!addMember}
                  admin={user?._id === admin}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96 max-md:w-[90%] text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Do you want to delete this group?
            </h3>
            <div className="flex justify-around mt-4">
              <button
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={deleteGroup}
              >
                Yes
              </button>
              <button
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setShowDeletePopup(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditGroup;

//setShowDeletePopup(false)
//deleteGroup
