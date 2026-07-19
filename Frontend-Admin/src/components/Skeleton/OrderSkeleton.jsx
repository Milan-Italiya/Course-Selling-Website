import React from "react";

const OrderSkeleton = ({ orderCount=6 }) => {
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

      {/* ===== ORDERS PAGE ===== */}
      <main style={styles.main}>
        {/* Heading */}
        <div className="skeleton" style={styles.pageTitle}></div>

        {/* Orders Grid */}
        <div style={styles.orderGrid}>
          {Array.from({length:orderCount}).map((_, i) => (
          <div key={i} style={styles.orderCard}>
            <div className="skeleton" style={styles.orderTitle}></div>
            <div className="skeleton" style={styles.orderText}></div>
            <div className="skeleton" style={styles.orderText}></div>
            <div className="skeleton" style={styles.orderText}></div>
            <div className="skeleton" style={styles.orderText}></div>

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

export default OrderSkeleton;

/* ===== INLINE STYLES ===== */
const styles = {
  main: {
    flex: 1,
    padding: "28px",
    minHeight: "100vh",
  },
  pageTitle: {
    height: "32px",
    width: "150px",
    marginBottom: "24px",
  },
  orderGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  orderCard: {
    background: "#131313",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    border: "1px solid rgba(0,245,225,0.15)",
    height: "280px",
  },
  orderTitle: {
    height: "18px",
    width: "50%",
  },
  orderText: {
    height: "14px",
    width: "100%",
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
