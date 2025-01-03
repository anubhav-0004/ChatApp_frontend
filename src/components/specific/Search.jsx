import React, {useState} from "react";
import { FiSearch } from "react-icons/fi";
import UserItem from "../shared/UserItem";
import { sampleUser } from "../../constants/sampleData";

const Search = ({ onClose }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const addFriendHandler = (id)=>{
    console.log('Send Friend Request', id);
  }
  let isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState(sampleUser);
  return (
    <div
      className="absolute inset-0 h-[100vh] flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
    >
      <div className="bg-white rounded-lg max-h-[80%] shadow-lg max-w-md max-md:max-w-[90%] w-full">
        <div className="flex justify-between items-center border-b p-4">
          <h3 id="search-dialog-title" className="text-lg font-semibold">
            Find People
          </h3>
          <button
            className="text-gray-500 hover:text-gray-800 bg-red-100 border border-red-300 hover:bg-red-400 delay-100 px-2 py-[2px] rounded-md"
            onClick={handleClose}
            aria-label="Close Search Modal"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex relative">
          <FiSearch className="absolute top-7 left-6" />
          <input
            type="text"
            className="w-full py-2 px-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search here..."
          />
        </div>
        <div className="px-4 h-[20rem] overflow-y-auto">
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </div>
        <div className="flex-col flex-grow"></div>
      </div>
    </div>
  );
};

export default Search;
