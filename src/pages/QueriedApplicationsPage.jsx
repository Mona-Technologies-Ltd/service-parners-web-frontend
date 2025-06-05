import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Select, Button } from "antd";
import CustomGrid from "../components/CustomGrid/CustomGrid";
import { Icon } from "@iconify/react";
import QueriedApplicationDetailsModal from "../components/QueriedApplicationDetailsModal";

const QueriedApplicationsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pageSize = 10;
  const [dateFilter, setDateFilter] = useState("");
const [otherFilter, setOtherFilter] = useState("");


  // Mock data for queried applications
  const queriedApplicationsData = Array(120)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      claimId: "#0001",
      deviceBrand: "iPhone",
      model: "iPhone 13 Pro MAX 1",
      issueType: "Damaged Screen",
      amount: "#23,345",
      dateQueried: "2025-02-27",
      newMessages: [4, 1, 0, 0][index % 4], // Cycle through message counts
    }));
const applyFilters = (data) => {
  return data.filter((item) => {
    let dateMatch = true;
    let otherMatch = true;

    // Filter by date
    if (dateFilter) {
      const today = new Date();
      const itemDate = new Date(item.dateQueried);

      switch (dateFilter) {
        case "today":
          dateMatch = itemDate.toDateString() === today.toDateString();
          break;
        case "yesterday":
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);
          dateMatch = itemDate.toDateString() === yesterday.toDateString();
          break;
        case "last7days":
          const last7 = new Date();
          last7.setDate(today.getDate() - 7);
          dateMatch = itemDate >= last7;
          break;
        case "last30days":
          const last30 = new Date();
          last30.setDate(today.getDate() - 30);
          dateMatch = itemDate >= last30;
          break;
        default:
          break;
      }
    }

    // Filter by issue type (otherFilter)
    if (otherFilter) {
      otherMatch =
        item.issueType.toLowerCase() === otherFilter.toLowerCase();
    }

    return dateMatch && otherMatch;
  });
};

const filteredData = applyFilters(queriedApplicationsData);
const totalItems = filteredData.length;

const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
const currentPageData = filteredData.slice(startIndex, endIndex);

  // Calculate current page data
  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = startIndex + pageSize;
  // const currentPageData = queriedApplicationsData.slice(startIndex, endIndex);
  // const totalItems = queriedApplicationsData.length;

  const handleViewClick = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
  };

  const columns = [
    {
      title: "Claim ID",
      dataIndex: "claimId",
      key: "claimId",
    },
    {
      title: "Device Brand",
      dataIndex: "deviceBrand",
      key: "deviceBrand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Issue Type",
      dataIndex: "issueType",
      key: "issueType",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date Queried",
      dataIndex: "dateQueried",
      key: "dateQueried",
    },
    {
      title: "New Message",
      dataIndex: "newMessages",
      key: "newMessages",
      render: (count) => {
        // Only render the notification badge if count > 0
        if (count > 0) {
          const badgeColor =
            count === 4 ? "#FF0000" : count === 1 ? "#FF0000" : "#FF0000";
          return (
            <NotificationBadge style={{ backgroundColor: badgeColor }}>
              {count}
            </NotificationBadge>
          );
        }
        return (
          <NotificationBadge style={{ backgroundColor: "#FF0000" }}>
            0
          </NotificationBadge>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <ActionButton
          className="action-button"
          onClick={() => handleViewClick(record)}
        >
          View
        </ActionButton>
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
      <ButtonStyleOverrides />
      <Container>
        <Header>
          <Title>Queried Applications</Title>
          <FilterSection>
  <FilterLabel>Filter by:</FilterLabel>
  <SelectWrapper>
    <Select
      value={dateFilter}
      onChange={(value) => setDateFilter(value)}
      placeholder="Date"
      style={{ width: 150 }}
      suffixIcon={<ArrowIcon />}
    >
      <Select.Option value="">All Dates</Select.Option>
      <Select.Option value="today">Today</Select.Option>
      <Select.Option value="yesterday">Yesterday</Select.Option>
      <Select.Option value="last7days">Last 7 Days</Select.Option>
      <Select.Option value="last30days">Last 30 Days</Select.Option>
    </Select>
  </SelectWrapper>
  <SelectWrapper>
    <Select
      value={otherFilter}
      onChange={(value) => setOtherFilter(value)}
      placeholder="Other"
      style={{ width: 150 }}
      suffixIcon={<ArrowIcon />}
    >
      <Select.Option value="">All Issues</Select.Option>
      <Select.Option value="Damaged Screen">Damaged Screen</Select.Option>
      <Select.Option value="Battery Issue">Battery Issue</Select.Option>
      <Select.Option value="Water Damage">Water Damage</Select.Option>
    </Select>
  </SelectWrapper>
</FilterSection>

          {/* <FilterSection>
            <FilterLabel>Filter by:</FilterLabel>
            <SelectWrapper>
              <Select
                placeholder="Date"
                style={{ width: 150 }}
                suffixIcon={<ArrowIcon />}
              />
            </SelectWrapper>
            <SelectWrapper>
              <Select
                placeholder="Other"
                style={{ width: 150 }}
                suffixIcon={<ArrowIcon />}
              />
            </SelectWrapper>
          </FilterSection> */}
        </Header>

        <div className="queried-applications-page">
          <CustomGrid
            columns={columns}
            data={currentPageData}
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>

        <QueriedApplicationDetailsModal
          visible={showModal}
          onClose={handleCloseModal}
          application={selectedApplication}
        />
      </Container>
    </div>
  );
};

// Global style overrides for antd buttons on this page
const ButtonStyleOverrides = createGlobalStyle`
  .queried-applications-page .ant-btn:hover,
  .queried-applications-page .ant-btn:focus {
    color: inherit;
    border-color: inherit;
    background: inherit;
  }
`;

// Styled Components
const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
`;

const FilterLabel = styled.span`
  margin-right: 12px;
  font-weight: 600;
`;

const SelectWrapper = styled.div`
  margin-right: 12px;
`;

const ArrowIcon = styled(Icon).attrs({
  icon: "mdi:chevron-down",
  width: "16",
  height: "16",
})`
  color: #666;
`;

const NotificationBadge = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ff0000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

const ActionButton = styled(Button)`
  background: #0066cc !important;
  color: white !important;
  border: none !important;
  border-radius: 4px;
  height: 32px;
  padding: 0 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover,
  &:focus {
    background: #0052a3 !important;
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export default QueriedApplicationsPage;
