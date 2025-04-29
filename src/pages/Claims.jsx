import React, { useState } from "react";
import { Card, Input, Select, DatePicker, Button } from "antd";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import CustomGrid from "../components/CustomGrid/CustomGrid";
// import RepairDetailsModal from "../components/RepairDetailsModal/RepairDetailsModal";
// import { printRepairsReport } from "../utils/printUtils";

const { Search } = Input;

const Claims = () => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const pageSize = 10;

  // Generate sample data
  const allData = Array(45)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      claimId: `PLU${3766 + index}`,
      deviceId: `IP${12567 + index}`,
      deviceModel: "iPhone 13 Pro MAX",
      issue: "Damaged screen",
      amount: "25000.00",
      status:
        index % 5 === 0
          ? "Awaiting"
          : index % 5 === 1
          ? "Approved"
          : index % 5 === 2
          ? "Completed"
          : index % 5 === 3
          ? "Paid"
          : "Rejected",
      teamMember: "John Doe",
      company: "Mona Tech",
      customerName: "John Doe",
      customerPhone: "08143789883",
      date: "Dec 6, 2024",
    }));

  // Calculate total items from the actual data
  const totalItems = allData.length;

  // Calculate the current page's data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = allData.slice(startIndex, endIndex);

  const handleViewDetails = (record) => {
    setSelectedDevice(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Claim id",
      dataIndex: "claimId",
      key: "claimId",
    },
    {
      title: "Device id",
      dataIndex: "deviceId",
      key: "deviceId",
    },
    {
      title: "Device model",
      dataIndex: "deviceModel",
      key: "deviceModel",
    },
    {
      title: "Issue",
      dataIndex: "issue",
      key: "issue",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value) => <span className="date">{value}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (value) => <span className="commission">₦{value}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        const getStatusStyle = (status) => {
          const styles = {
            awaiting: { background: "#FFF8E1", color: "#F57C00" },
            approved: { background: "#E3F2FD", color: "#1976D2" },
            completed: { background: "#E3F2FD", color: "#1976D2" },
            paid: { background: "#E8F5E9", color: "#2E7D32" },
            rejected: { background: "#FFEBEE", color: "#D32F2F" },
          };
          return styles[status.toLowerCase()] || {};
        };

        return (
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "4px",
              fontSize: "14px",
              ...getStatusStyle(value),
            }}
          >
            {value}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <Button
          type="primary"
          ghost
          className="view-details-btn"
          onClick={() => handleViewDetails(record)}
          style={{
            borderColor: "#004AAD",
            color: "#004AAD",
            borderRadius: "0",
          }}
        >
          View More
        </Button>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      style={{
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        borderRadius: "0",
        padding: "16px",
      }}
    >
      <div className="sales-page">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            gap: "16px",
          }}
        >
          <h5>Repair Claims</h5>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Filter by:</span>
              <Select
                placeholder="Status"
                style={{ width: "200px" }}
                onChange={(value) => setSelectedStatus(value)}
                options={[
                  { value: "awaiting", label: "Awaiting" },
                  { value: "approved", label: "Approved" },
                  { value: "completed", label: "Completed" },
                  { value: "paid", label: "Paid" },
                  { value: "rejected", label: "Rejected" },
                ]}
              />
              <Select
                placeholder="Date"
                style={{ width: "200px" }}
                onChange={(value) => setSelectedStatus(value)}
                options={[
                  { value: "today", label: "Today" },
                  { value: "yesterday", label: "Yesterday" },
                  { value: "last7days", label: "Last 7 Days" },
                  { value: "last30days", label: "Last 30 Days" },
                  { value: "thisMonth", label: "This Month" },
                  { value: "lastMonth", label: "Last Month" },
                  { value: "custom", label: "Custom Range" },
                ]}
              />
              <Select
                placeholder="Other"
                style={{ width: "200px" }}
                onChange={(value) => setSelectedStatus(value)}
                options={[
                  { value: "awaiting", label: "Awaiting" },
                  { value: "approved", label: "Approved" },
                  { value: "completed", label: "Completed" },
                  { value: "paid", label: "Paid" },
                  { value: "rejected", label: "Rejected" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <CustomGrid
          columns={columns}
          data={currentPageData}
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Claims;
