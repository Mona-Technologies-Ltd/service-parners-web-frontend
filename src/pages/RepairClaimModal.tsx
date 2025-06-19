import React from "react";
import "./RepairClaimModal.css";
// import ReviewCardClaim from "./ReviewCardClaim";
// import ResolveClaimModal from "./ResolveClaimModal";
import ClaimVideos from "./ClaimVideos";
import RepairClaimResponse from "./RepairClaimResponse";
import ReviewCardClaim from "../components/claim/ReviewCardClaim";
import { RxVideo } from "react-icons/rx";
import { toast } from 'react-toastify';

const RepairClaimModal = ({ isOpen, onClose, device }) => {
    const [showResolveModal, setShowResolveModal] = React.useState(false);
  const [showClaimVideos, setShowClaimVideos] = React.useState(false); // new state
  const [showResponseForm, setShowResponseForm] = React.useState(false); // New state for Add Response
const [showResponseModal, setShowResponseModal] = React.useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = React.useState(false);

  if (!isOpen) return null;
console.log(device)
  return (
    <div className="modal-overlays" onClick={onClose}>
      <div className="modal-containers" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">Repair Claim Details</div>
        <div className="modal-bodys">
          {/* Claim Details */}
          <div className="claim-details" style={{ display:'flex', flexDirection:'column' }}>
            <p>Claim ID: {device?.claimId}</p>
            <p>Created On: {device?.dateQueried}</p>
            <p>Claim Type: Accidental Damage</p>
            <p>Total Sum Insured: #10,000</p>
            <p>Balance: #10,000</p>
          </div>

          {/* Admin Updates */}
         {device?.isQuery && device?.isResponse && ( <div className="admin-updates">
            <p>Admin John Doe | 2025-01-15 10:30 AM</p>
            <p>Please ensure the documents are correctly uploaded</p>
            <p>Admin Jane Smith | 2025-01-15 11:00 AM</p>
            <p>Awaiting confirmation from the customer</p>
          </div>)}
{
    !device?.isClosed && device?.status.toLowerCase() !== 'pending'  && ( <div id="action-buttons">
            <button id="btn" className="btn-blue"               
  onClick={() => setShowResponseModal(true)}
>Add Response</button>
            <button id="btn" className="btn-green"  onClick={() => setShowResolveModal(true)}>Approve Claim</button>
          </div>)
}
{device?.isClosed && device?.isQuery && (
  <button className="Closed_btn">Closed</button>
)}
       {/* Conditional Rendering of Response Form */}
        <RepairClaimResponse
  isOpen={showResponseModal}
  onClose={() => setShowResponseModal(false)}
/>


        {/* {showResolveModal && (
            <ResolveClaimModal
              onResolve={() => {
                console.log("Resolved");
                setShowResolveModal(false); // Close after resolve
              }}
              onCancel={() => setShowResolveModal(false)}
            />
          )} */}

          {/* User Info */}
          <div className="info-section">
            <h3>User Information</h3>
            <table className="info-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Davies Michael</td>
                  <td>Galaxy S22</td>
                  <td>18-05-2024</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Device Info */}
          <div className="info-section">
            <h3>Device Information</h3>
            <table className="info-table">
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Device Brand</th>
                  <th>Model</th>
                  <th>IMEI</th>
                  <th>Policy Document</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="link">{device?.deviceId}</td>
                  <td>{device?.deviceModel}</td>
                  <td>{device?.deviceModel}</td>
                  <td>356789123456789</td>
                  <td className="link">View More</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Claims Info */}
          <div className="info-section">
            <h3>Claims Information</h3>
            <table className="info-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Screen Damage</td>
                  <td>#50,000</td>
                </tr>
                <tr>
                  <td>Battery Issue</td>
                  <td>#60,000</td>
                </tr>
                <tr>
                  <td>Service Fee</td>
                  <td>#10,000</td>
                </tr>
              </tbody>
            </table>
            <div className="totals">
              <p><strong>Total:</strong> #120,000</p>
              {device?.isExcess && (<p><strong>Excess:</strong> {device?.excess}</p>)}
              <p><strong>Amount Payable:</strong> #120,000</p>
              <p><strong>Device Balance:</strong> #120,000</p>
            </div>
          </div>

          {/* Review Damage */}
          <div className="info-section info-review">
            <h3>Review Damage:</h3>
            <button  className="btn-red" onClick={() => setShowClaimVideos(true)}>Watch Video <RxVideo /></button>
          </div>
 {/* Video Modal */}
          {showClaimVideos && (
            <ClaimVideos onClose={() => setShowClaimVideos(false)} />
          )}

          {/* General Description */}
          <div className="info-section">
            <h3>General Description</h3>
            <div>
              <h4>When</h4>
              <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
            </div>
            <div>
              <h4>Where</h4>
              <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
            </div>
            <div>
              <h4>How</h4>
              <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
            </div>
            
          </div>
  <ReviewCardClaim />
  {device?.status.toLowerCase() == 'pending'  || device?.status.toLowerCase() == 'queried' ? (
           <div className="actionsRepair">
         <button
          className="approve-btn"
          onClick={() => {
            toast.success("Claim Approved Successfully");
            setTimeout(() => {
              onClose();
            }, 1000); // closes after 1 second
          }}
        >
          Approve Claim
        </button>

          <button className="query-btn"  onClick={() => setShowResponseModal(true)}>Query Claim</button>
          
        </div>
          ) : ''}
        
        </div>
      </div>
    </div>
  );
};

export default RepairClaimModal;
