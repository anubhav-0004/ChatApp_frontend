import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import UserItem from "../shared/UserItem";
import { sampleUser } from "../../constants/sampleData";
import { useLazySearchUserQuery } from "../../redux/api/reduxAPI";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";

const Search = ({ onClose }) => {
  const [searchUser] = useLazySearchUserQuery();
  const [searchValue, setSearchValue] = useState("");

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const addFriendHandler = async (id) => {
    console.log("Send Friend Request", id);
    try {
      const data = axios.put(
        `${server}/api/v1/user/send-request`,
        {
          userId: id,
        },
        { withCredentials: true }
      );
      toast.success(data?.message || "Request sent 😊");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Request failed");
    }
  };

  const deleteRequest = async (id) => {
    try {
      console.log(id);
      const data = axios.delete(`${server}/api/v1/user/delete-request`, {
        withCredentials: true,
        data: {
          userId: id,
        },
      });
      console.log("data", data);
      toast.success(data?.message || "Request deleted.");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Unable to delete request");
    }
  };

  let isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const timeGap = setTimeout(() => {
      searchUser(searchValue)
        .then(({ data }) => setUsers(data?.users))
        .catch((e) => console.log(e));
    }, 500);
    return () => {
      clearTimeout(timeGap);
    };
  }, [searchValue]);
  console.log(users);
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
            name="search"
            id="search"
            onChange={handleSearchChange}
            value={searchValue}
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
              handler2={deleteRequest}
              handlerIsLoading={isLoadingSendFriendRequest}
              isAdded={user.isfriend}
            />
          ))}
        </div>
        <div className="flex-col flex-grow"></div>
      </div>
    </div>
  );
};

export default Search;
