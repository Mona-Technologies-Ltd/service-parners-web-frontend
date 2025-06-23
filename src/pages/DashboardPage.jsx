import React, { useState, useMemo } from "react";
import { Row, Col, Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./Dashboard.css";
import StatCard from "../components/Dashboard/DashboardStats";
import DashboardChart from "../components/Dashboard/DashboardChart";
import RepairClaimModal from "../components/claim/RepairClaimModal";

const DashboardPage = () => {
  const [filter, setFilter] = useState("all");

  // Overview data
  const overviewData = {
    totalRemitted: {
      value: "₦ 40,689",
      change: -18.5,
      icon: "/shield-security.svg",
    },
    activeDevices: {
      value: "30",
      change: 8.5,
      icon: "/devices.svg",
    },
    totalUnremitted: {
      value: "₦ 40,689",
      change: -46.5,
      icon: "/shield-security-yellow.svg",
    },
    pendingPayouts: {
      value: "₦ 40,689",
      change: 8.5,
      icon: "/empty-wallet-time.svg",
    },
  };

  const claimsData = {
    totalClaims: {
      value: "4",
      icon: "/taskeys.svg",
    },
    pendingReview: {
      value: "4",
      icon: "/clock.svg",
    },
    approvedClaims: {
      value: "4",
      icon: "/tick-circle.svg",
    },
    queriedClaims: {
      value: "4",
      icon: "/close-circle.svg",
    },
  };

  // Chart data for all timeframes
const chartDataMap = {
  all: [
    { name: "Broken Screen Composite", value: 15 },
    { name: "Broken (Inner Screen Only)", value: 10 },
    { name: "Back Camera not Working", value: 20 },
    { name: "Broken Outer Screen Only", value: 30 },
    { name: "Not Charging", value: 15 },
    { name: "Back Housing/ Cover", value: 20 },
    { name: "Front Camera not Working", value: 15 },
    { name: "Sim card slot not working", value: 30 },
    { name: "Water Damage", value: 22 },
    { name: "Smashed Device", value: 14 },
    { name: "Auto Issues (Not Audio Speaker)", value: 6 },
    { name: "Wi-Fi Bluetooth not working", value: 24 },
    { name: "Motherboard Issues", value: 16 },
  ],
  today: [
    { name: "Broken Screen Composite", value: 15 },
    { name: "Broken (Inner Screen Only)", value: 10 },
  ],
  week: [
    { name: "Broken Screen Composite", value: 15 },
    { name: "Broken (Inner Screen Only)", value: 10 },
    { name: "Back Camera not Working", value: 20 },
  ],
  month: [
    { name: "Broken Screen Composite", value: 15 },
    { name: "Broken (Inner Screen Only)", value: 10 },
    { name: "Not Charging", value: 15 },
    { name: "Sim card slot not working", value: 30 },
  ],
  year: [
    { name: "Broken Screen Composite", value: 15 },
    { name: "Broken (Inner Screen Only)", value: 10 },
    { name: "Broken Outer Screen Only", value: 30 },
    { name: "Not Charging", value: 15 },
    { name: "Back Housing/ Cover", value: 20 },
    { name: "Back Camera not Working", value: 3 },
    { name: "Front Camera not Working", value: 15 },
    { name: "Sim card slot not working", value: 30 },
    { name: "Water Damage", value: 22 },
    { name: "Smashed Device", value: 14 },
    { name: "Auto Issues (Not Audio Speaker)", value: 6 },
    { name: "Wi-Fi Bluetooth not working", value: 24 },
    { name: "Motherboard Issues", value: 16 },
  ],
};


  const chartData = useMemo(() => chartDataMap[filter], [filter]);

  const dateItems = [
    { key: "today", label: "Today" },
    { key: "week", label: "Last 7 Days" },
    { key: "month", label: "Last 30 Days" },
    { key: "year", label: "Last 1 Year" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Overview</h1>
      
      </div>

      {/* Overview Section */}
<Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
  <Col xs={24} sm={12} lg={6}>
    <StatCard
      title="Total Remitted Premium"
      value={overviewData.totalRemitted.value}
      icon={overviewData.totalRemitted.icon}
      iconClass="blue-bg"
      change={overviewData.totalRemitted.change}
    />
  </Col>
  <Col xs={24} sm={12} lg={6}>
    <StatCard
      title="Active Devices"
      value={overviewData.activeDevices.value}
      icon={overviewData.activeDevices.icon}
      iconClass="green-bg"
      change={overviewData.activeDevices.change}
      footer="Total Sum Insured ₦40,689"
    />
  </Col>
  <Col xs={24} sm={12} lg={6}>
    <StatCard
      title="Total Unremitted Premium"
      value={overviewData.totalUnremitted.value}
      icon={overviewData.totalUnremitted.icon}
      iconClass="yellow-bg"
      change={overviewData.totalUnremitted.change}
    />
  </Col>
  <Col xs={24} sm={12} lg={6}>
    <StatCard
      title="Payouts Awaiting Confirmation"
      value={overviewData.pendingPayouts.value}
      icon={overviewData.pendingPayouts.icon}
      iconClass="gold-bg"
      change={overviewData.pendingPayouts.change}
    />
  </Col>
</Row>

{/* Claims Breakdown Section */}
<h2 className="section-title" style={{ marginTop: "24px" }}>Claims Breakdown</h2>
<Row gutter={[24, 24]}>
  <Col xs={24} sm={12} lg={6}>
    <StatCard
      title="Total Claims Filed"
      value={claimsData.totalClaims.value}
      icon={claimsData.totalClaims.icon}
      iconClass="blue-outline"
      footer="₦40,689"
    />
  </Col>
  <Col xs={24} sm={12} lg={6}>
    <StatCard
      title="Pending Review"
      value={claimsData.pendingReview.value}
      icon={claimsData.pendingReview.icon}
      iconClass="yellow-outline"
      footer="₦40,689"
    />
  </Col>
  <Col xs={24} sm={12} lg={6}>
    <StatCard
      title="Approved Claims"
      value={claimsData.approvedClaims.value}
      icon={claimsData.approvedClaims.icon}
      iconClass="green-outline"
      footer="₦40,689"
    />
  </Col>
  <Col xs={24} sm={12} lg={6}>
    <StatCard
      title="Queried Claims"
      value={claimsData.queriedClaims.value}
      icon={claimsData.queriedClaims.icon}
      iconClass="red-outline"
      footer="₦40,689"
    />
  </Col>
</Row>


      {/* Claims by Device Section */}
      <div className="claims-by-device">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h3 >Claims by Device</h3>
      <div className="filter-buttons">
  <Button type={filter === "all" ? "primary" : "default"} onClick={() => setFilter("all")} id="btn_claims">
    All
  </Button>
  <Button type={filter === "today" ? "primary" : "default"} onClick={() => setFilter("today")} id="btn_claims">
    Today
  </Button>
  <Button type={filter === "week" ? "primary" : "default"} onClick={() => setFilter("week")} id="btn_claims">
    Last 7 Days
  </Button>
  <Button type={filter === "month" ? "primary" : "default"} onClick={() => setFilter("month")} id="btn_claims">
    Last 30 Days
  </Button>
  <Button type={filter === "year" ? "primary" : "default"} onClick={() => setFilter("year")} id="btn_claims">
    Last 1 Year
  </Button>
</div>

        </div>
        <DashboardChart data={chartData} />
      </div>
    </div>
  );
};

export default DashboardPage;
