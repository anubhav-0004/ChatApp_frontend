import React, { useEffect, useState } from "react";
import UserItem from "../shared/UserItem";
import { MdOutlineDeleteOutline } from "react-icons/md";

const EditGroup = ({ onClose, group, chatId, allUsers }) => {
  const handleClose = () => onClose && onClose();

  const groupName = group?.find((chat) => chat._id === chatId);
  const [users, setUsers] = useState(group);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [addMember, setAddMember] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleAddMember = () => setAddMember((prev) => !prev);

  const addMemberToGroup = (user) => {
    console.log("Add Member", user);
  };

  const removeMemberFromGroup = (user) => {
    console.log("Remove Member", user);
  };

  const deleteGroup = () => {
    console.log("Delete Group", groupName);
    setShowDeletePopup(false);
  };

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
          <div className="bg-gray-100 p-6 max-md:p-3 relative rounded-lg shadow flex flex-col items-center space-y-4 max-md:space-y-2">
            <img
              src={groupName?.avatar?.[0]}
              alt="Group Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
            <MdOutlineDeleteOutline
              className="absolute top-3 w-8 h-8 border border-red-400 rounded p-1 right-6 text-red-500 bg-red-100 hover:bg-red-200 cursor-pointer"
              onClick={() => setShowDeletePopup(true)}
            />
            <h1 className="text-xl font-semibold text-gray-800">
              {groupName?.name}
            </h1>
            <p className="text-sm text-gray-600 flex items-center space-x-1">
              <span>Group</span> •{" "}
              <span>{groupName?.members?.length} Members</span>
            </p>
            <p className="text-center text-gray-500">{groupName?.bio}</p>
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

          {/* Right Section */}
          <div
            className={`bg-gray-100 p-6 max-md:p-3 rounded-lg shadow flex flex-col overflow-hidden border-2 ${
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
              {(addMember ? allUsers : users).map((user) => (
                <UserItem
                  user={user}
                  key={user._id}
                  handler={addMember ? addMemberToGroup : removeMemberFromGroup}
                  handlerIsLoading={false}
                  isAdded={!addMember}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96 max-md:w-80 text-center">
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
