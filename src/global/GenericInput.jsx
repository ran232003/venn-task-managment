import React from "react";
import { Form } from "react-bootstrap";

const GenericInput = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default GenericInput;
