import React from "react";
import "../css/purchaseCard.css";

const PurchaseCard = ({ purchases }) => {
  const getStatusStyle = (status) => {
    if (status === "Succeeded") {
      return {
        backgroundColor: "rgba(0, 229, 255, 0.15)",
        color: "#00e5ff",
        border: "1px solid rgba(0, 229, 255, 0.35)",
      };
    }

    if (status === "Pending") {
      return {
        backgroundColor: "rgba(255, 193, 7, 0.15)",
        color: "#ffc107",
        border: "1px solid rgba(255, 193, 7, 0.35)",
      };
    }

    if (status === "Processing") {
      return {
        backgroundColor: "rgba(33, 150, 243, 0.15)",
        color: "#64b5f6",
        border: "1px solid rgba(33, 150, 243, 0.35)",
      };
    }

    if (status === "Failed" || status === "Cancelled") {
      return {
        backgroundColor: "rgba(255, 76, 76, 0.15)",
        color: "#ff7b7b",
        border: "1px solid rgba(255, 76, 76, 0.35)",
      };
    }

    if (status === "Refunded") {
      return {
        backgroundColor: "rgba(156, 39, 176, 0.15)",
        color: "#ce93d8",
        border: "1px solid rgba(156, 39, 176, 0.35)",
      };
    }

    return {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "#ffffff",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    };
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not available";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleDateString();
  };

  const formatTime = (dateValue) => {
    if (!dateValue) return "Not available";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleTimeString();
  };

  const getUniquePurchases = (purchaseList = []) => {
    const purchaseMap = new Map();

    purchaseList.forEach((purchase) => {
      const courseKey = purchase._id || purchase.courseId || purchase.title;

      if (!courseKey) return;

      const existingPurchase = purchaseMap.get(courseKey);

      if (!existingPurchase) {
        purchaseMap.set(courseKey, purchase);
        return;
      }

      const existingDate = new Date(
        existingPurchase.updatedAt || existingPurchase.createdAt || 0
      ).getTime();

      const currentDate = new Date(
        purchase.updatedAt || purchase.createdAt || 0
      ).getTime();

      if (currentDate >= existingDate) {
        purchaseMap.set(courseKey, purchase);
      }
    });

    return Array.from(purchaseMap.values());
  };

  const uniquePurchases = getUniquePurchases(purchases);

  return (
    <div>
      <div className="purchase-list">
        {uniquePurchases?.length > 0 ? (
          uniquePurchases.map((purchase, index) => {
            const status = purchase.status || "Pending";
            const purchaseDate = purchase.createdAt || purchase.updatedAt;

            return (
              <div
                className="purchase-card"
                key={purchase.purchaseId || purchase._id || index}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={purchase.image?.url}
                    alt={purchase.title}
                    className="purchase-image"
                  />

                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      padding: "7px 13px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "800",
                      letterSpacing: "0.4px",
                      backdropFilter: "blur(8px)",
                      ...getStatusStyle(status),
                    }}
                  >
                    {status}
                  </span>
                </div>

                <h3>{purchase.title}</h3>

                <p>${purchase.price}</p>

                <p>Purchased Time: {formatTime(purchaseDate)}</p>

                <p>Purchased Date: {formatDate(purchaseDate)}</p>
              </div>
            );
          })
        ) : (
          <div className="purchase-error">
            You have not purchase any course yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseCard;