import React from "react";
import PropTypes from "prop-types";
import { Button, Container } from "react-bootstrap";

const HeroSection = (props) => {
  return (
    <section className="hero text-white text-center">
      <Container className="hero-content">
        <h1>Manage Tasks Like a Pro</h1>
        <p>
          Streamline your workflow, boost productivity, and collaborate
          seamlessly with your team.
        </p>
        <div className="hero-buttons">
          <Button className="btn-white btn-large">Start Free Trial</Button>
        </div>
      </Container>

      <div className="dashboard-preview">
        <div className="dashboard-mockup">
          <div className="mockup-header">
            <span className="dot bg-danger"></span>
            <span className="dot bg-warning"></span>
            <span className="dot bg-success"></span>
          </div>
          <div className="mockup-content">
            📊 Dashboard Preview - Tasks, Projects & Analytics
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
