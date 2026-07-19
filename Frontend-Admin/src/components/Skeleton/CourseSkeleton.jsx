import React from "react";

const CourseSkeleton = ({ courseCount }) => {

  return (
    <>
      {/* ===== GLOBAL KEYFRAMES ===== */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
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

      {/* ===== COURSE PAGE ===== */}
      <main style={styles.main}>
        {/* Heading */}
        <div className="skeleton" style={styles.pageTitle}></div>

        {/* Course Grid */}
        <div style={styles.courseGrid}>
          {Array.from({ length: courseCount }).map((_, i) => (
            <div key={i} style={styles.courseCard}>
              <div className="skeleton" style={styles.courseImage}></div>
              <div className="skeleton" style={styles.courseTitle}></div>
              <div className="skeleton" style={styles.courseDesc}></div>
              <div className="skeleton" style={styles.courseDescSmall}></div>

              <div style={styles.buttonRow}>
                <div className="skeleton" style={styles.button}></div>
                <div className="skeleton" style={styles.button}></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default CourseSkeleton;

/* ===== INLINE STYLES ===== */

const styles = {
  main: {
    flex: 1,
    padding: "28px",
    minHeight: "100vh",
  },
  pageTitle: {
    height: "32px",
    width: "200px",
    marginBottom: "24px",
  },
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  courseCard: {
    background: "#131313",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    border: "1px solid rgba(0,245,225,0.15)",
    height: "260px",
  },
  courseImage: {
    height: "140px",
    borderRadius: "12px",
  },
  courseTitle: {
    height: "18px",
    width: "70%",
  },
  courseDesc: {
    height: "14px",
    width: "100%",
  },
  courseDescSmall: {
    height: "14px",
    width: "60%",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  button: {
    height: "34px",
    width: "90px",
    borderRadius: "8px",
  },
};
