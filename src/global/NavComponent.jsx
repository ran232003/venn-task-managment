import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { navbarMap } from "./helperFunction";
import { Link } from "react-router-dom";
const NavComponent = ({ user }) => {
  return (
    <Nav
      className="me-auto my-2 my-lg-0"
      style={{ maxHeight: "100px" }}
      navbarScroll
    >
      {navbarMap
        .filter((item) => !item.protected || user)
        .map((item) => (
          <Nav.Link
            className="my-nav-link"
            as={Link}
            to={item.link}
            key={item.link}
          >
            {item.lable}
          </Nav.Link>
        ))}
    </Nav>
  );
};

export default NavComponent;
