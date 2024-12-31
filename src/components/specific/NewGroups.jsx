import React, { useState } from "react";
import { sampleUser } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const NewGroups = ({ onClose }) => {
  const [members, setMembers] = useState(sampleUser);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [groupName, setGroupName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    //closeHandeler
    if (onClose) {
      onClose();
    }
  };

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => 
      prev.includes(id)
        ? prev.filter((currenMember) => currenMember !== id)
        : [...prev, id]
    );
    // setMembers(prev => prev.filter((member) => member._id !== id));
  };

  const changeGroupName = (e) => {
    setGroupName(e.target.value);
    setErrorMessage("");
  };

  const validateGroupName = () => {
    if (groupName.length < 5) {
      setErrorMessage("Group name must be at least 5 characters long.");
      return false;
    }
    if (!/[A-Z]/.test(groupName)) {
      setErrorMessage("Group name must contain at least one uppercase letter.");
      return false;
    }
    return true;
  };

  const handleCreateGroup = () => {
    if (validateGroupName()) {
      console.log("Group created:", groupName);
      handleClose();
    }
  };

  return (
    <div
      className="absolute inset-0 h-screen flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-md:w-[85%] h-[75%] flex flex-col">
        <div className="flex justify-between items-center border-b p-4">
          <h3 id="search-dialog-title" className="text-lg font-semibold">
            New Group 
          </h3>
          <button
            className="text-gray-500 hover:text-gray-800 bg-red-100 border border-red-200 hover:bg-red-400 delay-100 px-2 py-[2px] rounded-sm"
            onClick={handleClose}
            aria-label="Close Search Modal"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex flex-col">
          <input
            value={groupName}
            type="text"
            className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New Group Name"
            onChange={changeGroupName}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>

        <h3 className="font-medium w-[86%] mx-auto border-b-2">Members</h3>

        <div className="px-4 py-2 overflow-y-auto">
          {members.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </div>
        <div className="flex-col flex-grow"></div>

        <div className="flex justify-end space-x-2 border-t p-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleCreateGroup}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGroups;
