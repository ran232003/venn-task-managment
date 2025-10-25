import React from "react";
import PropTypes from "prop-types";

const FeaturesSection = (props) => {
  return (
    <section class="features" id="features">
      <div class="container">
        <div class="section-header">
          <h2>Everything You Need to Stay Organized</h2>
          <p>
            Powerful features designed to help you and your team accomplish
            more, faster.
          </p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">✓</div>
            <h3>Smart Task Management</h3>
            <p>
              Create, assign, and track tasks with intelligent prioritization
              and deadline management.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h3>Team Collaboration</h3>
            <p>
              Work together seamlessly with real-time updates, comments, and
              file sharing.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Progress Analytics</h3>
            <p>
              Visualize your productivity with detailed reports and performance
              insights.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Mobile Ready</h3>
            <p>
              Access your tasks anywhere with our responsive design and mobile
              apps.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <h3>Integrations</h3>
            <p>
              Connect with your favorite tools like Slack, Google Drive, and
              more.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>
              Your data is protected with enterprise-grade security and privacy
              controls.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
