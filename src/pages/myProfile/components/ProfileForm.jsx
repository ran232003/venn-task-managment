import React, { useState } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import ProfileImageInput from "./ProfileImageInput";
import {
  getInitialValuesProfile,
  yupForProfile,
} from "../../../global/helperFunction";
import TimezoneSelect from "react-timezone-select";
import { useApiHelper } from "../../../global/apiHelper";
import { useDispatch } from "react-redux";
import { UPDATE_PROFILE_URL } from "../../../URLS";
import { userAction } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
const ProfileForm = ({ user }) => {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedTimezone, setSelectedTimezone] = useState(
    user?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const initialValues = getInitialValuesProfile(user);
  const FormikDebug = () => {
    const { values, errors, touched } = useFormikContext();
    return (
      <pre style={{ fontSize: "12px" }}>
        {JSON.stringify({ values, errors, touched }, null, 2)}
      </pre>
    );
  };
  const ProfileSchema = yupForProfile;

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
    handleApiCall(
      "FORMDATA",
      UPDATE_PROFILE_URL,
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
    <div className="login-card p-4">
      <h4 className="text-center mb-3">My Profile</h4>

      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            {/* <FormikDebug /> */}
            <ProfileImageInput
              onImageSelect={(file) => setFieldValue("profilePic", file)}
              initialImage={user?.profilePic}
            />

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Job Title</BootstrapForm.Label>
              <Field
                name="jobTitle"
                className={`form-control ${
                  touched.jobTitle && errors.jobTitle ? "is-invalid" : ""
                }`}
              />
              {touched.jobTitle && errors.jobTitle && (
                <div className="invalid-feedback">{errors.jobTitle}</div>
              )}
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Company</BootstrapForm.Label>
              <Field
                name="company"
                className={`form-control ${
                  touched.company && errors.company ? "is-invalid" : ""
                }`}
              />
              {touched.company && errors.company && (
                <div className="invalid-feedback">{errors.company}</div>
              )}
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Time Zone</BootstrapForm.Label>
              <TimezoneSelect
                value={selectedTimezone}
                onChange={(tz) => {
                  setSelectedTimezone(tz);
                  console.log(tz.label);
                  setFieldValue("timeZone", tz); // some versions return object, some string
                }}
              />
              {touched.timeZone && errors.timeZone && (
                <div className="text-danger mt-1">{errors.timeZone}</div>
              )}
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Check
                type="checkbox"
                label="Email notifications for task updates"
                checked={values.emailNotification}
                onChange={(e) =>
                  setFieldValue("emailNotification", e.target.checked)
                }
              />
            </BootstrapForm.Group>

            <Button type="submit" className="w-100">
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;
