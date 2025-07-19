import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getInitValues, yupSchema } from "../global/helperFunction";
import "./Login.css";
import PageWrapper from "../global/PageWrapper";
import LoginForm from "./components/LoginForm";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useApiHelper } from "../global/apiHelper";
import { userAction } from "../store/userSlice";
import { AUTH_URL, AUTH_URL_PROVIDER } from "../URLS";
function Login(props) {
  const location = useLocation();
  const isSignup = location.pathname === "/auth/signup";
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let initialValues = getInitValues(location.pathname);
  const validationSchema = yupSchema(isSignup ? "signup" : "login");
  const handleSubmit = (values, provider) => {
    console.log(values, "values", provider, "provider");

    let url = `${AUTH_URL}${isSignup ? "signup" : "signin"}`;
    url =
      typeof provider === "string"
        ? AUTH_URL_PROVIDER
        : `${AUTH_URL}${isSignup ? "signup" : "signin"}`;
    handleApiCall(
      "POST",
      url,
      values,
      (data) => {
        dispatch(userAction.setUser(data.user));

        navigate("/");
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <PageWrapper>
      <div className="main-login">
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Row className="w-100">
            <Col xs={12} md={8} lg={6} className="mx-auto">
              <Card className="p-4 shadow-lg" style={{ maxWidth: "100%" }}>
                <h2 className="text-center">
                  {isSignup ? "Sign Up" : "Sign In"}
                </h2>
                <LoginForm
                  isSignup={isSignup}
                  handleSubmit={handleSubmit}
                  validationSchema={validationSchema}
                  initialValues={initialValues}
                />

                {/* Switch between Sign In and Sign Up */}
                <div className="text-center mt-3">
                  <p>
                    {isSignup
                      ? "Already have an account?"
                      : "Don't have an account?"}{" "}
                    <Link to={isSignup ? "/auth/login" : "/auth/signup"}>
                      {isSignup ? "Sign In" : "Sign Up"}
                    </Link>
                  </p>
                </div>
                <div className="text-center mt-3">
                  <p>
                    <Link to="/ForgotPassword">{"Forgot your password?"}</Link>
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </PageWrapper>
  );
}

export default Login;
