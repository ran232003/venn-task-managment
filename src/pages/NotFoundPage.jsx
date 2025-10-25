import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 style={{ fontSize: "5rem", fontWeight: "bold" }}>404</h1>
            <h2 style={{ marginBottom: "20px" }}>Page Not Found</h2>
            <p>The page you're looking for doesn’t exist or has been moved.</p>
            <Button
              variant="light"
              style={{
                color: "#6366f1",
                border: "2px solid #6366f1",
                backgroundColor: "#fff",
                marginTop: "20px",
              }}
              as={Link}
              to={"/"}
            >
              Go Home
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFoundPage;
