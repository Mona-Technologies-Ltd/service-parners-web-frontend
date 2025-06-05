import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Select, Input, Button, message } from "antd";
import CustomGrid from "../components/CustomGrid/CustomGrid";
import { generateDeviceReportPDF } from "../utils/pdfUtils";

const DevicesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Devices");
  const [selectedDeviceModel, setSelectedDeviceModel] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Mock data for the devices table
  const allDevicesData = Array(120)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      deviceId: "#0001",
      imeiNumber: "356789123456789",
      brand: "Samsung",
      model: "Galaxy S22",
      totalSumInsured: "#750,000",
      premium: "#7,000",
      premiumStatus:
        index % 3 === 0 ? "Pending" : index % 3 === 1 ? "Paid" : "Pending",
      claims: 3,
      subscription: "Active",
    }));
const filteredDevices = allDevicesData.filter((device) => {
  const matchesModel =
    !selectedDeviceModel || device.model === selectedDeviceModel;

  const matchesStatus =
    !selectedStatus ||
    device.premiumStatus.toLowerCase() === selectedStatus.toLowerCase();

  const matchesSearch =
    !searchQuery ||
    device.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.imeiNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.model.toLowerCase().includes(searchQuery.toLowerCase());

  return matchesModel && matchesStatus && matchesSearch;
});

const totalItems = filteredDevices.length;
const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
const currentPageData = filteredDevices.slice(startIndex, endIndex);

  // Calculate current page data
  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = startIndex + pageSize;
  // const currentPageData = allDevicesData.slice(startIndex, endIndex);
  // const totalItems = allDevicesData.length;

  const columns = [
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
      render: (status) => {
        const statusStyle = {
          Pending: {
            background: "#FFF8E1",
            color: "#F57C00",
          },
          Paid: {
            background: "#E8F5E9",
            color: "#2E7D32",
          },
        };

        return <StatusBadge style={statusStyle[status]}>{status}</StatusBadge>;
      },
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
      render: (status) => {
        return <SubscriptionBadge>{status}</SubscriptionBadge>;
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <ActionButton onClick={() => handleViewDetails(record)}>
          View Details
        </ActionButton>
      ),
    },
  ];

  const handleViewDetails = (record) => {
    navigate(`/devices/${record.id}`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDeviceModelChange = (value) => {
    setSelectedDeviceModel(value);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePrint = () => {
    // Generate and download a PDF report
    generateDeviceReportPDF({
      reportId: `RPT${Math.floor(100000 + Math.random() * 900000)}`,
      generatedBy: "Admin 1/Michael James",
      generatedOn: new Date().toISOString().replace("T", " ").substring(0, 16),
      version: "1.0",
      totalDevices: totalItems.toString(),
      totalPremium: "#100,000",
      totalSumInsured: "#200,000",
      statusType: "Paid, Pending Premium",
      dateRange: {
        from: "2025-01-15",
        to: "2025-01-30",
      },
      devices: currentPageData.map((device) => ({
        deviceId: device.deviceId,
        brand: device.brand,
        model: device.model,
        imei: device.imeiNumber,
        totalSumInsured: device.totalSumInsured,
        premium: device.premium,
        onboardingDate: "2025-01-15",
        expiryDate: "2025-01-15",
      })),
    });
    message.success("Premium report downloaded successfully");
  };

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
      <Container>
        <Header>
          {/* <Title>Devices</Title> */}
          <FilterSection>
            <FilterLabel>Filter by:</FilterLabel>
            <SelectWrapper>
              {/* <Select
                placeholder="Device Model"
                style={{ width: 150 }}
                onChange={handleDeviceModelChange}
                suffixIcon={<ArrowIcon />}
              /> */}
              <Select
  placeholder="Device Model"
  style={{ width: 150 }}
  onChange={handleDeviceModelChange}
  suffixIcon={<ArrowIcon />}
  allowClear
>
  {[...new Set(allDevicesData.map((d) => d.model))].map((model) => (
    <Select.Option key={model} value={model}>
      {model}
    </Select.Option>
  ))}
</Select>
            </SelectWrapper>
            <SelectWrapper>
              {/* <Select
                placeholder="Status"
                style={{ width: 150 }}
                onChange={handleStatusChange}
                suffixIcon={<ArrowIcon />}
              /> */}
              <Select
  placeholder="Status"
  style={{ width: 150 }}
  onChange={handleStatusChange}
  suffixIcon={<ArrowIcon />}
  allowClear
>
  {[...new Set(allDevicesData.map((d) => d.premiumStatus))].map((status) => (
    <Select.Option key={status} value={status}>
      {status}
    </Select.Option>
  ))}
</Select>
            </SelectWrapper>
            <SearchInput placeholder="Search" onChange={handleSearchChange} />
          </FilterSection>
        </Header>

        <TabsContainer>
          <TabItem
            active={activeTab === "Devices"}
            onClick={() => handleTabChange("Devices")}
          >
            Devices
          </TabItem>
          <TabItem
            active={activeTab === "Awaiting Policy Upload"}
            onClick={() => handleTabChange("Awaiting Policy Upload")}
          >
            Awaiting Policy Upload
          </TabItem>
          {activeTab === "Devices" && (
            // <PrintButton onClick={handlePrint}>Print</PrintButton>
            <PrintButton>Print</PrintButton>
          )}
        </TabsContainer>

        <div className="sales-page">
          <CustomGrid
            columns={columns}
            data={currentPageData}
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
      </Container>
    </div>
  );
};

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
  color: #333;
  margin: 0;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const SelectWrapper = styled.div``;

const ArrowIcon = styled.span`
  &:after {
    content: "▼";
    font-size: 10px;
  }
`;

const SearchInput = styled(Input)`
  width: 200px;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
  position: relative;
`;

const TabItem = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#0066cc" : "#666")};
  border-bottom: ${(props) => (props.active ? "2px solid #0066cc" : "none")};
  font-weight: ${(props) => (props.active ? "600" : "normal")};
  transition: none;

  &:hover {
    color: ${(props) => (props.active ? "#0066cc" : "#666")};
  }
`;

const PrintButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 5px;
  background-color: #004aad !important;
  color: white !important;
  border: none !important;
  height: 26px;
  width: 60px;
  transition: none !important;

  &&&&:hover,
  &&&&:focus,
  &&&&:active,
  &&.ant-btn:hover,
  &&.ant-btn:focus,
  &&.ant-btn:active {
    color: white !important;
    background-color: #004aad !important;
    border-color: #004aad !important;
    box-shadow: none !important;
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }

    @media (max-width: 768px) {
        height: 26px;
        width: 60px;
        font-size: .5rem;
         right: -1rem;
  }
`;

const StatusBadge = styled.div`
  display: inline-block;
  padding: 4px 12px;
  /* border-radius: 4px; */
  font-size: 14px;
  text-align: center;
  width: 10rem;
`;

const SubscriptionBadge = styled.div`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  background-color: #e3f2fd;
  color: #1976d2;
  text-align: center;
`;

const ActionButton = styled(Button)`
  border: 1px solid #0066cc !important;
  color: #0066cc !important;
  background: transparent !important;
  transition: none !important;

  &&&&:hover,
  &&&&:focus,
  &&&&:active,
  &&.ant-btn:hover,
  &&.ant-btn:focus,
  &&.ant-btn:active {
    color: #0066cc !important;
    border-color: #0066cc !important;
    background: transparent !important;
    box-shadow: none !important;
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
`;

export default DevicesPage;
