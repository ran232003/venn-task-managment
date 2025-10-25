import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import "./global.css";
import { sidebarMenuItems } from "./helperFunction";
const SideBar = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log(path); // /dashboard/tasks
  return (
    <Sidebar
      style={{
        height: "100vh",
        position: "fixed",
        top: "94px", // below the navbar
        left: 0,
        zIndex: 100,
        // background:
        //   "linear-gradient(135deg,rgb(191, 192, 253),rgb(248, 248, 250))",
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active ? "#6366f1" : undefined,
              color: active ? "white" : "#000",
              borderRadius: active ? "5px" : undefined,
            };
          },
          icon: ({ active }) => ({
            color: active ? "white" : "#6366f1",
          }),
        }}
      >
        {sidebarMenuItems.map((item) => (
          <MenuItem
            key={item.path} // Use path as a unique key
            icon={<item.icon />}
            component={<Link to={item.path} />}
            active={path === item.path} // Determine active state dynamically
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
