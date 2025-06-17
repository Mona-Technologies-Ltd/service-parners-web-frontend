import React, { useState } from "react";
import { Card, Input, Select, DatePicker, Button } from "antd";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import CustomGrid from "../components/CustomGrid/CustomGrid";
import RepairClaimModal from "../components/claim/RepairClaimModal";
// import RepairDetailsModal from "../components/RepairDetailsModal/RepairDetailsModal";
// import { printRepairsReport } from "../utils/printUtils";

const { Search } = Input;

const Claims = () => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
const [dateFilter, setDateFilter] = useState(null);
const [otherFilter, setOtherFilter] = useState(null);

  const pageSize = 10;

  // Generate sample data
    // const allData = Array(45)
    //   .fill(null)
    //   .map((_, index) => ({
    //     id: index + 1,
    //     claimId: `PLU${3766 + index}`,
    //     deviceId: `IP${12567 + index}`,
    //     deviceModel: "iPhone 13 Pro MAX",
    //     issue: "Damaged screen",
    //     amount: "25000.00",
    //     status:
    //       index % 5 === 0
    //         ? "Awaiting"
    //         : index % 5 === 1
    //         ? "Approved"
    //         : index % 5 === 2
    //         ? "Completed"
    //         : index % 5 === 3
    //         ? "Paid"
    //         : "Rejected",
    //     teamMember: "John Doe",
    //     company: "Mona Tech",
    //     customerName: "John Doe",
    //     customerPhone: "08143789883",
    //     date: "Dec 6, 2024",
    //   }));
const allData = [
  {
    id: 1,
    claimId: "PLU3766",
    deviceId: "IP12567",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Awaiting",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: true,
    excess: "#12,000",
    
  },
  {
    id: 2,
    claimId: "PLU3767",
    deviceId: "IP12568",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Approved",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : false,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: true,
    excess: "#25,000",
  },
  {
    id: 3,
    claimId: "PLU3768",
    deviceId: "IP12569",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Completed",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : false,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: false,
    excess: "#22,000",
  },
  {
    id: 4,
    claimId: "PLU3769",
    deviceId: "IP12570",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Paid",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: true,
    excess: "#2,000",
  },
  {
    id: 5,
    claimId: "PLU3770",
    deviceId: "IP12571",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Rejected",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: false,
    excess: "#32,000",
  },
  {
    id: 6,
    claimId: "PLU3771",
    deviceId: "IP12572",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Awaiting",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: true,
    excess: "#2,000",
  },
  {
    id: 7,
    claimId: "PLU3772",
    deviceId: "IP12573",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Approved",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : false,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: false,
    excess: "#22,000",
  },
  {
    id: 8,
    claimId: "PLU3773",
    deviceId: "IP12574",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Completed",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: true,
    excess: "#2,000",
  },
  {
    id: 9,
    claimId: "PLU3774",
    deviceId: "IP12575",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Paid",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: false,
    excess: "#2,000",
  },
  {
    id: 10,
    claimId: "PLU3775",
    deviceId: "IP12576",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Rejected",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : false,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: true,
    excess: "#12,000",
  },
{
    id: 11,
    claimId: "PLU3776",
    deviceId: "IP12577",
    deviceModel: "iPhone 14 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Rejected",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 16, 2024",
     isExcess: true,
    excess: "#12,000",
  },{
    id: 12,
    claimId: "PLU3776",
    deviceId: "IP12577",
    deviceModel: "iPhone 15 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Rejected",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: false,
    excess: "#12,000",
  },{
    id: 13,
    claimId: "PLU3778",
    deviceId: "IP12578",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Rejected",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : false,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: false,
    excess: "#2,000",
  },{
    id: 14,
    claimId: "PLU3775",
    deviceId: "IP12576",
    deviceModel: "iPhone 16 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Rejected",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: true,
    excess: "#42,000",
  },{
    id: 15,
    claimId: "PLU3775",
    deviceId: "IP12576",
    deviceModel: "iPhone 11 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Rejected",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: false,
    excess: "#2,000",
  },{
    id: 16,
    claimId: "PLU3775",
    deviceId: "IP12576",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Rejected",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : false,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: true,
    excess: "#2,000",
  },{
    id: 17,
    claimId: "PLU37751",
    deviceId: "IP12576",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Rejected",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : false,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: true,
    excess: "#2,000",
  },{
    id: 18,
    claimId: "PLU37755",
    deviceId: "IP12576",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Rejected",
    teamMember: "John Doe",
    company: "Mona Tech",
    isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: false,
    excess: "#2,000",
  },{
    id: 19,
    claimId: "PLU3775",
    deviceId: "IP12576",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Rejected",
    teamMember: "John Doe",
    company: "Mona Tech",
     isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: false,
    excess: "#2,000",
  },{
    id: 20,
    claimId: "PLU37751",
    deviceId: "IP12576",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Rejected",
    teamMember: "John Doe",
    company: "Mona Tech",
     isQuery : false,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: true,
    excess: "#2,000",
  },];

  // Calculate total items from the actual data
  // const totalItems = allData.length;

  // Calculate the current page's data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  // const currentPageData = allData.slice(startIndex, endIndex);

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
              // borderRadius: "4px",
              fontSize: "14px",
              ...getStatusStyle(value),
            }}

            className="status_coloring"
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
const isWithinDateRange = (itemDate, filter) => {
  const today = new Date();
  const item = new Date(itemDate);
 let last30;
 let last7;
let yesterday;
let lastMonth;
  switch (filter) {
    case "today":
      return item.toDateString() === today.toDateString();
    case "yesterday":
      yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return item.toDateString() === yesterday.toDateString();
    case "last7days":
       last7 = new Date(today);
      last7.setDate(today.getDate() - 7);
      return item >= last7 && item <= today;
    case "last30days":
      last30 = new Date(today);
      last30.setDate(today.getDate() - 30);
      return item >= last30 && item <= today;
    case "thisMonth":
      return (
        item.getMonth() === today.getMonth() &&
        item.getFullYear() === today.getFullYear()
      );
    case "lastMonth":
      lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      return (
        item.getMonth() === lastMonth.getMonth() &&
        item.getFullYear() === lastMonth.getFullYear()
      );
    default:
      return true;
  }
};
// Filter data before pagination
const filteredData = allData.filter((item) => {
  const matchesStatus = statusFilter
    ? item.status.toLowerCase() === statusFilter
    : true;

  const matchesOther = otherFilter
    ? item.status.toLowerCase() === otherFilter
    : true;

  const matchesDate = dateFilter
    ? isWithinDateRange(item.date, dateFilter)
    : true;

  return matchesStatus && matchesOther && matchesDate;
});

const totalItems = filteredData.length;
const currentPageData = filteredData.slice(startIndex, endIndex);

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
            <div style={{ display: "flex", alignItems: "center", gap: "8px", height:'1rem' }}>
              <span>Filter by:</span>
              <Select
  placeholder="Status"
  style={{ width: "200px" }}
  onChange={(value) => setStatusFilter(value)}
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
  onChange={(value) => setDateFilter(value)}
  options={[
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last7days", label: "Last 7 Days" },
    { value: "last30days", label: "Last 30 Days" },
    { value: "thisMonth", label: "This Month" },
    { value: "lastMonth", label: "Last Month" },
  ]}
/>

<Select
  placeholder="Other"
  style={{ width: "200px" }}
  onChange={(value) => setOtherFilter(value)}
  options={[
    { value: "awaiting", label: "Awaiting" },
    { value: "approved", label: "Approved" },
    { value: "completed", label: "Completed" },
    { value: "paid", label: "Paid" },
    { value: "rejected", label: "Rejected" },
  ]}
/>

              {/* <Select
                placeholder="Status"
                style={{ width: "200px"}}
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
                className="select_filter"
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
              /> */}
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
      {isModalOpen &&   
      (<RepairClaimModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      device={selectedDevice}
    />)}

      </div>
    </div>
  );
};

export default Claims;
