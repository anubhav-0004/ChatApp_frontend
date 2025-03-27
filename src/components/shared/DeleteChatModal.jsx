import React from 'react'

const DeleteChatModal = ({handleDeleteChatFun, setShowModal}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg w-96 max-md:w-[90%] text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Do you want to delete this chat?
      </h3>
      <div className="flex justify-around mt-4">
        <button
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          onClick={handleDeleteChatFun}
        >
          Yes
        </button>
        <button
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          onClick={() => setShowModal(false)}
        >
          No
        </button>
      </div>
    </div>
  </div>
  )
}

export default DeleteChatModal
