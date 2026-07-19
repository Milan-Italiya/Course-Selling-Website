import React from "react";

const CourseCurriculumSkeleton = ({ count = 4 }) => {
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
        <div style={styles.header}>
          <div>
            <div className="skeleton" style={styles.heading}></div>
            <div className="skeleton" style={styles.subHeading}></div>
          </div>

          <div className="skeleton" style={styles.addButton}></div>
        </div>

        <div style={styles.curriculumList}>
          {Array.from({ length: count }).map((_, index) => (
            <div style={styles.card} key={index}>
              <div style={styles.cardTop}>
                <div className="skeleton" style={styles.number}></div>

                <div style={styles.content}>
                  <div className="skeleton" style={styles.title}></div>
                  <div className="skeleton" style={styles.description}></div>
                  <div className="skeleton" style={styles.descriptionSmall}></div>

                  <div style={styles.metaWrapper}>
                    <div className="skeleton" style={styles.meta}></div>
                    <div className="skeleton" style={styles.meta}></div>
                    <div className="skeleton" style={styles.meta}></div>
                  </div>
                </div>
              </div>

              <div className="skeleton" style={styles.editButton}></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseCurriculumSkeleton;

const styles = {
  wrapper: {
    margin: "35px auto 50px",
    width: "92%",
    maxWidth: "1100px",
    background: "#111",
    border: "1px solid rgba(0, 230, 230, 0.16)",
    borderRadius: "16px",
    padding: "24px",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "24px",
  },

  heading: {
    width: "230px",
    height: "28px",
    marginBottom: "10px",
  },

  subHeading: {
    width: "330px",
    height: "15px",
  },

  addButton: {
    width: "155px",
    height: "42px",
    borderRadius: "10px",
  },

  curriculumList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "18px",
  },

  card: {
    width: "calc(50% - 9px)",
    minHeight: "210px",
    background: "#171717",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "14px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "16px",
    boxSizing: "border-box",
  },

  cardTop: {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
  },

  number: {
    minWidth: "45px",
    width: "45px",
    height: "45px",
    borderRadius: "12px",
  },

  content: {
    width: "100%",
  },

  title: {
    width: "70%",
    height: "22px",
    marginBottom: "12px",
  },

  description: {
    width: "95%",
    height: "14px",
    marginBottom: "9px",
  },

  descriptionSmall: {
    width: "65%",
    height: "14px",
    marginBottom: "13px",
  },

  metaWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "12px",
  },

  meta: {
    width: "95px",
    height: "28px",
    borderRadius: "999px",
  },

  editButton: {
    width: "85px",
    height: "38px",
    borderRadius: "10px",
    alignSelf: "flex-end",
  },
};