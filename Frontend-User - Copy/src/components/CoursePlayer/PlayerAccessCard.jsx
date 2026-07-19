import React from "react";
import { ToastContainer } from "react-toastify";

const PlayerAccessCard = ({
  title,
  message,
  showLogin,
  onLogin,
  onBuyCourse,
  onGoBack,
}) => {
  return (
    <div className="course-player-page">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="player-access-card">
        <h2>{title}</h2>

        <p>{message}</p>

        <div className="player-access-actions">
          {showLogin && (
            <button type="button" onClick={onLogin}>
              Login
            </button>
          )}

          {onBuyCourse && (
            <button type="button" onClick={onBuyCourse}>
              Buy Course
            </button>
          )}

          <button type="button" onClick={onGoBack}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerAccessCard;