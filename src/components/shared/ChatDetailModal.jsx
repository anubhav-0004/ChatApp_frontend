import React from "react";
import { BsX } from "react-icons/bs";
import DeleteChatModal from "./DeleteChatModal";

const ChatDetailModal = ({
  deleteChatHandler = () => {},
  closeModal = () => {},
  selectedChatDetails = {},
  setShowModal,
  showModal,
}) => {

  const resetDeleteModal = () => {
    setShowModal(false);
  };

  const setDeleteModal = ()=>{
    setShowModal(true);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gradient-to-br from-[#496085] to-[#2656a3] text-white rounded-lg p-8 w-[90%] max-w-md shadow-2xl relative border border-gray-700">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-300 hover:text-gray-100 transition"
        >
          <BsX size={32} />
        </button>

        <div className="text-center">
          <img
            src={selectedChatDetails?.avatar?.url}
            alt="User Avatar"
            className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-[#caa6e9] shadow-lg object-cover"
          />

          <h2 className="text-3xl font-bold mb-2">
            {selectedChatDetails?.name || "User Name"}
          </h2>

          <p className="text-lg text-gray-300 mb-4">
            {selectedChatDetails?.bio || "No bio available"}
          </p>

          <div className="flex flex-col items-center text-sm space-y-2">
            <p className="flex items-start gap-2">
              <span className="font-medium">📧 Email:</span>
              <span className="text-gray-400">
                {selectedChatDetails?.email || "N/A"}
              </span>
            </p>

            <p className="flex items-start gap-2">
              <span className="font-medium">👤 Username:</span>
              <span className="text-gray-400">
                @{selectedChatDetails?.username || "N/A"}
              </span>
            </p>

            <p className="flex items-start gap-2">
              <span className="font-medium">📅 Joined:</span>
              <span className="text-gray-400">
                {new Date(selectedChatDetails?.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                ) || "N/A"}
              </span>
            </p>
          </div>

          <button
            onClick={setDeleteModal}
            className="px-5 py-2 bg-red-600 mt-5 hover:bg-red-500 transition rounded-lg text-white font-medium shadow-md"
          >
            Delete Chat
          </button>
        </div>
      </div>
      {showModal && (
        <DeleteChatModal
          handleDeleteChatFun={deleteChatHandler}
          setShowModal={resetDeleteModal}
        />
      )}
    </div>
  );
};

export default ChatDetailModal;
