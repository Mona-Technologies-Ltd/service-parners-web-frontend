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
  Modal,
  Upload,
} from "antd";
import {
  DownOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  UploadOutlined,
  CloseOutlined,
  FileOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import StatCard from "../components/Dashboard/StatCard";
import CustomGrid from "../components/CustomGrid/CustomGrid";
import { generateInvoicePDF } from "../utils/pdfUtils";

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

const PaymentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("approved");
  const [isUploadDVModalVisible, setIsUploadDVModalVisible] = useState(false);
  const [isInvoiceConfirmModalVisible, setIsInvoiceConfirmModalVisible] =
    useState(false);
  const [currentPayoutRecord, setCurrentPayoutRecord] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [invoiceType, setInvoiceType] = useState(null); // 'single' or 'all'
  const pageSize = 10;

  // Data for stat cards
  const paymentStats = {
    totalApproved: {
      value: "₦ 40,689",
      change: -18.5,
      icon: "/taskred.svg",
    },
    totalPayout: {
      value: "₦ 40,689",
      change: -18.5,
      icon: "/empty-wallet-time.svg",
    },
    totalConfirmed: {
      value: "₦ 40,689",
      change: 8.5,
      icon: "/shield-tick.svg",
    },
  };

  // Sample data for approved claims
  const claimsData = Array(4)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      claimId: `DJW03SEDE`,
      deviceId: `#0001`,
      brand: "iPhone",
      model: "13 Pro MAX 1",
      amount: "₦23,345",
      approvedBy: "Admin 1",
      date: "2025-01-15",
    }));

  // Sample data for payouts
  const payoutsData = Array(3)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      sn: `0${index + 1}`,
      reference: "DWERTHY908",
      approvedClaims: 5,
      amount: "₦23,345",
      dv: index === 0 ? "Upload" : index === 1 ? "Signed" : "Unsigned",
      paymentStatus: index === 0 ? "Pending" : "Paid",
      createdBy: "Admin 1",
      date: "2025-01-15",
    }));

  // Calculate current page data for claims
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageClaimsData = claimsData.slice(startIndex, endIndex);
  const totalClaimsItems = claimsData.length;

  // Calculate current page data for payouts
  const currentPagePayoutsData = payoutsData.slice(startIndex, endIndex);
  const totalPayoutsItems = payoutsData.length;

  // Handle download invoice action
  const handleDownloadInvoice = (payoutData) => {
    setCurrentPayoutRecord(payoutData);
    setInvoiceType("single");
    setIsInvoiceConfirmModalVisible(true);
  };

  // Confirmed download of invoice
  const handleConfirmedDownloadInvoice = () => {
    try {
      // Create invoice data from the payout record
      const invoiceData = {
        reportId: `RPT${Math.floor(100000 + Math.random() * 900000)}`,
        generatedBy: currentPayoutRecord?.createdBy || "Admin 1/Michael James",
        generatedOn: new Date().toISOString().slice(0, 16).replace("T", " "),
        version: "1.0",
        totalClaims: currentPayoutRecord?.approvedClaims || 10,
        totalAmount: currentPayoutRecord?.amount || "₦100,000",
        claims: Array(currentPayoutRecord?.approvedClaims || 2).fill({
          id: "#0001",
          brand: "Samsung",
          model: "Galaxy S20",
          sumInsured: "₦723,345",
          claimAmount: "₦123,345",
          approvedBy: "Admin 1",
          date: "2025-01-15",
        }),
        paymentDetails: {
          accountName: "Mona Protect Limited",
          bankName: "Commonwealth Bank",
          accountNumber: "12345678",
          sortCode: "CTBAU2S",
          dueDate: "2024-02-01",
        },
      };

      // Generate and download the PDF
      generateInvoicePDF(invoiceData);

      // Close modal and reset state
      setIsInvoiceConfirmModalVisible(false);
      setCurrentPayoutRecord(null);
      setInvoiceType(null);
    } catch (error) {
      message.error("Error generating invoice. Please try again later.");
      console.error("PDF generation error:", error);
    }
  };

  // Handle all action menu clicks
  const handleMenuClick = (e, record) => {
    const key = e.key;
    switch (key) {
      case "1": // Download Invoice
        handleDownloadInvoice(record);
        break;
      case "2": // Print Receipt
        // Implement print receipt functionality
        console.log("Print Receipt for", record);
        break;
      case "3": // Upload Proof of Payment
        // Implement upload proof functionality
        console.log("Upload Proof for", record);
        break;
      case "4": // Upload DV
        // Open upload DV modal and set current record
        setCurrentPayoutRecord(record);
        setIsUploadDVModalVisible(true);
        break;
      case "5": // Download Signed DV
        // Implement download signed DV functionality
        console.log("Download Signed DV for", record);
        break;
      default:
        break;
    }
  };

  // Handle file upload
  const handleFileUpload = (info) => {
    if (info.file.status === "done") {
      setUploadedFile(info.file.originFileObj);
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  // Handle DV submission
  const handleDVSubmit = () => {
    if (!uploadedFile) {
      message.error("Please upload a DV file first");
      return;
    }

    // Here you would process the file, likely sending it to your backend
    message.success("DV uploaded successfully");

    // Close the modal and reset state
    setIsUploadDVModalVisible(false);
    setUploadedFile(null);
    setCurrentPayoutRecord(null);
  };

  // Columns for approved claims tab
  const claimsColumns = [
    {
      title: "Claim ID",
      dataIndex: "claimId",
      key: "claimId",
    },
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Approved by",
      dataIndex: "approvedBy",
      key: "approvedBy",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  // Columns for payouts tab
  const payoutsColumns = [
    {
      title: "S/N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Approved Claims",
      dataIndex: "approvedClaims",
      key: "approvedClaims",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "DV",
      dataIndex: "dv",
      key: "dv",
      render: (value) => {
        if (value === "Upload") {
          return <DvButton className="upload">Upload</DvButton>;
        } else if (value === "Signed") {
          return <DvButton className="signed">Signed</DvButton>;
        } else {
          return <DvButton className="unsigned">Unsigned</DvButton>;
        }
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (value) => {
        return (
          <PaymentStatusBadge
            className={value === "Pending" ? "pending" : "paid"}
          >
            {value}
          </PaymentStatusBadge>
        );
      },
    },
    {
      title: "Created by",
      dataIndex: "createdBy",
      key: "createdBy",
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
            <Menu onClick={(e) => handleMenuClick(e, record)}>
              <Menu.Item key="1">Download Invoice</Menu.Item>
              <Menu.Item key="2">Print Receipt</Menu.Item>
              <Menu.Item key="3">Upload Proof of Payment</Menu.Item>
              <Menu.Item key="4">Upload DV</Menu.Item>
              <Menu.Item key="5">Download Signed DV</Menu.Item>
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  // Handle Generate Invoice button click
  const handleGenerateInvoice = () => {
    setInvoiceType("all");
    setIsInvoiceConfirmModalVisible(true);
  };

  // Confirmed generation of all invoices
  const handleConfirmedGenerateAllInvoices = () => {
    try {
      // Create an invoice with all the current approved claims
      const invoiceData = {
        reportId: `RPT${Math.floor(100000 + Math.random() * 900000)}`,
        generatedBy: "Admin 1/Michael James",
        generatedOn: new Date().toISOString().slice(0, 16).replace("T", " "),
        version: "1.0",
        totalClaims: totalClaimsItems,
        totalAmount: "₦" + (totalClaimsItems * 23345).toLocaleString(),
        claims: claimsData.map((claim) => ({
          id: claim.deviceId,
          brand: claim.brand,
          model: claim.model,
          sumInsured: "₦723,345",
          claimAmount: claim.amount,
          approvedBy: claim.approvedBy,
          date: claim.date,
        })),
      };

      // Generate and download the PDF
      generateInvoicePDF(invoiceData);

      // Close modal and reset state
      setIsInvoiceConfirmModalVisible(false);
      setInvoiceType(null);
    } catch (error) {
      message.error("Error generating invoice. Please try again later.");
      console.error("PDF generation error:", error);
    }
  };

  return (
    <PaymentPageContainer>
      {/* Stats Cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <StatCard
            title="Total Approved Claims"
            value="30"
            icon={paymentStats.totalApproved.icon}
            iconClass="pink-bg"
            change={paymentStats.totalApproved.change}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatCard
            title="Total Payout Awaiting Confirmation"
            value="30"
            icon={paymentStats.totalPayout.icon}
            iconClass="gold-bg"
            change={paymentStats.totalPayout.change}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatCard
            title="Total Confirmed Payouts"
            value="30"
            icon={paymentStats.totalConfirmed.icon}
            iconClass="green-bg"
            change={paymentStats.totalConfirmed.change}
          />
        </Col>
      </Row>

      {/* Tabs and Table */}
      <PaymentTabsSection>
        <div className="tabs-header">
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Approved Claims" key="approved" />
            <TabPane tab="Payouts" key="payouts" />
          </Tabs>
          <Button
            type="primary"
            className="generate-invoice-btn"
            onClick={handleGenerateInvoice}
          >
            Generate Invoice
          </Button>
        </div>

        {activeTab === "approved" ? (
          /* Approved Claims Grid */
          <CustomGrid
            columns={claimsColumns}
            data={currentPageClaimsData}
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalClaimsItems}
            onPageChange={handlePageChange}
          />
        ) : (
          /* Payouts Tab Content */
          <PayoutsTabContent>
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

                <Select defaultValue="" className="filter-select">
                  <Option value="">Status</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="paid">Paid</Option>
                </Select>

                <Search placeholder="Search" className="search-input" />
              </div>
            </div>

            {/* Payouts Grid */}
            <CustomGrid
              columns={payoutsColumns}
              data={currentPagePayoutsData}
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={totalPayoutsItems}
              onPageChange={handlePageChange}
            />
          </PayoutsTabContent>
        )}
      </PaymentTabsSection>

      {/* Upload DV Modal */}
      <Modal
        title="Upload DV"
        open={isUploadDVModalVisible}
        onCancel={() => setIsUploadDVModalVisible(false)}
        footer={null}
        centered
        width={500}
        closeIcon={<CloseOutlined />}
      >
        <p>Lorem ipsum dolor sit amet</p>

        <UploadContainer>
          <Upload.Dragger
            name="dvFile"
            accept=".pdf,.doc,.docx"
            maxCount={1}
            onChange={handleFileUpload}
            beforeUpload={() => false} // Prevent auto upload
            showUploadList={false}
          >
            <p className="upload-icon">
              <FileOutlined />
            </p>
            <p className="upload-text">
              <span className="upload-link">Upload DV</span> or drag and drop
            </p>
            <p className="upload-hint">PDF, DOC, or DOCX up to 30MB</p>
          </Upload.Dragger>

          {uploadedFile && (
            <UploadedFileInfo>
              <FileOutlined /> {uploadedFile.name}
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setUploadedFile(null)}
              />
            </UploadedFileInfo>
          )}
        </UploadContainer>

        <SubmitButton onClick={handleDVSubmit}>Submit</SubmitButton>
      </Modal>

      {/* Invoice Confirmation Modal */}
      <Modal
        open={isInvoiceConfirmModalVisible}
        onCancel={() => setIsInvoiceConfirmModalVisible(false)}
        footer={null}
        centered
        width={600}
        closeIcon={null}
      >
        <ConfirmModalContent>
          <QuestionCircleIcon />

          <h2>
            Are you sure you want to generate payment invoice for all approved
            claims by AXA Mansard Insurance?
          </h2>

          <ConfirmModalButtons>
            <YesButton
              onClick={
                invoiceType === "single"
                  ? handleConfirmedDownloadInvoice
                  : handleConfirmedGenerateAllInvoices
              }
            >
              Yes, generate
            </YesButton>
            <CancelButton
              onClick={() => setIsInvoiceConfirmModalVisible(false)}
            >
              Cancel
            </CancelButton>
          </ConfirmModalButtons>
        </ConfirmModalContent>
      </Modal>
    </PaymentPageContainer>
  );
};

const PaymentPageContainer = styled.div`
  padding: 16px;
  background-color: #f8fafc;

  /* Add pink-bg class for the first card */
  .pink-bg {
    background-color: rgba(239, 68, 136, 0.1);
    color: rgb(239, 68, 136);
  }
`;

const PaymentTabsSection = styled.div`
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

  .generate-invoice-btn {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  .ant-tabs-nav {
    margin-bottom: 0;
  }
`;

const PayoutsTabContent = styled.div`
  .filters-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-top: 1px solid #f0f0f0;
    padding-top: 20px;
  }

  .filters-label {
    margin-right: 10px;
    color: #333;
    font-weight: 500;
  }

  .filters {
    display: flex;
    gap: 10px;
  }

  .filter-select {
    min-width: 150px;
  }

  .search-input {
    width: 250px;
  }

  .pagination-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .pagination-info {
    color: #666;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .pagination-button {
    min-width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    cursor: pointer;

    &.active {
      background-color: #0056b3;
      color: white;
      border-color: #0056b3;
    }
  }

  .per-page-dropdown {
    margin-left: 10px;
  }

  .per-page-button {
    padding: 5px 10px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const PayoutsTable = styled.div`
  width: 100%;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
  }

  th {
    background-color: #f5f5f5;
    font-weight: 500;
    color: #333;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

const DvButton = styled.div`
  display: inline-block;
  padding: 4px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &.upload {
    background-color: #fff8e1;
    color: #f59e0b;
    border: 1px solid #f59e0b;

    &:hover {
      background-color: #ffedd5;
      color: #f59e0b;
    }
  }

  &.signed {
    background-color: #e8f5e9;
    color: #10b981;
    border: 1px solid #10b981;

    &:hover {
      background-color: #dcfce7;
      color: #10b981;
    }
  }

  &.unsigned {
    background-color: #ffebee;
    color: #ef4444;
    border: 1px solid #ef4444;

    &:hover {
      background-color: #fee2e2;
      color: #ef4444;
    }
  }
`;

const PaymentStatusBadge = styled.div`
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

const UploadContainer = styled.div`
  margin: 20px 0;

  .ant-upload-drag {
    border: 1px dashed #d9d9d9;
    background: #fafafa;
    transition: border-color 0.3s;
    cursor: pointer;
  }

  .ant-upload-drag:hover {
    border-color: #0056b3;
  }

  .upload-icon {
    font-size: 48px;
    color: #bfbfbf;
    margin-bottom: 8px;
  }

  .upload-text {
    color: #555;
    font-size: 16px;
    margin-bottom: 8px;
  }

  .upload-link {
    color: #0056b3;
    font-weight: 500;
  }

  .upload-link:hover {
    color: #004494;
    text-decoration: underline;
  }

  .upload-hint {
    color: #888;
    font-size: 14px;
  }
`;

const UploadedFileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: #f0f7ff;
  color: #0056b3;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  height: 48px;
  font-size: 16px;
  background-color: #0056b3;
  border-color: #0056b3;
  color: white;

  &&&&:hover,
  &&&&:focus {
    background-color: #0056b3 !important;
    border-color: #0056b3 !important;
    color: white !important;
    opacity: 0.9;
  }
`;

const ConfirmModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  text-align: center;

  h2 {
    font-size: 24px;
    font-weight: 500;
    margin: 20px 0;
    max-width: 80%;
    color: #333;
  }
`;

const QuestionCircleIcon = styled(QuestionCircleOutlined)`
  font-size: 64px;
  color: #ffc107;
  background: #fff;
`;

const ConfirmModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const YesButton = styled(Button)`
  min-width: 180px;
  height: 50px;
  font-size: 16px;
  background-color: #0056b3;
  border-color: #0056b3;
  color: white;

  &&&&:hover,
  &&&&:focus {
    background-color: #0056b3 !important;
    border-color: #0056b3 !important;
    color: white !important;
    opacity: 0.9;
  }
`;

const CancelButton = styled(Button)`
  min-width: 180px;
  height: 50px;
  font-size: 16px;
  background-color: white;
  border-color: #ef4444;
  color: #ef4444;

  &&&&:hover,
  &&&&:focus {
    background-color: white !important;
    border-color: #ef4444 !important;
    color: #ef4444 !important;
    opacity: 0.9;
  }
`;

export default PaymentPage;
