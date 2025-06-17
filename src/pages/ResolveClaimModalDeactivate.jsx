import React from "react";
import "./ResolveClaimModal.css";

const ResolveClaimModalDeactivate = ({ onResolve, onCancel }) => {
  return (
    <div className="modal-backdrops">
      <div className="modal-box">
        <div className="modal-icon">
          <span>?</span>
        </div>
        <p className="modal-text">
          Are you sure you want to <br /> deactivate this admin?
        </p>
        <div className="modal-buttons">
          <button className="resolve-button" onClick={onResolve}>
            Yes, deactivate
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolveClaimModalDeactivate;
