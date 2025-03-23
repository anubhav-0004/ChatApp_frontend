import React, { useState } from "react";
import StyledPic from "../components/styles/StyledPic";
import { FaRegEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExists, userNotExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);


  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!avatar) {
        toast.error("Please upload an avatar.");
        return;
    }
    // Sign-up logic here
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", name1.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    formData.append("phone", mobile.value);

    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(userExists(true));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Login logic here
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      toast.success(data?.message || "Logged In");
      dispatch(userExists(true));
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="m-auto p-1 flex flex-col justify-center items-center h-auto min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, rgb(203 186 243 / 49%), rgb(60 41 240 / 50%))",
      }}
    >
      {isLogin ? (
        <div className="w-fit bg-slate-100 border-2 flex flex-col gap-y-5 border-slate-300 rounded-lg px-10 py-10">
          <h5 className="font-bold text-2xl text-slate-700 w-fit mx-auto">
            Login
          </h5>
          <form
            action="submit"
            className="flex flex-col gap-y-3"
            onSubmit={handleLogin}
          >
            <div>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="UserName*"
                required
                className="px-3 py-2 border border-slate-300 rounded-md mb-5 w-full"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password*"
                  required
                  className="px-3 py-2 border border-slate-300 rounded-md w-full"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute top-3 right-3 cursor-pointer text-gray-500"
                >
                  {!showPassword ? <FaEyeSlash /> : <FaRegEye />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 mx-auto mt-4 hover:bg-blue-400 hover:delay-150 py-1 rounded-md text-white"
            >
              Login
            </button>
            <p className="text-xs mx-auto">OR</p>
            <button
              onClick={() => setIsLogin(false)}
              className="w-full py-1 rounded-md mx-auto hover:delay-100 hover:bg-slate-200"
            >
              Sign Up
            </button>
          </form>
        </div>
      ) : (
        <div className="w-4/12 max-lg:w-3/4 bg-slate-100 border-2 flex flex-col gap-y-3 max-md:gap-y-1 shadow-sm shadow-black border-slate-300 rounded-lg px-10 max-md:py-5 py-6 max-md:px-5">
          <h5 className="font-bold text-2xl text-slate-700 w-fit mx-auto">
            Register
          </h5>
          <form
            action="submit"
            className="flex flex-col gap-y-1 w-full"
            onSubmit={handleSignUp}
            encType="multipart/form-data"
          >
            <div>
              <StyledPic setAvatar={setAvatar}/>
              <label htmlFor="name1">Name</label>
              <span className="text-red-500 font-bold">*</span>
              <br />
              <input
                type="text"
                name="name1"
                id="name1"
                required
                className="px-2 py-1 border border-slate-300 rounded-md mb-1 w-full"
              />
              <br />
              <label htmlFor="bio">Bio</label>
              <span className="text-red-500 font-bold">*</span>
              <br />
              <input
                type="text"
                name="bio"
                id="bio"
                required
                className="px-2 py-1 border border-slate-300 rounded-md mb-1 w-full"
              />
              <br />
              <label htmlFor="username">UserName</label>
              <span className="text-red-500 font-bold">*</span>
              <br />
              <input
                type="text"
                name="username"
                id="username"
                required
                className="px-2 py-1 border border-slate-300 rounded-md mb-1 w-full"
              />
              <br />
              <label htmlFor="password">Password</label>
              <span className="text-red-500 font-bold">*</span>
              <br />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  className="px-2 py-1 border border-slate-300 rounded-md mb-1 w-full"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute top-2 right-3 cursor-pointer text-gray-500"
                >
                  {!showPassword ? <FaEyeSlash /> : <FaRegEye />}
                </div>
              </div>
              <br />
              <label htmlFor="mobile">Phone</label>
              <span className="text-red-500 font-bold">*</span>
              <br />
              <input
                type="tel"
                name="mobile"
                id="mobile"
                className="px-2 py-1 border border-slate-300 rounded-md mb-1 w-full"
                required
              />
              <br />
              <label htmlFor="mail">E-mail</label>
              <span className="text-red-500 font-bold">*</span>
              <br />
              <input
                type="email"
                name="mail"
                id="mail"
                className="px-2 py-1 border border-slate-300 rounded-md mb-1 max-md:mb-0 w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 mx-auto mt-4 hover:bg-blue-400 hover:delay-150 py-1 rounded-md text-white"
            >
              Sign Up
            </button>
            <p className="text-xs mx-auto">OR</p>
            <button
              onClick={() => setIsLogin(true)}
              className="w-full py-1 rounded-md mx-auto max-md:mb-1 hover:delay-100 hover:bg-slate-200"
            >
              Login Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
