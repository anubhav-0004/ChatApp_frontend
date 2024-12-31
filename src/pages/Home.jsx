import React from "react";
import AppLayout from "../components/layout/AppLayout";

const Home = () => {
  return (
    <div className="bg-[#8282c1] w-full h-full text-xl opacity-95 p-2 overflow-y-auto flex flex-col items-center justify-center">
      <p className="text-center border-b text-2xl font-semibold bg-gradient-to-r from-[#f9a04c] via-white to-[#27f527] bg-clip-text text-transparent animate-bounce">
        Welcome to Sandesh App
      </p>
      <p>Pick a friend to chat with</p>
    </div>
  );
};

export default AppLayout(Home);
