import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import "./global.css";
import profilePic from "./profile.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useApiHelper } from "./apiHelper";
import { SING_OUT_URL } from "../URLS";
import { userAction } from "../store/userSlice";
import { resetStore } from "../store/actions";
import NavComponent from "./NavComponent";
import NavDropComponent from "./NavDropComponent";

const NavigationBar = () => {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.user.user;
  });
  const handleSignOut = async () => {
    handleApiCall(
      "GET",
      SING_OUT_URL,
      {},
      (data) => {
        // dispatch(userAction.removeUser());
        dispatch(resetStore());
        navigate("/");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary my-nav">
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"}>
            Task Master
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavComponent user={user} />
            </Nav>
            <NavDropComponent handleSignOut={handleSignOut} user={user} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavigationBar;
