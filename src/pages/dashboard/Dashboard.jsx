import React from "react";
import { Outlet } from "react-router-dom";
import "./dashboard.css";
import SideBar from "../../global/SideBar";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <SideBar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
