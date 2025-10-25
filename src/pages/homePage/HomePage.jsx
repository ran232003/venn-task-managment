import React from "react";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import "./HomePage.css";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FeaturesSection from "./components/FeaturesSection";
import { Link } from "react-router-dom";
import HomeFooter from "./components/HomeFooter";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      {/* <!-- Features Section --> */}
      <FeaturesSection />

      {/* <!-- How It Works --> */}
      <HowItWorksSection />

      {/* <!-- CTA Section --> */}
      <section class="cta">
        <div class="container">
          <h2>Ready to Get Organized?</h2>
          <p>
            Join thousands of teams who trust TaskFlow to manage their projects
            and boost productivity.
          </p>
          <Link to={"/"} class="btn btn-primary btn-large">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <HomeFooter />

      {/* Add other sections below (Features, How It Works, CTA, Footer) as additional JSX blocks */}
    </>
  );
};

export default HomePage;
