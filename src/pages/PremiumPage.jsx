import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Tabs,
  Input,
  Select,
  Dropdown,
  Space,
  Menu,
  message,
} from "antd";
import {
  DownOutlined,
  CaretDownOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import StatCard from "../components/Dashboard/StatCard";
import CustomGrid from "../components/CustomGrid/CustomGrid";
import { generatePremiumReportPDF } from "../utils/pdfUtils";

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

const PremiumPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("unremitted");
  const pageSize = 10;

  // Data for stat cards
  const premiumStats = {
    totalPremium: {
      value: "₦ 40,689",
      change: -18.5,
      icon: "/taskred.svg",
    },
    remittedPremium: {
      value: "₦ 40,689",
      change: -46.5,
      icon: "/empty-wallet-time.svg",
    },
    unremittedPremium: {
      value: "₦ 40,689",
      change: 8.5,
      icon: "/shield-tick.svg",
    },
  };

  // Sample data for unremitted premium records
  const unremittedPremiumData = Array(30)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      deviceId: `#0001`,
      imeiNumber: "356789123456789",
      brand: "Samsung",
      model: "Galaxy S22",
      totalSumInsured: "₦750,000",
      premium: "₦7,000",
      premiumStatus: index % 3 === 0 ? "Pending" : "Paid",
      claims: "3",
      subscription: "Active",
    }));

  // Sample data for remitted premium records
  const remittedPremiumData = Array(30)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      sn: `0${index + 1}`.slice(-2),
      dateRange: `Apr 1-Jun 30 2025`,
      noOfDevices: "5",
      totalPremium: "₦23,345",
      paymentStatus: "Paid",
      date: `2025-01-${15 + index}`,
    }));

  // Calculate total items based on active tab
  const totalItems =
    activeTab === "unremitted"
      ? unremittedPremiumData.length
      : remittedPremiumData.length;

  // Calculate the current page's data based on active tab
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentPageData =
    activeTab === "unremitted"
      ? unremittedPremiumData.slice(startIndex, endIndex)
      : remittedPremiumData.slice(startIndex, endIndex);

  // Columns configuration for unremitted premium records
  const unremittedColumns = [
    {
      title: "Device ID",
      dataIndex: "deviceId",
      key: "deviceId",
    },
    {
      title: "IMEI Number",
      dataIndex: "imeiNumber",
      key: "imeiNumber",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Total Sum Insured",
      dataIndex: "totalSumInsured",
      key: "totalSumInsured",
    },
    {
      title: "Premium",
      dataIndex: "premium",
      key: "premium",
    },
    {
      title: "Premium Status",
      dataIndex: "premiumStatus",
      key: "premiumStatus",
      render: (value) => (
        <PremiumStatusBadge
          className={value === "Pending" ? "pending" : "paid"}
        >
          {value}
        </PremiumStatusBadge>
      ),
    },
    {
      title: "Claims",
      dataIndex: "claims",
      key: "claims",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      render: (value) => (
        <SubscriptionBadge
          className={value === "Active" ? "active" : "inactive"}
        >
          {value}
        </SubscriptionBadge>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <ActionDropdown
          overlay={
            <Menu onClick={(e) => handleMenuClick(e, record)}>
              <Menu.Item key="1">View Details</Menu.Item>
              <Menu.Item key="2">Edit Premium</Menu.Item>
              <Menu.Item key="3">Cancel Subscription</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <ViewButton>
            View Details <CaretDownOutlined />
          </ViewButton>
        </ActionDropdown>
      ),
    },
  ];

  // Columns configuration for remitted premium records
  const remittedColumns = [
    {
      title: "S/N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Date Range",
      dataIndex: "dateRange",
      key: "dateRange",
    },
    {
      title: "No. of devices",
      dataIndex: "noOfDevices",
      key: "noOfDevices",
    },
    {
      title: "Total Premium",
      dataIndex: "totalPremium",
      key: "totalPremium",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (value) => (
        <PremiumStatusBadge className="paid">{value}</PremiumStatusBadge>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <ActionDropdown
          overlay={
            <Menu onClick={(e) => handleRemittedMenuClick(e, record)}>
              <Menu.Item key="1">Download Report</Menu.Item>
              <Menu.Item key="2">View Proof of Payment</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <ViewButton>
            View <CaretDownOutlined />
          </ViewButton>
        </ActionDropdown>
      ),
    },
  ];

  const handleMenuClick = (e, record) => {
    const key = e.key;
    switch (key) {
      case "1": // View Details
        console.log("View Details for", record);
        break;
      case "2": // Edit Premium
        console.log("Edit Premium for", record);
        break;
      case "3": // Cancel Subscription
        console.log("Cancel Subscription for", record);
        break;
      default:
        break;
    }
  };

  const handleRemittedMenuClick = (e, record) => {
    const key = e.key;
    switch (key) {
      case "1": // Download Report
        console.log("Download Report for", record);
        // Generate premium report PDF
        generatePremiumReportPDF({
          reportId: `RPT${Math.floor(100000 + Math.random() * 900000)}`,
          generatedBy: "Admin 1/Michael James",
          generatedOn: new Date()
            .toISOString()
            .replace("T", " ")
            .substring(0, 16),
          version: "1.0",
          totalDevices: 10,
          totalPremium: record.totalPremium || "₦100,000",
          totalSumInsured: "₦200,000",
          devices: Array(5).fill({
            deviceId: "#0001",
            brand: "Samsung",
            model: "Galaxy S20",
            imei: "356789123456789",
            totalSumInsured: "₦723,345",
            premium: "₦123,345",
            date: record.date || "2025-01-15",
          }),
        });
        message.success("Premium report downloaded successfully");
        break;
      case "2": // View Proof of Payment
        console.log("View Proof of Payment for", record);
        break;
      default:
        break;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  return (
    <PremiumPageContainer>
      {/* Stats Cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <StatCard
            title="Total Premium"
            value={premiumStats.totalPremium.value}
            icon={premiumStats.totalPremium.icon}
            iconClass="pink-bg"
            change={premiumStats.totalPremium.change}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatCard
            title="Total Remitted Premium"
            value={premiumStats.remittedPremium.value}
            icon={premiumStats.remittedPremium.icon}
            iconClass="gold-bg"
            change={premiumStats.remittedPremium.change}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatCard
            title="Total Unremitted Premium"
            value={premiumStats.unremittedPremium.value}
            icon={premiumStats.unremittedPremium.icon}
            iconClass="green-bg"
            change={premiumStats.unremittedPremium.change}
          />
        </Col>
      </Row>

      {/* Tabs and Table */}
      <PremiumTabsSection>
        <div className="tabs-header">
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Unremitted Premiums" key="unremitted" />
            <TabPane tab="Remitted Premiums" key="remitted" />
          </Tabs>
        </div>

        <div className="filters-container">
          <div className="filters-label">Filter by:</div>
          <div className="filters">
            <Select defaultValue="" className="filter-select">
              <Option value="">Date</Option>
              <Option value="today">Today</Option>
              <Option value="yesterday">Yesterday</Option>
              <Option value="last7days">Last 7 Days</Option>
              <Option value="last30days">Last 30 Days</Option>
            </Select>

            {activeTab === "unremitted" && (
              <>
                <Select defaultValue="" className="filter-select">
                  <Option value="">Brand</Option>
                  <Option value="samsung">Samsung</Option>
                  <Option value="apple">Apple</Option>
                  <Option value="google">Google</Option>
                  <Option value="others">Others</Option>
                </Select>

                <Select defaultValue="" className="filter-select">
                  <Option value="">Status</Option>
                  <Option value="active">Active</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </>
            )}

            <Search placeholder="Search" className="search-input" />
          </div>
        </div>

        {/* Premium Records Grid */}
        <CustomGrid
          columns={
            activeTab === "unremitted" ? unremittedColumns : remittedColumns
          }
          data={currentPageData}
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </PremiumTabsSection>
    </PremiumPageContainer>
  );
};

const PremiumPageContainer = styled.div`
  padding: 16px;
  background-color: #f8fafc;

  /* Add pink-bg class for the first card */
  .pink-bg {
    background-color: rgba(239, 68, 136, 0.1);
    color: rgb(239, 68, 136);
  }
`;

const PremiumTabsSection = styled.div`
  margin-top: 24px;
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .tabs-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .ant-tabs-nav {
    margin-bottom: 0;
  }

  .filters-container {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }

  .filters-label {
    font-weight: 500;
    margin-right: 16px;
  }

  .filters {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .filter-select {
    min-width: 150px;
  }

  .search-input {
    width: 240px;
  }
`;

const PremiumStatusBadge = styled.div`
  display: inline-block;
  padding: 4px 12px;
  font-size: 14px;

  &.pending {
    background-color: #fff8e1;
    color: #f59e0b;
  }

  &.paid {
    background-color: #e8f5e9;
    color: #10b981;
  }
`;

const SubscriptionBadge = styled.div`
  display: inline-block;
  padding: 4px 12px;
  font-size: 14px;

  &.active {
    background-color: #e8f5e9;
    color: #10b981;
  }

  &.inactive {
    background-color: #ffebee;
    color: #ef4444;
  }
`;

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 5px 15px;
  cursor: pointer;
  font-size: 14px;
`;

const ActionDropdown = styled(Dropdown)`
  .ant-dropdown-menu {
    padding: 5px 0;
  }

  .ant-dropdown-menu-item {
    padding: 8px 16px;
  }
`;

export default PremiumPage;
