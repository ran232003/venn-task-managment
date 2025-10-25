import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";

const PrivateAuth = () => {
  console.log("in PrivateAuth");
  const user = useSelector((state) => {
    return state.user.user;
  });

  if (!user) {
    return <Navigate to="/auth/login" />;
  } else {
    return user ? <Outlet /> : <Navigate to="*" />;
  }
};

export default PrivateAuth;
