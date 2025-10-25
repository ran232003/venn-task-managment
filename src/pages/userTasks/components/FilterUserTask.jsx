import React from "react";
import PropTypes from "prop-types";
import { projectsData } from "../../../global/helperFunction";

const FilterUserTask = (props) => {
  return (
    <div className="filters">
      <div className="filter-group">
        <label>Status:</label>
        <select className="filter-select">
          <option>All Tasks</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Priority:</label>
        <select className="filter-select">
          <option>Any Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Project:</label>
        <select className="filter-select">
          {projectsData.map((project, index) => (
            <option key={index}>{project}</option>
          ))}
        </select>
      </div>
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
        />
      </div>
    </div>
  );
};

FilterUserTask.propTypes = {};

export default FilterUserTask;
