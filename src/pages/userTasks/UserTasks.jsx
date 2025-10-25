import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { projectsData, statsData } from "../../global/helperFunction";
import "./UserTask.css";
import StatCard from "./components/StatCard";
import UserTaskHeader from "./components/UserTaskHeader";
import FilterUserTask from "./components/FilterUserTask";
import { GET_USER_TASKS } from "../../URLS";
import { useApiHelper } from "../../global/apiHelper";
import { useDispatch, useSelector } from "react-redux";
import { taskAction } from "../../store/taskSlice";

const UserTasks = (props) => {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => {
    return state.task;
  });

  console.log(tasks, "tasks");
  const getUserTasks = () => {
    handleApiCall(
      "GET",
      GET_USER_TASKS,
      {},
      (data) => {
        //console.log(data.users);
        dispatch(taskAction.setUserTasks(data.userTasks));
        dispatch(taskAction.setStatusCounts(data.statusCounts));
      },
      (error) => {
        console.log(error);
        //dispatch(userAction.removeUser());
      }
    );
  };
  useEffect(() => {
    getUserTasks();
  }, []);
  return (
    <main className="main-content">
      {/* Page Header */}
      <UserTaskHeader />

      {/* Stats Cards */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Controls Bar */}
      <div className="controls-bar">
        <FilterUserTask />
        <div className="view-toggle">
          <button className="view-btn active">📋 List</button>
          <button className="view-btn">🗓️ Calendar</button>
          <button className="view-btn">📊 Board</button>
        </div>
      </div>
    </main>
  );
};

export default UserTasks;
