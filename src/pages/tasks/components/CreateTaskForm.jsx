import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form as BootstrapForm,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CreateTaskForm = ({
  onSubmit,
  initialValues,
  validationSchema,
  priority,
  setPriority,
  users,
  projects,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          {/* Basic Info */}
          <h5 className="mb-3">Basic Information</h5>
          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Task Title</BootstrapForm.Label>
            <Field
              name="title"
              className="form-control"
              placeholder="Enter task title"
            />
            <div className="text-danger">
              <ErrorMessage name="title" />
            </div>
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-4">
            <BootstrapForm.Label>Description</BootstrapForm.Label>
            <Field
              as="textarea"
              name="description"
              className="form-control"
              rows={3}
            />
          </BootstrapForm.Group>

          {/* Assignment & Timing */}
          <h5 className="mb-3">Assignment & Timing</h5>
          <Row className="mb-3">
            <Col md={4}>
              <BootstrapForm.Label>Project</BootstrapForm.Label>
              <Field as="select" name="project" className="form-select">
                <option value="">Select project</option>
                {projects.map((item) => {
                  return (
                    <option key={item._id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
                {/* <option value="redesign">Website Redesign</option>
                <option value="mobile">Mobile App</option> */}
              </Field>
              <div className="text-danger">
                <ErrorMessage name="project" />
              </div>
            </Col>
            <Col md={4}>
              <BootstrapForm.Label>Assignee</BootstrapForm.Label>
              <Field as="select" name="assignee" className="form-select">
                <option value="">Select team member</option>
                {users.map((item) => {
                  return (
                    <option key={item._id} value={item.email}>
                      {item.email}
                    </option>
                  );
                })}
                {/* <option value="john">John Doe</option>
                <option value="jane">Jane Smith</option> */}
              </Field>
              <div className="text-danger">
                <ErrorMessage name="assignee" />
              </div>
            </Col>
            <Col md={4}>
              <BootstrapForm.Label>Reporter</BootstrapForm.Label>
              <Field as="select" name="reporter" className="form-select">
                <option value="">Select team member</option>
                {users.map((item) => {
                  return (
                    <option key={item._id} value={item.email}>
                      {item.email}
                    </option>
                  );
                })}
              </Field>
              <div className="text-danger">
                <ErrorMessage name="reporter" />
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <BootstrapForm.Label>Due Date</BootstrapForm.Label>
              <DatePicker
                selected={values.dueDate}
                onChange={(date) => setFieldValue("dueDate", date)}
                className="form-control"
                placeholderText="Select due date"
              />
              <div className="text-danger">
                <ErrorMessage name="dueDate" />
              </div>
            </Col>
            <Col md={6}>
              <BootstrapForm.Label>Estimated Hours</BootstrapForm.Label>
              <Field
                type="number"
                name="estimatedHours"
                className="form-control"
              />
              <div className="text-danger">
                <ErrorMessage name="estimatedHours" />
              </div>
            </Col>
          </Row>

          {/* Priority & Classification */}
          <h5 className="mb-3">Priority & Classification</h5>
          <div className="d-flex gap-3 mb-3">
            {["high", "medium", "low"].map((lvl) => (
              <div
                key={lvl}
                onClick={() => setPriority(lvl)}
                style={{
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  background:
                    lvl === "high"
                      ? "#f8d7da"
                      : lvl === "medium"
                      ? "#fff3cd"
                      : "#d4edda",
                  border:
                    priority === lvl ? "2px solid black" : "1px solid gray",
                }}
              >
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </div>
            ))}
          </div>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Status</BootstrapForm.Label>
            <Field as="select" name="status" className="form-select">
              <option value="">Select status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancel">Cancel</option>
              <option value="reopened">Reopened</option>
              <option value="closed">Closed</option>
            </Field>
            <div className="text-danger">
              <ErrorMessage name="status" />
            </div>
          </BootstrapForm.Group>

          {/* Attachments */}
          <h5 className="mb-3">Attachments</h5>
          <BootstrapForm.Group className="mb-4">
            <BootstrapForm.Control
              type="file"
              multiple
              name="attachments"
              onChange={(event) => {
                const files = event.currentTarget.files;
                setFieldValue("attachments", files);
              }}
            />
            <div className="text-danger">
              <ErrorMessage name="attachments" />
            </div>
          </BootstrapForm.Group>

          {/* File Preview + Remove Option */}
          {values.attachments && values.attachments.length > 0 && (
            <div className="mb-3">
              <small className="text-muted d-block mb-2">Attached Files:</small>
              <ul className="list-unstyled">
                {Array.from(values.attachments).map((file, index) => (
                  <li
                    key={index}
                    className="d-flex justify-content-between align-items-center border rounded p-2 mb-1"
                  >
                    <div>
                      📄 {file.name} ({Math.round(file.size / 1024)} KB)
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        // Convert FileList to array, remove by index, then set new FileList
                        const updatedFiles = Array.from(
                          values.attachments
                        ).filter((_, i) => i !== index);

                        // Convert array back to FileList-like structure using DataTransfer
                        const dataTransfer = new DataTransfer();
                        updatedFiles.forEach((f) => dataTransfer.items.add(f));
                        setFieldValue("attachments", dataTransfer.files);
                      }}
                    >
                      ❌
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button type="submit" variant="primary">
            Submit Task
          </Button>
        </Form>
      )}
    </Formik>
  );
};

CreateTaskForm.propTypes = {};

export default CreateTaskForm;
