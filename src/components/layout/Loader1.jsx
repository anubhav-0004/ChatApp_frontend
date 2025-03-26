import React from "react";

const Loader1 = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-black">
      <style>
        {`
          @keyframes spin-reverse {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }

          @keyframes zoom {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.45); }
          }

          .smooth-zoom {
            animation: zoom 2s ease-in-out infinite;
            animation-fill-mode: both;
          }
        `}
      </style>

      <div className="relative flex justify-center items-center smooth-zoom">
        <div className="w-24 h-24 border-[8px] border-transparent border-t-gray-300 border-b-gray-500 rounded-full animate-spin"></div>
        <div
          className="absolute w-16 h-16 border-[8px] border-transparent border-t-gray-500 border-b-gray-300 rounded-full"
          style={{ animation: "spin-reverse 1.5s linear infinite" }}
        ></div>
        <div className="absolute w-8 h-8 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader1;
