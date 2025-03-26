import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import Loader1 from "./components/layout/Loader1";
import { Toaster } from "react-hot-toast";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Groups = lazy(() => import("./pages/Groups"));
const Chat = lazy(() => import("./pages/Chat"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashBoard = lazy(() => import("./pages/admin/DashBoard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));

const App = () => {

  const {user, loader} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
    .get(`${server}/api/v1/user/me`, { withCredentials: true })
    .then(({data}) => dispatch(userExists(data.user)))
    .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  return loader ? <Loader1/> : (
    <BrowserRouter>
      <Suspense fallback={<Loader1 />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<AdminDashBoard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/chat" element={<ChatManagement />} />
            <Route path="/admin/message" element={<MessageManagement />} />
            <Route path="/group" element={<Groups />} />
            <Route path="/chat/:chatId" element={<Chat />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center"/>
    </BrowserRouter>
  );
};

export default App;
