import React from "react";

const CurriculumSkeleton = ({ curriculumCount }) => {
  return (
    <>
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

      <main style={styles.main}>
        <div className="skeleton" style={styles.pageTitle}></div>

        <div style={styles.curriculumGrid}>
          {Array.from({ length: curriculumCount || 6 }).map((_, i) => (
            <div key={i} style={styles.curriculumCard}>
              <div className="skeleton" style={styles.curriculumTitle}></div>

              <div className="skeleton" style={styles.curriculumDesc}></div>
              <div className="skeleton" style={styles.curriculumDesc}></div>
              <div className="skeleton" style={styles.curriculumDescSmall}></div>

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

export default CurriculumSkeleton;

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

  curriculumGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },

  curriculumCard: {
    background: "#131313",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    border: "1px solid rgba(0,245,225,0.15)",
    height: "260px",
  },

  curriculumTitle: {
    height: "18px",
    width: "70%",
  },

  curriculumDesc: {
    height: "14px",
    width: "100%",
  },

  curriculumDescSmall: {
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