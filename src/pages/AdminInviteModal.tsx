import React from "react";
import "./AdminInviteModal.css";

const AdminInviteModal = ({ onClose }) => {
   const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Admin</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <label htmlFor="email" className="input-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Admin’s email address"
            className="input-field"
          />
          <div className="button-container">
            <button className="invite-button">Send Invite</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInviteModal;
