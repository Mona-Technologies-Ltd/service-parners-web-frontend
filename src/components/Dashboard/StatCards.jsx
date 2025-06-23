import React from 'react';
import './DashboardStats.css';
import { Icon } from '@iconify/react';

const StatCard = ({ title, value, icon, change, changeType, subText }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <h4>{title}</h4>
        <div className="icon-circle">{icon}</div>
      </div>
      <div className="stat-body">
        <h2>{value}</h2>
        {change && (
          <div className={`stat-change ${changeType}`}>
            <span>{changeType === 'down' ? '▼' : '▲'}</span>
            <span>{change}</span>
            <span>From last week</span>
          </div>
        )}
        {subText && <div className="stat-subtext">{subText}</div>}
      </div>
    </div>
  );
};

const DashboardStats = () => {
  return (
    <div className="dashboard-container">
      <h3>Overview</h3>
      <div className="stats-grid">
        <StatCard
          title="Total Remitted Premium"
          value="₦ 40,689"
          icon={<Icon icon="mdi:shield-check" />}
          change="-18.5%"
          changeType="down"
        />
        <StatCard
          title="Active Devices"
          value="30"
          icon={<Icon icon="mdi:devices" />}
          change="8.5%"
          changeType="up"
          subText="Total Sum Insured  ₦40,689"
        />
        <StatCard
          title="Total Unremitted Premium"
          value="₦ 40,689"
          icon={<Icon icon="mdi:shield-alert" />}
          change="-46.5%"
          changeType="down"
        />
        <StatCard
          title="Payouts Awaiting Confirmation"
          value="₦ 40,689"
          icon={<Icon icon="mdi:cash-check" />}
          change="8.5%"
          changeType="up"
        />
      </div>

      <h3>Claims Breakdown</h3>
      <div className="stats-grid">
        <StatCard
          title="Total Claims Filed"
          value="4"
          icon={<Icon icon="mdi:clipboard-list-outline" />}
        />
        <StatCard
          title="Pending Review"
          value="4"
          subText="₦40,689"
          icon={<Icon icon="mdi:clock-outline" />}
        />
        <StatCard
          title="Approved Claims"
          value="4"
          subText="₦40,689"
          icon={<Icon icon="mdi:check-circle-outline" />}
        />
        <StatCard
          title="Queried Claims"
          value="4"
          subText="₦40,689"
          icon={<Icon icon="mdi:close-circle-outline" />}
        />
      </div>
    </div>
  );
};

export default DashboardStats;
