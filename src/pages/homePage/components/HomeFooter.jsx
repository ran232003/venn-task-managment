import React from "react";
import PropTypes from "prop-types";

const HomeFooter = (props) => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Product</h3>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Integrations</a>
            <a href="#">API</a>
          </div>

          <div class="footer-section">
            <h3>Company</h3>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>

          <div class="footer-section">
            <h3>Support</h3>
            <a href="#">Help Center</a>
            <a href="#">Documentation</a>
            <a href="#">Community</a>
            <a href="#">Status</a>
          </div>

          <div class="footer-section">
            <h3>Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security</a>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2025 TaskFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
