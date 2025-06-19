import { ImAttachment } from "react-icons/im"; 
import React from "react";
import "./RepairClaimResponse.css";
import { toast } from 'react-toastify';

const RepairClaimResponse = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Header */}
        <div className="header">
          Repair Claim Details
          {/* <button className="close-btn" onClick={onClose}>
            ✖
          </button> */}
        </div>

        {/* Claim Details */}
        <div className="claim-detailss">
          <p>
            <strong>Claim ID:</strong> 12345678
          </p>
          <p>
            <strong>Created On:</strong> 2025-01-15
          </p>
        </div>

        {/* Admin Updates */}
        <div className="admin-updates">
          <div className="update">
            <p>
              <strong>Admin John Doe | 2025-01-15 10:30 AM</strong>
            </p>
            <p>Please ensure the documents are correctly uploaded</p>
          </div>
          <div className="update">
            <p>
              <strong>Admin Jane Smith | 2025-01-15 11:00 AM</strong>
            </p>
            <p>Awaiting confirmation from the customer</p>
          </div>
        </div>

        {/* Response Form */}
<form
  className="response-form"
  onSubmit={(e) => {
    e.preventDefault();
    toast("Response submitted successfully", {
      style: {
        backgroundColor: "#fdecea", // light red background
        color: "#d32f2f",            // deep red text
        fontWeight: "bold",
      },
      icon: false, // no error icon
    });

    setTimeout(() => {
      onClose();
    }, 1000); // close after 1 second
  }}
>


          <textarea
            className="response-input"
            placeholder="Type your response here..."
          ></textarea>

          <div className="file-upload">
            <label className="file-labels" htmlFor="file-input">
              <span className="file-icon"><ImAttachment /></span> Attach File
            </label>
            <input type="file" id="file-input" className="file-input" />
            <span className="file-placeholder">No file chosen</span>
          </div>

          <input type="submit" value='Submit Response' className="resp_btn" />
            {/* Submit Response
          </input> */}
        </form>
      </div>
    </div>
  );
};

export default RepairClaimResponse;
