import React from "react";
import "./ResolveClaimModal.css";

const ResolveClaimModal = ({ onResolve, onCancel }) => {
  return (
    <div className="modal-backdrops">
      <div className="modal-box">
        <div className="modal-icon">
          <span>?</span>
        </div>
        <p className="modal-text">
          Are you sure you want approve a<br /> this queried claim?
        </p>
        <div className="modal-buttons">
          <button className="resolve-button" onClick={onResolve}>
            Yes, resolve
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolveClaimModal;
