import React from "react";
import PropTypes from "prop-types";

const HowItWorksSection = (props) => {
  return (
    <section class="how-it-works" id="how-it-works">
      <div class="container">
        <div class="section-header">
          <h2>How It Works</h2>
          <p>Get started in minutes with our intuitive workflow.</p>
        </div>

        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Create Your Workspace</h3>
            <p>
              Set up your account and create projects tailored to your team's
              needs.
            </p>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <h3>Add Tasks & Assign</h3>
            <p>
              Break down your projects into manageable tasks and assign them to
              team members.
            </p>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <h3>Track Progress</h3>
            <p>
              Monitor completion status, collaborate in real-time, and stay on
              schedule.
            </p>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <h3>Analyze & Improve</h3>
            <p>
              Review performance metrics and optimize your workflow for better
              results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

HowItWorksSection.propTypes = {};

export default HowItWorksSection;
