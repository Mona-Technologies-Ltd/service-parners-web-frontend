import { HiOutlineDownload } from "react-icons/hi"; 
import { BsPlayBtn } from "react-icons/bs"; 
// ClaimVideos.jsx
import React from "react";
import "./ClaimVideos.css";

const ClaimVideos = ({ onClose }) => {
  const videos = [
    { label: "Onboarding video", url: "#" },
    { label: "Damage video", url: "#" },
    { label: "Completed video", url: "#" },
  ];

  return (
    <div className="claim-video-overlay" onClick={onClose}>
      <div className="claim-video-modal" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-header">Repair Claim Details</div>
        <div className="video-content">
          {videos.map((video, index) => (
            <div key={index} className="video-section">
              <div className="video-header">
                <span>{video.label}</span>
                <a href={video.url} className="download-btn" download>
                  Download Video <span className="download-icon"><HiOutlineDownload /></span>
                </a>
              </div>
              <div className="video-box">
                <span className="play-icon">
                    <BsPlayBtn color="red" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClaimVideos;
