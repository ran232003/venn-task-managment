import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import "./ForgotPassword.css"; // custom CSS for background and centering
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../../global/PageWrapper";
import { useApiHelper } from "../../global/apiHelper";
import { useDispatch } from "react-redux";
import { FORGOT_PASSWORD_URL } from "../../URLS";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = () => {
    handleApiCall(
      "POST",
      FORGOT_PASSWORD_URL,
      { email },
      (data) => {
        // dispatch(userAction.setUser(data.user));
        // navigate("/");
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <PageWrapper>
      <div className="forgot-password-wrapper">
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <Card
            className="p-4"
            style={{ width: "100%", maxWidth: "400px", background: "#ffffff" }}
          >
            <h4 className="text-center mb-4">Forgot Password</h4>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Button
                onClick={handleSubmit}
                className="w-100 mt-3"
                style={{ backgroundColor: "#764ba2", border: "none" }}
              >
                Send Reset Link
              </Button>

              <div className="text-center mt-3">
                <span className="text-muted">Remember your password? </span>
                <Link to="/auth/login">{" Back to login"}</Link>
              </div>
            </Form>
          </Card>
        </Container>
      </div>
    </PageWrapper>
  );
};

export default ForgotPassword;
