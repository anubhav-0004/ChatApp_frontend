import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [isAdmin, setIsAdmin] = useState(false);
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }

  const submitHander = (e) => {
    e.preventDefault();
    const adminPass = document.getElementById("adminPass").value;
    if (adminPass === "Anubhav-0004") {
      console.log("Admin Logged In");
      setIsAdmin(true);
    } else {
      console.log("Wrong Password");
    }
  };
  return (
    <div
      className="m-auto p-1 flex flex-col justify-center items-center h-screen relative"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, rgb(203 186 243 / 49%), rgb(60 41 240 / 50%))",
      }}
    >
      <div className="border-2 flex flex-col shadow-lg shadow-[#25707d] gap-y-4 border-slate-300 rounded-lg max-md:px-5 max-md:py-10 max-md:gap-y-2 max-md:mx-4 px-10 py-16 bg-[#25707d]">
        <IoChevronBack 
          className="text-slate-100 font-bold text-3xl p-1 bg-[#174b2cc7] border rounded-[50%] cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1 className="text-3xl font-medium mb-3 bg-gradient-to-r from-[#e1a358] via-[#e7e6e6] to-[#45fa1c] bg-clip-text text-transparent">
          Welcome Back ANUBHAV...
        </h1>
        <input
          type={showPassword ? "text" : "password"}
          name="adminPass"
          id="adminPass"
          placeholder="Enter Admin Password"
          className="flex px-4 w-full h-fit py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 outline-none shadow-sm"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="px-1 rounded-[50%] py-1 text-sm absolute max-md:top-[29rem] max-md:scale-125 max-md:right-[3.5rem] top-[24rem] font-semibold right-[37rem] mx-auto bg-opacity-35 text-slate-700 transition duration-300 focus:outline-none focus:ring focus:ring-blue-200"
        >
          {showPassword ? <FaRegEye /> : <FaEyeSlash />}
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 mx-auto hover:bg-blue-400 hover:delay-150 py-1 rounded-md text-white border-2 border-blue-400"
          onClick={submitHander}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
