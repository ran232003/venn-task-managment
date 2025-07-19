import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
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

function App() {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const getUser = () => {
    handleApiCall(
      "GET",
      GET_USER_URL,
      {},
      (data) => {
        dispatch(userAction.setUser(data.user));

        // navigate("/");
      },
      (error) => {
        console.log(error);
        dispatch(userAction.removeUser());
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
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<PrivateAuth />}>
            <Route path="/MyProfile" element={<MyProfile />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
