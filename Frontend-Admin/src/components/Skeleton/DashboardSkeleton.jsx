import React from "react";

const DashboardSkeleton = () => {
    return (
        <>
            {/* ===== GLOBAL KEYFRAMES ===== */}
            <style>
                {`
                 html, body { overflow: hidden; }
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

                {/* ===== HEADER ===== */}
                <div style={styles.header}>
                    <div className="skeleton" style={styles.headerTitle}></div>
                    <div className="skeleton" style={styles.search}></div>
                </div>

                {/* ===== TOP STAT CARDS (KEEP AS IT IS) ===== */}
                <div style={styles.cardGrid}>
                    {[1, 2, 3, 4].map((_, i) => (
                        <div key={i} style={styles.card}>
                            <div className="skeleton" style={styles.cardIcon}></div>
                            <div className="skeleton" style={styles.cardTitle}></div>
                            <div className="skeleton" style={styles.cardValue}></div>
                        </div>
                    ))}
                </div>

                {/* ===== GRAPH SECTION ===== */}
                <div className="skeleton" style={styles.sectionTitle}></div>
                <section style={styles.graphSection}>
                    <div className="skeleton" style={styles.graph}></div>
                </section>

                {/* ===== TABLE SECTION ===== */}
                <div className="skeleton" style={styles.sectionTitle}></div>
                <section style={styles.tableSection}>

                    <div style={styles.table}>
                        {/* Table header */}
                        <div style={styles.tableRow}>
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="skeleton" style={styles.tableHead}></div>
                            ))}
                        </div>

                        {/* Table rows */}
                        {[1, 2, 3, 4, 5].map((_, row) => (
                            <div key={row} style={styles.tableRow}>
                                {[1, 2, 3, 4].map((_, col) => (
                                    <div
                                        key={col}
                                        className="skeleton"
                                        style={styles.tableCell}
                                    ></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </>
    );
};

export default DashboardSkeleton;

/* ===== INLINE STYLES ===== */

const styles = {
    main: {
        flex: 1,
        overflow: "hidden",
        padding: "28px",
        minHeight: "100vh",
    },

    /* Header */
    header: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "28px",
    },
    headerTitle: {
        height: "34px",
        width: "260px",
    },
    search: {
        height: "42px",
        width: "340px",
        borderRadius: "12px",
    },

    /* Cards */
    cardGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "24px",
        marginBottom: "32px",
    },
    card: {
        background: "#131313",
        borderRadius: "16px",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        border: "1px solid rgba(0,245,225,0.15)",
    },
    cardIcon: {
        height: "32px",
        width: "32px",
        borderRadius: "50%",
    },
    cardTitle: {
        height: "14px",
        width: "70%",
    },
    cardValue: {
        height: "22px",
        width: "50%",
    },

    /* Graph */
    graphSection: {
        background: "#131313",
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid rgba(0,245,225,0.15)",
        marginBottom: "32px",
    },
    sectionTitle: {
        height: "18px",
        width: "200px",
        marginBottom: "16px",
    },
    graph: {
        height: "260px",
        borderRadius: "12px",
    },

    /* Table */
    tableSection: {
        background: "#131313",
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid rgba(0,245,225,0.15)",
    },
    table: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    tableRow: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
    },
    tableHead: {
        height: "16px",
    },
    tableCell: {
        height: "14px",
    },
};
