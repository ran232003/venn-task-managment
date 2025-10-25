import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { authFormArray } from "../../global/helperFunction";
import GenericInput from "../../global/GenericInput";
import { auth, provider, signInWithPopup } from "../../global/firebase";

function LoginForm({
  initialValues,
  validationSchema,
  handleSubmit,
  isSignup,
}) {
  const filteredFormArray = authFormArray.filter((item) => {
    if (item.name === "confirmPassword" || item.name === "userName") {
      return isSignup; // Only include confirmPassword if isSignup is true
    }
    return true; // Include all other fields
  });
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(
        "Google sign-in success:",
        user,
        user.displayName,
        user.email,
        user.uid,
        user.providerData[0].providerId
      );
      let payload = {
        name: user.displayName,
        email: user.email,
        userId: user.uid,
        provider: user.providerData[0].providerId,
      };
      console.log(payload);
      handleSubmit(payload, user.providerData[0].providerId);
      // Dispatch login or signup with user info if needed
      //navigate("/"); // redirect to home or dashboard
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true} // ✅ This will reset values when switching
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          {filteredFormArray.map((item, index) => {
            return (
              <GenericInput
                key={index}
                label={item.label}
                type={item.type}
                name={item.name}
                value={values[item.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched[item.name] && errors[item.name]}
              />
            );
          })}

          <Button
            variant="primary"
            type="submit"
            className="w-100 center mt-3 justify-content-center align-items-center"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            variant="light"
            className="w-100 mt-3 d-flex align-items-center justify-content-center border"
            onClick={handleGoogleSignIn}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              width="20"
              height="20"
              className="me-2"
            />
            Sign {isSignup ? "Up" : "In"} with Google
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
