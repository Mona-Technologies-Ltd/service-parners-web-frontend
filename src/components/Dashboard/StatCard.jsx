import React from "react";
import { Card } from "antd";

const StatCard = ({ title, value, icon, iconClass, change }) => {
  const renderChangeIndicator = () => {
    if (change === undefined) return null;

    const isPositive = change > 0;
    return (
      <div className={`change-indicator ${isPositive ? "positive" : "negative"}`} style={{ color:'#202224' }}>
        <img
          src={isPositive ? "/Path1.svg" : "/Path.svg"}
          alt={isPositive ? "Increase" : "Decrease"}
          width="20"
          height="20"
        />
        <span>
          <strong>{`${Math.abs(change)}%`}</strong>
          <span className="stat-title"> From last week</span>
        </span>
      </div>
    );
  };

  const isPremiumTitle =
    title === "Total Remitted Premium" || title === "Total Unremitted Premium" || "Total Claims Filed";

  return (
    <Card className="stat-card">
      <div className="stat-card-inner">
        <div className="stat-content" style={{ color:'#202224' }}>
          {/* Title styling */}
          <h3 className={`stat-title ${isPremiumTitle ? "premium_w" : "premium_w_1"}`}>
            {title}
          </h3>

          {/* Value styling */}
          <div className={`stat-value ${isPremiumTitle ? "premium_start" : "premium_start_1"}`} id={`${isPremiumTitle ? "stat-value" : ""}`}>
            {value}
          </div>

          {renderChangeIndicator()}
        </div>

        <div className={`stat-icon ${iconClass}`}>
          <img src={icon} alt={title} width="24" height="24" />
        </div>
        <p style={{ marginTop:'5px', color:'#8A8894' }}> {title == 'Active Devices' ? 'Total Sum Insured 40,689' : ''}</p>
      </div>
    </Card>
  );
};

export default StatCard;
