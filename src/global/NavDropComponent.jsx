import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import profilePic from "./profile.jpg";
import { navbarMapDropDown } from "./helperFunction";
import { Link } from "react-router-dom";
const NavDropComponent = ({ user, handleSignOut }) => {
  {
    if (user) {
      return (
        <NavDropdown
          className="nav-profile d-flex"
          title={
            <img
              src={profilePic}
              alt="Profile"
              style={{ width: "40px", borderRadius: "50%" }}
            />
          }
          id="basic-nav-dropdown"
          align="end"
        >
          {navbarMapDropDown
            .filter((item) => !item.protected || user)
            .map((item) => (
              <NavDropdown.Item
                as={item.action ? "span" : Link}
                to={item.action ? undefined : item.link}
                key={item.link}
                onClick={item.action ? () => handleSignOut() : undefined}
                style={item.action ? { cursor: "pointer" } : {}}
              >
                {item.lable}
              </NavDropdown.Item>
            ))}
        </NavDropdown>
      );
    } else {
      return (
        <Nav navbarScroll>
          <Nav.Link
            className="my-nav-link nav-profile"
            as={Link}
            to="/auth/login"
            variant="outline-success"
          >
            Sign In
          </Nav.Link>
        </Nav>
      );
    }
  }
};

export default NavDropComponent;
