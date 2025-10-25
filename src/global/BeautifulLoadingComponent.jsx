import React from "react";
import {
  Spinner,
  Container,
  Row,
  Col,
  Alert,
  Placeholder,
  ProgressBar,
} from "react-bootstrap";
import { useSelector } from "react-redux";

// You can define some custom styles if you want to enhance the beauty
const loadingContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px", // Ensure it takes up some space
  padding: "20px",
  backgroundColor: "#f8f9fa", // Light background
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  margin: "20px 0",
};

const loadingTextStyle = {
  marginTop: "15px",
  fontSize: "1.2em",
  color: "#495057",
};
const loadingTextStyleSpinner = {
  marginTop: "15px",
  fontSize: "1.2em",
  color: "#495057",
  // height: "100vh",
};
const fullScreenCenterStyle = {
  position: "fixed", // Stays in place relative to the viewport
  top: 0,
  left: 0,
  width: "100vw", // Full viewport width
  height: "100vh", // Full viewport height
  display: "flex",
  flexDirection: "column", // Keep column for spinner above text
  justifyContent: "center", // Center vertically
  alignItems: "center", // Center horizontally
  backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white overlay
  zIndex: 1050, // Ensures it's on top, similar to your overlayStyle
};
const spinnerTextStyle = {
  // Renamed for clarity, combines text style with potential specific adjustments
  marginTop: "15px",
  fontSize: "1.2em",
  color: "#495057",
  // No need for height: "100vh" here, as the parent handles the centering
};
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white overlay
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1050, // Bootstrap modal z-index is 1050, so this will be on top of most content
};

/**
 * A versatile and beautiful loading component using React Bootstrap.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isLoading - Whether the loading state is active.
 * @param {string} [props.message="Loading..."] - Custom message to display.
 * @param {"spinner" | "placeholder" | "progress" | "overlay"} [props.type="spinner"] - Type of loading indicator.
 * @param {number} [props.progress=0] - Current progress for 'progress' type (0-100).
 * @param {React.ReactNode} [props.children] - Content to display when not loading (for 'overlay' type).
 */
function BeautifulLoadingComponent({
  isLoading,
  message = "Loading...",
  type = "spinner",
  progress = 0,
  children,
}) {
  const loading = useSelector((state) => {
    return state.loading.loading;
  });
  //   if (!isLoading && type !== "overlay") {
  //     return null; // Don't render anything if not loading and not an overlay type
  //   }
  if (!loading.isLoading) {
    return null; // Don't render anything if not loading and not an overlay type
  }
  const renderLoadingContent = () => {
    switch (type) {
      case "spinner":
        return (
          <div style={fullScreenCenterStyle}>
            <Spinner
              animation="border"
              role="status"
              variant="primary"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">{loading.message}</span>
            </Spinner>
            <p style={spinnerTextStyle}>{loading.message}</p>
          </div>
        );
      case "placeholder":
        return (
          <div style={loadingContainerStyle}>
            <p style={loadingTextStyle}>
              <Placeholder as="span" animation="glow">
                <Placeholder xs={8} /> <Placeholder xs={5} />{" "}
                <Placeholder xs={7} />
              </Placeholder>
            </p>
            <Placeholder as="p" animation="wave">
              <Placeholder xs={6} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={9} />
            </Placeholder>
            <Placeholder.Button xs={6} aria-hidden="true" />
            <p style={{ ...loadingTextStyle, fontSize: "0.9em" }}>{message}</p>
          </div>
        );
      case "progress":
        return (
          <div style={loadingContainerStyle}>
            <ProgressBar
              now={progress}
              label={`${progress}%`}
              variant="info"
              style={{ width: "80%", marginBottom: "15px" }}
            />
            <p style={loadingTextStyle}>{message}</p>
            {progress < 100 && (
              <p className="text-muted" style={{ fontSize: "0.8em" }}>
                Please wait, this might take a moment...
              </p>
            )}
          </div>
        );
      case "overlay":
        return (
          <>
            {isLoading && (
              <div style={overlayStyle}>
                <div style={loadingContainerStyle}>
                  <Spinner
                    animation="border"
                    role="status"
                    variant="success"
                    style={{ width: "4rem", height: "4rem" }}
                  >
                    <span className="visually-hidden">{message}</span>
                  </Spinner>
                  <p style={loadingTextStyle}>{message}</p>
                  {progress > 0 && progress < 100 && (
                    <ProgressBar
                      now={progress}
                      label={`${progress}%`}
                      variant="light"
                      style={{ width: "80%", marginTop: "10px" }}
                    />
                  )}
                </div>
              </div>
            )}
            {/* Render children regardless of loading state for overlay type */}
            {children}
          </>
        );
      default:
        return null;
    }
  };

  return renderLoadingContent();
}

export default BeautifulLoadingComponent;
