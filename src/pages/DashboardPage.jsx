import React from "react";
import { Row, Col, Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./Dashboard.css";
import StatCard from "../components/Dashboard/StatCard";
import DashboardChart from "../components/Dashboard/DashboardChart";
import RepairClaimModal from "../components/claim/RepairClaimModal";

const DashboardPage = () => {
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

  // Claims data
  const claimsData = {
    totalClaims: {
      value: "4",
      icon: "/task.svg",
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

  // Chart data (simplified for this example)
  const chartData = [
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
  ];

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
        <Dropdown menu={{ items: dateItems }} trigger={["click"]}>
          <a className="text-muted" onClick={(e) => e.preventDefault()}>
            <Space>
              Today
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>

      {/* Overview Section */}
      <Row gutter={[24, 24]}>
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
            title="Pending Payouts"
            value={overviewData.pendingPayouts.value}
            icon={overviewData.pendingPayouts.icon}
            iconClass="gold-bg"
            change={overviewData.pendingPayouts.change}
          />
        </Col>
      </Row>
      

      {/* Claims Breakdown Section */}
      <h2 className="section-title">Claims Breakdown</h2>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Claims Filed"
            value={claimsData.totalClaims.value}
            icon={claimsData.totalClaims.icon}
            iconClass="blue-outline"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Pending Review"
            value={claimsData.pendingReview.value}
            icon={claimsData.pendingReview.icon}
            iconClass="yellow-outline"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Approved Claims"
            value={claimsData.approvedClaims.value}
            icon={claimsData.approvedClaims.icon}
            iconClass="green-outline"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Queried Claims"
            value={claimsData.queriedClaims.value}
            icon={claimsData.queriedClaims.icon}
            iconClass="red-outline"
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
          <h3 style={{ margin: 0 }}>Claims by Device</h3>
          <div className="filter-buttons">
            <Button type="primary" className="active">
              Today
            </Button>
            <Button>Last 7 Days</Button>
            <Button>Last 30 Days</Button>
            <Button>Last 1 Year</Button>
          </div>
        </div>
        <DashboardChart data={chartData} />
      </div>
    </div>
  );
};

export default DashboardPage;