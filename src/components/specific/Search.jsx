import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import UserItem from "../shared/UserItem";
import { useLazySearchUserQuery } from "../../redux/api/reduxAPI";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Search = ({ onClose }) => {
  const [searchUser] = useLazySearchUserQuery();
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const currUser = useSelector((state) => state.auth.user);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const fetchUsers = async () => {
    setIsUsersLoading(true);
    try {
      const { data } = await searchUser(searchValue);
      const filteredUsers = data?.users?.filter(
        (user) => user._id !== currUser._id
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUsersLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const addFriendHandler = async (id) => {
    try {
      const data = await axios.put(
        `${server}/api/v1/user/send-request`,
        {
          userId: id,
        },
        { withCredentials: true }
      );
      await fetchUsers();
      toast.success("Request sent 😊");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Request failed");
    }
  };

  const deleteRequest = async (id) => {
    try {
      const data = await axios.put(
        `${server}/api/v1/user/accept-request`,
        {
          id: id,
          accept: false,
          requestId: "123", //you can send request id also but not mendatory as id is passed,
        },
        { withCredentials: true }
      );
      await fetchUsers();
      toast.success(data?.response?.data?.message || "Request deleted.");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Unable to delete request");
    }
  };

  let isLoadingSendFriendRequest = false;

  useEffect(() => {
    const timeGap = setTimeout(() => {
      try {
        fetchUsers();
      } catch (error) {
        console.log(error);
      }
    }, 500);
    return () => {
      clearTimeout(timeGap);
    };
  }, [searchValue]);
  // console.log(users);
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
          {isUsersLoading ? (
            <div className="text-center py-4 text-gray-600">
              Users are loading...
            </div>
          ) : users.length > 0 ? (
            users.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={addFriendHandler}
                handler2={deleteRequest}
                handlerIsLoading={isLoadingSendFriendRequest}
                isAdded={user.isfriend}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <div className="flex items-center gap-x-3 w-[93%] rounded py-2 bg-gray-100 mx-auto px-3 border border-gray-400 text-gray-600">
                No more Friends to add
              </div>
            </div>
          )}
        </div>

        <div className="flex-col flex-grow"></div>
      </div>
    </div>
  );
};

export default Search;
