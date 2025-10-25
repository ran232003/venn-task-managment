import React from "react";
import PropTypes from "prop-types";

const UserTaskHeader = (props) => {
  return (
    <div className="page-header">
      <h1 className="page-title">My Tasks</h1>
      <div className="header-actions">
        <button className="btn btn-primary">➕ New Task</button>
      </div>
    </div>
  );
};

UserTaskHeader.propTypes = {};

export default UserTaskHeader;
