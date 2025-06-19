import { RxVideo } from "react-icons/rx"; 
import React, { useEffect, useRef, useState } from 'react';
import './RepairClaimModal.css';
import ReviewCardClaim from './ReviewCardClaim';
import { toast } from 'react-toastify';
import ClaimVideos from "../../pages/ClaimVideos";
import RepairClaimResponse from "../../pages/RepairClaimResponse";

const RepairClaimModalDevice = ({ isOpen, onClose, device }) => {
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
const [selectedFileName, setSelectedFileName] = React.useState('');
  const [showClaimVideos, setShowClaimVideos] = React.useState(false); // new state
const [showResponseModal, setShowResponseModal] = React.useState(false);

const handleFileChange = (e) => {
  if (e.target.files.length > 0) {
    setSelectedFileName(e.target.files[0].name);
  } else {
    setSelectedFileName('');
  }
};

 const queryRef = useRef(null);
const modalRef = useRef(null);

  if (!isOpen) return null; // Only show modal when open

  
// useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (showQueryForm && queryRef.current && !queryRef.current.contains(event.target)) {
//       setShowQueryForm(false);
//     }
//   };

//   document.addEventListener('mousedown', handleClickOutside);
//   return () => {
//     document.removeEventListener('mousedown', handleClickOutside);
//   };
// }, [showQueryForm]);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (showQueryForm && queryRef.current && !queryRef.current.contains(event.target)) {
      setShowQueryForm(false);
    } else if (!showQueryForm && modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [showQueryForm, onClose]);

   const handleSubmitQuery = () => {
    console.log("Query submitted!");
    // Add your query submission logic here (e.g., API call)
    setShowQueryForm(false); // Hide the form after submission
  };

  const handleApprove = () => {
  toast.success("Claim approved successfully!");
  onClose(); // Close the modal
};

  return (
    <div className="repair-modal-container">
      {/* <div className={`modal-overlay ${showQueryForm ? 'active' : ''}`} onClick={onClose}></div> */}
      <div
  className={`modal-overlay ${showQueryForm ? 'active' : ''}`}
  onClick={() => {
    if (!showQueryForm) {
      onClose();
    }
  }}
></div>

      <div className="repair-modal" ref={modalRef}>
        <div className="modal-header">Repair Claim Details</div>

        <div id="modal-section2" style={{ display:'flex' }}>
          <div><strong>Claim ID:</strong> {device?.claimId || '12345678'}</div>
          <div><strong>Created On:</strong> 2025-01-15</div>
          <div><strong>Claim Type:</strong> Accidental Damage</div>
          <div><strong>Total Sum Insured:</strong> ₦100,000</div>
          <div><strong>Balance:</strong> ₦100,000</div>
        </div>

        {/* <div className="modal-section">
          <h5>User Information</h5>
          <table>
            <thead>
              <tr><th>Name</th><th>Email Address</th><th>Date of Birth</th></tr>
            </thead>
            <tbody>
              <tr><td>Davies Michael</td><td>Galaxy S22</td><td>19-05-2024</td></tr>
            </tbody>
          </table>
        </div> */}

        <div className="modal-section">
          <h6>Device Information</h6>
          <table>
            <thead>
              <tr><th>Device ID</th><th>Device Brand</th><th>Model</th><th>IMEI</th><th>Policy Document</th></tr>
            </thead>
            <tbody>
              <tr>
                <td className="link">#0001</td>
                <td>Samsung</td>
                <td>Galaxy S22</td>
                <td>356789123456789</td>
                <td className="link">View More</td>
              </tr>
            </tbody>
          </table>
        </div>
 {/* Video Modal */}
          {showClaimVideos && (
            <ClaimVideos onClose={() => setShowClaimVideos(false)} />
          )}
        <div className="modal-section modal-section2">
          <h6>Claims Information</h6>
          <table>
            <thead>
              <tr><th>Description</th><th>Amount</th></tr>
            </thead>
            <tbody>
              <tr><td>Screen Damage</td><td>₦50,000</td></tr>
              <tr><td>Battery Issue</td><td>₦60,000</td></tr>
              <tr><td>Service Fee</td><td>₦10,000</td></tr>
            </tbody>
          </table>
          <div className="totals">
            <p>Total: ₦120,000</p>
            <p>Device Balance: ₦120,000</p>
            <p>Amount Payable: ₦120,000</p>

          </div>
        </div>

        <div className="modal-section">
          <h6>Review Damage: <button className="watch-video" onClick={() => setShowClaimVideos(true)}>Watch Video <RxVideo color="#E52626" /></button></h6>

          <h6>General Description</h6>
          <p><strong>When</strong></p>
          <div className="desc-box">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</div>

          <p><strong>Where</strong></p>
          <div className="desc-box">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</div>

          <p><strong>How</strong></p>
          <div className="desc-box">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</div>
        </div>

        <div id="review-box">
          <ReviewCardClaim />
         
        </div>

        <div className="actions">
          <button className="approve-btn" onClick={() => setShowApproveConfirm(true)}>Approve Claim</button>
          <button className="query-btn" onClick={() => setShowResponseModal(true)}>Query Claim</button>
        </div>
      {/* Conditional Rendering of Response Form */}
        <RepairClaimResponse
  isOpen={showResponseModal}
  onClose={() => setShowResponseModal(false)}
/>
        {/* {showQueryForm && (
          <div className="query-form-modal">
            <h3>Query Form</h3>
            <textarea placeholder="Enter your query message here..."></textarea>
            <input type="file" />
            <button className="submit-query">Submit Query</button>
          </div>
        )} */}
        {/* {showQueryForm && (
   <div className="query-form-modal" ref={queryRef}>
  <h3 className="query-form-title">Query Form</h3>
  <textarea
    className="query-input"
    placeholder="Enter your query message here..."
  ></textarea>
<div className="file-upload-section">
  <label htmlFor="file-upload" className="attach-file-btn">
    📎 Attach File
  </label>
  <input 
    id="file-upload" 
    type="file" 
    style={{ display: 'none' }} 
    onChange={handleFileChange} 
  />
  <span className="file-placeholder">{selectedFileName || "No file chosen"}</span>
</div>

  <button className="submit-query-btn" onClick={handleSubmitQuery}>
    Submit Query
  </button>
</div> */}
      {/* )} */}
{showApproveConfirm && (
  <div className="confirm-modal-overlay" onClick={() => setShowApproveConfirm(false)}>
    <div className="confirm-modal" onClick={e => e.stopPropagation()}>
      <div className="confirm-icon">
        <div className="question-circle">?</div>
      </div>
      <p className="confirm-text">
        Are you sure you want to approve this queried claim?
      </p>
      <div className="confirm-buttons">
        <button className="yes-btn" onClick={() => {
          handleApprove();
          setShowApproveConfirm(false);
        }}>
          Yes, resolve
        </button>
        <button className="cancel-btn" onClick={() => setShowApproveConfirm(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default RepairClaimModalDevice;
