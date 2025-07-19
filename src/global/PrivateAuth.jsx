import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";

const PrivateAuth = () => {
  const user = useSelector((state) => {
    return state.user.user;
  });
  if (!user) {
    return <Navigate to="/auth/signin" />;
  } else {
    return user ? <Outlet /> : <Navigate to="*" />;
  }
};

export default PrivateAuth;
