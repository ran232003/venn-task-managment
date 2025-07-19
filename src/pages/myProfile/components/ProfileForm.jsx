import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import ProfileImageInput from "./ProfileImageInput";
import { yupForProfile } from "../../../global/helperFunction";

const timeZones = [
  "UTC",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Jerusalem",
  "America/New_York",
  "Asia/Tokyo",
];

const ProfileForm = ({ user }) => {
  const initialValues = {
    jobTitle: user?.jobTitle || "",
    company: user?.company || "",
    timeZone: user?.timeZone || "",
    emailNotification: user?.emailNotification || false,
    profilePic: null,
  };

  const ProfileSchema = yupForProfile;

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
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
              <Field
                as="select"
                name="timeZone"
                className={`form-select ${
                  touched.timeZone && errors.timeZone ? "is-invalid" : ""
                }`}
              >
                <option value="">Select time zone</option>
                {timeZones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </Field>
              {touched.timeZone && errors.timeZone && (
                <div className="invalid-feedback">{errors.timeZone}</div>
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
