import { BiTrendingDown } from "react-icons/bi"; 
import { BiTrendingUp } from "react-icons/bi"; 
import React from 'react';
import './DashboardStats.css';

const StatCard = ({ title, value, icon, iconClass, change, footer }) => {
  const isPositive = change && change >= 0;

  return (
    <div className="stat-card" style={{ borderRadius:0 }}>
      <div className="stat-header">
        <h4>{title}</h4>
        <div className={`icon-circle ${iconClass}`}>
          <img src={icon} alt="icon" width={20} height={20} />
        </div>
      </div>
      <div className="stat-body">
        <h2>{value}</h2>
        {change !== undefined && (
          <div className={`stat-change ${isPositive ? 'up' : 'down'}`}> 
            <span>{isPositive ? <BiTrendingUp /> : <BiTrendingDown />}</span>
            <span>{Math.abs(change)}%</span>
            <span>From last week</span>
          </div>
        )}
        {footer && <div className="stat-subtext">{footer}</div>}
      </div>
    </div>
  );
};

export default StatCard;

