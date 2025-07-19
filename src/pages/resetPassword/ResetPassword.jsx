import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ForgotPassword.css";
import PageWrapper from "../../global/PageWrapper";
import { useApiHelper } from "../../global/apiHelper";
import { VERIFY_TOKEN_URL, RESET_PASSWORD_URL } from "../../URLS";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { handleApiCall } = useApiHelper();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Token missing from URL.");
      return;
    }

    handleApiCall(
      "POST",
      VERIFY_TOKEN_URL,
      { token },
      () => setVerified(true),
      () => setError("Token is invalid or expired.")
    );
  }, [token]);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setError("");
    handleApiCall(
      "POST",
      RESET_PASSWORD_URL,
      { token, newPassword: values.password },
      () => {
        setSuccess("Your password has been reset successfully.");
        setSubmitting(false);
      },
      () => {
        setError("Failed to reset password. Please try again.");
        setSubmitting(false);
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
            <h4 className="text-center mb-4">Reset Password</h4>

            {/* ✅ Case 1: Token or verification error */}
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}

            {/* ✅ Case 2: Show success message */}
            {success && (
              <Alert variant="success" className="text-center">
                {success}
              </Alert>
            )}

            {/* ✅ Case 3: Token verification loading */}
            {!verified && !error && !success && (
              <div className="text-center">
                <Spinner animation="border" />
                <p className="mt-3">Verifying token...</p>
              </div>
            )}

            {/* ✅ Case 4: Show form after successful verification */}
            {verified && !success && (
              <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <FormikForm>
                    <Form.Group controlId="formPassword" className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="password" />
                      </div>
                    </Form.Group>

                    <Form.Group
                      controlId="formConfirmPassword"
                      className="mb-3"
                    >
                      <Form.Label>Confirm Password</Form.Label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="confirmPassword" />
                      </div>
                    </Form.Group>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-100"
                      style={{ backgroundColor: "#764ba2", border: "none" }}
                    >
                      {isSubmitting ? "Resetting..." : "Reset Password"}
                    </Button>

                    <div className="text-center mt-3">
                      <span className="text-muted">Back to </span>
                      <Link to="/auth/login">login</Link>
                    </div>
                  </FormikForm>
                )}
              </Formik>
            )}
          </Card>
        </Container>
      </div>
    </PageWrapper>
  );
};

export default ResetPassword;
