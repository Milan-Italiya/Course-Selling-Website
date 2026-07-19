import React from "react";

const FormSkeleton = () => {
  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -400px 0;
            }
            100% {
              background-position: 400px 0;
            }
          }

          .skeleton {
            background: linear-gradient(
              90deg,
              #1a1a1a 25%,
              #2a2a2a 37%,
              #1a1a1a 63%
            );
            background-size: 800px 100%;
            animation: shimmer 1.4s infinite linear;
            border-radius: 8px;
          }
        `}
      </style>

      <div style={styles.wrapper}>
        <div className="skeleton" style={styles.heading}></div>

        <div style={styles.formContainer}>
          {/* Title */}
          <div className="skeleton" style={styles.label}></div>
          <div className="skeleton" style={styles.input}></div>

          {/* Description */}
          <div className="skeleton" style={styles.label}></div>
          <div className="skeleton" style={styles.textarea}></div>

          {/* Price */}
          <div className="skeleton" style={styles.label}></div>
          <div className="skeleton" style={styles.input}></div>

          {/* Category */}
          <div className="skeleton" style={styles.label}></div>
          <div className="skeleton" style={styles.input}></div>

          {/* Language */}
          <div className="skeleton" style={styles.label}></div>
          <div className="skeleton" style={styles.input}></div>

          {/* Image Preview */}
          <div className="skeleton" style={styles.label}></div>
          <div className="skeleton" style={styles.image}></div>

          {/* File Input */}
          <div className="skeleton" style={styles.input}></div>

          {/* Button */}
          <div className="skeleton" style={styles.button}></div>
        </div>
      </div>
    </>
  );
};

export default FormSkeleton;

const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    marginLeft:"255px"
  },

  heading: {
    width: "280px",
    height: "35px",
    marginBottom: "25px",
  },

  formContainer: {
    width: "100%",
    maxWidth: "650px",
    background: "#131313",
    border: "1px solid rgba(0,245,225,0.15)",
    borderRadius: "16px",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  label: {
    width: "90px",
    height: "15px",
  },

  input: {
    width: "100%",
    height: "48px",
    borderRadius: "10px",
  },

  textarea: {
    width: "100%",
    height: "120px",
    borderRadius: "10px",
  },

  image: {
    width: "180px",
    height: "120px",
    borderRadius: "10px",
  },

  button: {
    width: "100%",
    height: "48px",
    borderRadius: "10px",
    marginTop: "10px",
  },
};