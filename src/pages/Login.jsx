import React, { useState } from "react";
import StyledPic from "../components/styles/StyledPic";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const handleSignUp = (e) => {
    e.preventDefault();
  };
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="m-auto p-1 flex flex-col justify-center items-center h-screen"
      style={{
        backgroundImage:
          "linear-gradient( to bottom right, rgb(227 227 227 / 57%), rgb(70 51 255 / 50%))",
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
              {/* <label htmlFor="username">UserName</label> */}
              <input
                type="text"
                name="username"
                id="username"
                placeholder="UserName*"
                required
                className="px-3 py-2 border border-slate-300 rounded-md mb-5"
              />
              <br />
              {/* <label htmlFor="password">Password</label> */}
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password*"
                required
                className="px-3 py-2 border border-slate-300 rounded-md"
              />
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
              Sign Up{" "}
            </button>
          </form>
        </div>
      ) : (
        <div className=" w-4/12 max-lg:w-3/4 bg-slate-100 border-2 flex flex-col gap-y-3 shadow-sm shadow-black border-slate-300 rounded-lg px-10 py-6 max-md:px-5 max-md:py-7">
          <h5 className="font-bold text-2xl text-slate-700 w-fit mx-auto">
            Register
          </h5>
          <form
            action="submit"
            className="flex flex-col gap-y-1 w-full"
            onSubmit={handleSignUp}
          >
            <div>
              <StyledPic />
              <label htmlFor="name">Name</label>
              <span className="text-red-500 font-bold">*</span>
              <br />
              <input
                type="text"
                name="name"
                id="name"
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
              <input
                type="password"
                name="password"
                id="password"
                required
                className="px-2 py-1 border border-slate-300 rounded-md mb-1 w-full"
              />
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
                className="px-2 py-1 border border-slate-300 rounded-md mb-1 w-full"
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
              className="w-full py-1 rounded-md mx-auto hover:delay-100 hover:bg-slate-200"
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
