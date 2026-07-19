import React from "react";
import "../css/ConfirmModel.css";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  loading,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="confirm-modal">

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-buttons">
          <button
            className="cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;