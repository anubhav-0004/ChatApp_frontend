import React from "react";
import Header from "../components/layout/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="bg-[#8282c1] w-full h-[calc(100vh-4rem)] text-xl opacity-95 overflow-y-auto flex flex-col items-center justify-center overflow-clip">
        <h1>404 Page Not Found</h1>
      </div>
    </>
  );
};

export default NotFound;
