import React, { useState } from "react";
import styled from "styled-components";
import { DatePicker, Select, Input, Button, message } from "antd";
import CustomGrid from "../components/CustomGrid/CustomGrid";
import { generateDeviceReportPDF } from "../utils/pdfUtils";
import dayjs from "dayjs"; // Make sure this is installed
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import InvoiceModalPremium from "./InvoiceModalPremium";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Premium");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
   const [showInvoiceModal, setShowInvoiceModal] = useState(false); // modal control
  const [invoiceData, setInvoiceData] = useState(null); // invoice data

  const pageSize = 10;

  // Sample data for reports
  const reportsData = [
    {
      id: 1,
      deviceId: "#0001",
      brand: "Samsung",
      model: "Galaxy S20",
      totalSumInsured: "#723,345",
      premium: "#123,345",
      status: "Paid",
      onboardingDate: "2025-01-15",
      expiryDate: "2025-01-15",
    },
    {
      id: 2,
      deviceId: "#0001",
      brand: "Samsung",
      model: "Galaxy S10",
      totalSumInsured: "#273,345",
      premium: "#25,345",
      status: "Unpaid",
      onboardingDate: "2025-01-15",
      expiryDate: "2025-01-15",
    },
  ];

  // // Calculate total items
  // const totalItems = 120; // This would normally come from backend or full data array

  // // Current page data (first 10 items for now)
  // const currentPageData = reportsData;

  const columns = [
    {
      title: "Device ID",
      dataIndex: "deviceId",
      key: "deviceId",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusStyle = {
          Unpaid: {
            background: "#FFE5DB",
            color: "#FF4602",
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
      title: "Onboarding Date",
      dataIndex: "onboardingDate",
      key: "onboardingDate",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrint = () => {
    // Generate and download a PDF report
    // generateDeviceReportPDF({
    //   reportId: `RPT${Math.floor(100000 + Math.random() * 900000)}`,
    //   generatedBy: "Admin 1/Michael James",
    //   generatedOn: new Date().toISOString().replace("T", " ").substring(0, 16),
    //   version: "1.0",
    //   totalDevices: totalItems.toString(),
    //   totalPremium: "#100,000",
    //   totalSumInsured: "#200,000",
    //   statusType: "Paid, Unpaid Premium",
    //   dateRange: {
    //     from: startDate ? startDate.format("YYYY-MM-DD") : "2025-01-15",
    //     to: endDate ? endDate.format("YYYY-MM-DD") : "2025-01-30",
    //   },  
    //   devices: currentPageData.map((device) => ({
    //     deviceId: device.deviceId,
    //     brand: device.brand,
    //     model: device.model,
    //     imei: "12345723170345",
    //     totalSumInsured: device.totalSumInsured,
    //     premium: device.premium,
    //     onboardingDate: device.onboardingDate,
    //     expiryDate: device.expiryDate,
    //   })),
    // });
    message.success("Premium report downloaded successfully");
        setShowInvoiceModal(true);
  };
// Filtered data logic
const filteredData = reportsData.filter((item) => {
  const itemDate = dayjs(item.onboardingDate); // Convert to Dayjs object

  const matchesDateRange =
    (!startDate || itemDate.isSameOrAfter(startDate, "day")) &&
    (!endDate || itemDate.isSameOrBefore(endDate, "day"));

  const matchesStatus = !selectedStatus || item.status.toLowerCase() === selectedStatus.toLowerCase();

  const matchesSearch = !searchQuery ||
    item.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.model.toLowerCase().includes(searchQuery.toLowerCase());

  return matchesDateRange && matchesStatus && matchesSearch;
});

// Pagination logic
const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
const currentPageData = filteredData.slice(startIndex, endIndex);
const totalItems = filteredData.length;
  return (
    <Container>
      <Title>Reports</Title>

      <FilterSection>
        <DateRangeWrapper>
          <DateLabel>Date Range:</DateLabel>
          <DatePicker
            placeholder="mm/dd/yyyy"
            onChange={(date) => setStartDate(date)}
            format="MM/DD/YYYY"
          />
          <DatePicker
            placeholder="mm/dd/yyyy"
            onChange={(date) => setEndDate(date)}
            format="MM/DD/YYYY"
          />
        </DateRangeWrapper>

        <FiltersWrapper>
          <StatusSelect
            placeholder="Status"
            onChange={handleStatusChange}
            allowClear
          >
            <Select.Option value="paid">Paid</Select.Option>
            <Select.Option value="unpaid">Unpaid</Select.Option>
          </StatusSelect>
          <SearchInput
            placeholder="Search"
            onChange={handleSearchChange}
            value={searchQuery}
          />
        </FiltersWrapper>
      </FilterSection>

      <TabsContainer>
        <TabItem
          active={activeTab === "Premium"}
          onClick={() => handleTabChange("Premium")}
        >
          Premium
        </TabItem>
        <TabItem
          active={activeTab === "Payouts"}
          onClick={() => handleTabChange("Payouts")}
        >
          Payouts
        </TabItem>
        <PrintButton onClick={handlePrint}>Print</PrintButton>
      </TabsContainer>

      <CustomGrid
        columns={columns}
        data={currentPageData}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
       {/* Modal appears here */}
      <InvoiceModalPremium
        open={showInvoiceModal}
        onCancel={() => setShowInvoiceModal(false)}
        invoiceData={invoiceData}
      />
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  padding: 24px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 24px 0;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

    @media (max-width: 768px) {
     flex-direction: column;
    }
`;

const DateRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DateLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 12px;


 
`;



const StatusSelect = styled(Select)`
  width: 140px;
`;

const SearchInput = styled(Input)`
  width: 200px;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 24px;
  position: relative;
`;

const TabItem = styled.div`
  padding: 12px 24px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#004AAD" : "#666")};
  font-weight: ${(props) => (props.active ? "600" : "normal")};
  border-bottom: ${(props) =>
    props.active ? "2px solid #004AAD" : "2px solid transparent"};
  margin-right: 24px;
  transition: none;

  &:hover {
    color: ${(props) => (props.active ? "#004AAD" : "#666")};
  }
`;

const PrintButton = styled(Button)`
  margin-left: auto;
  background-color: #004AAD !important;
  color: white !important;
  border: none !important;
  transition: none !important;

  &&&&:hover,
  &&&&:focus,
  &&&&:active,
  &&.ant-btn:hover,
  &&.ant-btn:focus,
  &&.ant-btn:active {
    color: white !important;
    background-color: #004AAD !important;
    border-color: #004AAD !important;
    box-shadow: none !important;
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  /* border-radius: 4px; */
  font-size: 12px;
  font-weight: 500;
  width: 10rem;
  text-align: center;
`;

export default ReportsPage;
