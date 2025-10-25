import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import NavigationBar from "./global/NavigationBar";
import PrivateAuth from "./global/PrivateAuth";
import MyProfile from "./pages/myProfile/MyProfile";
import { useApiHelper } from "./global/apiHelper";
import { useDispatch } from "react-redux";
import { userAction } from "./store/userSlice";
import { GET_USER_URL } from "./URLS";
import BeautifulLoadingComponent from "./global/BeautifulLoadingComponent";
import HomePage from "./pages/homePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateTask from "./pages/tasks/CreateTask";
import DashboardLayout from "./pages/dashboard/Dashboard";
import UserTasks from "./pages/userTasks/UserTasks";

function App() {
  const { handleApiCall } = useApiHelper();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  console.log("in app");
  const getUser = async () => {
    await handleApiCall(
      "GET",
      GET_USER_URL,
      {},
      (data) => {
        dispatch(userAction.setUser(data.user));
        navigate("/");
      },
      (error) => {
        console.log(error);
        dispatch(userAction.removeUser());
        navigate("/auth/login");
      }
    );
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<PrivateAuth />}>
            <Route path="/MyProfile" element={<MyProfile />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* <Route path="dashboard" element={<Dashboard />} /> */}
              <Route path="tasks" element={<CreateTask />} />
              <Route path="userTask" element={<UserTasks />} />
              {/*
              <Route path="team" element={<Team />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} /> */}
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <BeautifulLoadingComponent />
      </AnimatePresence>
    </>
  );
}

export default App;
