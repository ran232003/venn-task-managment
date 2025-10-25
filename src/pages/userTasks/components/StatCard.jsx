import React from "react";
import PropTypes from "prop-types";

const StatCard = ({ icon, iconClass, count, label }) => (
  <div className="stat-card">
    <div className={`stat-icon ${iconClass}`}>{icon}</div>
    <div className="stat-content">
      <h3>{count}</h3>
      <p>{label}</p>
    </div>
  </div>
);

export default StatCard;
