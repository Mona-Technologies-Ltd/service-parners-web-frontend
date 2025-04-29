import React from "react";
import { Link } from "react-router-dom";

// Import assets
import MonaWhiteLogo from "../../assets/MonaWhiteLogo.svg";
import brandIcon from "../../assets/brandIcon.svg";
import GroupIcons from "../../assets/GroupIcons.svg";

const AuthLayout = ({ children, title, subtitle, backIcon, onChange }) => {
  return (
    <div className="auth-container">
      <div className="auth-left-panel">
        <img
          src={GroupIcons}
          alt=""
          className="brand-icon"
          style={{ position: "relative", top: "-20px" }}
        />
        <div className="brand-tagline">
          <div className="text-center">
            <img
              src={MonaWhiteLogo}
              alt="Mona White Logo"
              className="d-block mx-auto mb-3"
            />
            <p className="fst-italic">
              Reliable Protection, Simplified Repairs
            </p>
          </div>
        </div>
      </div>
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-header">
            {backIcon && (
              <div className="back-icon-container mb-5" onClick={onChange}>
                {backIcon}
              </div>
            )}
            <img src={brandIcon} alt="Mona Protect" className="mb-3" />
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
