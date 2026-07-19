import React from "react";

const SidebarSkeleton = () => {
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

            {/* ===== SIDEBAR SKELETON ===== */}
            <aside style={styles.sidebar}>
                {/* Logo */}
                <div className="skeleton" style={styles.logo}></div>

                {/* Menu items */}
                {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="skeleton" style={styles.sidebarItem}></div>
                ))}

                <div style={styles.divider}></div>

                {/* Bottom menu */}
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="skeleton" style={styles.sidebarItem}></div>
                ))}
            </aside>
        </>
    );
};

export default SidebarSkeleton;

/* ===== INLINE STYLES ===== */

const styles = {
    sidebar: {
        width: "260px",
        minHeight: "100vh",
        padding: "24px 18px",
        background: "#111",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        borderRight: "1px solid #242424",
    },
    logo: {
        height: "28px",
        width: "70%",
        marginBottom: "12px",
    },
    sidebarItem: {
        height: "18px",
        width: "100%",
    },
    divider: {
        height: "1px",
        background: "#242424",
        margin: "12px 0",
    },
};
