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
  DatePicker,
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
import StatCard from "../components/Dashboard/DashboardStats";
import CustomGrid from "../components/CustomGrid/CustomGrid";
import { generateInvoicePDF } from "../utils/pdfUtils";
import DashboardCards from "./PaymentDashboardCards";
import InvoiceModal from "./InvoiceModal";
import FileUploadModal from "./FileUploadModal";

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
const [showInvoiceModal, setShowInvoiceModal] = useState(false);
const [invoiceData, setInvoiceData] = useState(null); // holds the invoice payload
const [showGenerateButton, setShowGenerateButton] = useState(true);
const [hasGeneratedInvoice, setHasGeneratedInvoice] = useState(false);
const [isProofUploadModalVisible, setIsProofUploadModalVisible] = useState(false);
const [uploadedProofFile, setUploadedProofFile] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
const filterPayouts = () => {
  return payoutsData.filter((item) => {
    // Filter by status
    const matchesStatus =
      !selectedStatus || item.paymentStatus.toLowerCase() === selectedStatus;

    // Filter by search (check reference and createdBy fields)
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.reference.toLowerCase().includes(searchLower) ||
      item.createdBy.toLowerCase().includes(searchLower);

    // Filter by date
    const today = new Date();
    const itemDate = new Date(item.date);

    let matchesDate = true;
    if (selectedDateRange === "today") {
      matchesDate = itemDate.toDateString() === today.toDateString();
    } else if (selectedDateRange === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      matchesDate = itemDate.toDateString() === yesterday.toDateString();
    } else if (selectedDateRange === "last7days") {
      const past7Days = new Date();
      past7Days.setDate(today.getDate() - 7);
      matchesDate = itemDate >= past7Days && itemDate <= today;
    } else if (selectedDateRange === "last30days") {
      const past30Days = new Date();
      past30Days.setDate(today.getDate() - 30);
      matchesDate = itemDate >= past30Days && itemDate <= today;
    }

    return matchesStatus && matchesSearch && matchesDate;
  });
};
const [claimsPayout, setClaimsPayout] = useState(() => filterPayouts());

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



  // Calculate current page data for claims
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageClaimsData = claimsData.slice(startIndex, endIndex);
  const totalClaimsItems = claimsData.length;
const [claimsInfo, setClaimsInfo] = useState(currentPageClaimsData)
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
  const handleConfirmedDownloadInvoice = async() => {
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
     await generateInvoicePDF(invoiceData);

      // Close modal and reset state
      setIsInvoiceConfirmModalVisible(false);
      setCurrentPayoutRecord(null);
      setInvoiceType(null);
    } catch (error) {
      message.error("Error generating invoice. Please try again later.");
      console.error("PDF generation error:", error);
    }
  };

const handleMenuClick = (e, record) => {
  const key = e.key;
  let invoicePayload;
  switch (key) {
    case "1": // View Invoice
       invoicePayload = {
        reportId: `RPT${Math.floor(100000 + Math.random() * 900000)}`,
        generatedBy: record?.createdBy || "Admin 1",
        generatedOn: new Date().toISOString().slice(0, 16).replace("T", " "),
        version: "1.0",
        totalClaims: record?.approvedClaims || 0,
        totalAmount: record?.amount || "₦0",
        claims: Array(record?.approvedClaims || 1).fill({
          id: "#0001",
          brand: "Samsung",
          model: "Galaxy S20",
          sumInsured: "₦723,345",
          claimAmount: "₦123,345",
          approvedBy: "Admin 1",
          date: record?.date || "2025-01-15",
        }),
        paymentDetails: {
          accountName: "Mona Protect Limited",
          bankName: "Commonwealth Bank",
          accountNumber: "12345678",
          sortCode: "CTBAU2S",
          dueDate: "2024-02-01",
        },
      };

      setInvoiceData(invoicePayload);
      setShowInvoiceModal(true);
      break;

    case "2": // Print Receipt
  //    setCurrentPayoutRecord(record);
  // setIsUploadDVModalVisible(true);
      console.log("Print Receipt for", record);
      break;

   case "3": // Upload Proof of Payment
  setCurrentPayoutRecord(record);
  setIsProofUploadModalVisible(true);
  break;

case "4": // Upload Unsigned DV
  setCurrentPayoutRecord(record);
  setIsUploadDVModalVisible(true);
  break;

    case "5": // Download Signed DV
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
const handleProofFileUpload = (info) => {
  if (info.file.status !== "removed") {
    setUploadedProofFile(info.file.originFileObj);
  }
};

const handleProofOfPaymentSubmit = () => {
  if (!uploadedProofFile) {
    message.error("Please upload a proof of payment file first");
    return;
  }

  // Process the proof file here...
  message.success("Proof of payment uploaded successfully");

  // Reset state
  setIsProofUploadModalVisible(false);
  setUploadedProofFile(null);
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
              <Menu.Item key="1">View Invoice</Menu.Item>
              <Menu.Item key="4">Upload Unsigned DV</Menu.Item>
              <Menu.Item key="5">View Signed DV</Menu.Item>
              <Menu.Item key="3">Upload Proof of Payment</Menu.Item>
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
  // if (key === "payouts" && !hasGeneratedInvoice) {
  //   message.warning("Please generate a payment invoice before accessing the Payouts tab.");
  //   return;
  // }
setActiveTab("payouts");
  setActiveTab(key);
  setCurrentPage(1);
  setIsInvoiceConfirmModalVisible(false);
  setCurrentPayoutRecord(null);
  setInvoiceType(null);

};

  // Handle Generate Invoice button click
  const handleGenerateInvoice = () => {
    setInvoiceType("all");
    setIsInvoiceConfirmModalVisible(true);
  };
const { RangePicker } = DatePicker;
const handleConfirmedGenerateAllInvoices = async () => {
  try {
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

    await generateInvoicePDF(invoiceData);

    // Success actions
    setIsInvoiceConfirmModalVisible(false);
    setInvoiceType(null);
    setShowGenerateButton(false); // hide button
     // switch tab only after successful generation
  } catch (error) {
    message.error("Error generating invoice. Please try again later.");
    console.error("PDF generation error:", error);
  }
};

  return (
    <PaymentPageContainer>
      {/* Stats Cards */}
   <InvoiceModal
  open={showInvoiceModal}
  onCancel={() => setShowInvoiceModal(false)}
  invoiceData={invoiceData}
/>

<DashboardCards activeTab={activeTab} />

      {/* Tabs and Table */}
      <PaymentTabsSection>
        <div className="tabs-header">
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Approved Claims" key="approved" />
            <TabPane tab="Payouts" key="payouts" />
          </Tabs>
         {activeTab === "approved" && claimsInfo.length > 0 && (
  <Button
    type="primary"
    className="generate-invoice-btn"
    onClick={handleGenerateInvoice}
  >
    Generate Invoice
  </Button>
)}
 {activeTab === "payouts" && (
  <div className="filters-container">
    <div className="filters-label">Filter by:</div>
    <div className="filters">
      <RangePicker
  onChange={(dates) => {
    if (dates) {
      setSelectedDateRange(dates); // Store as moment[] or convert to string if needed
    } else {
      setSelectedDateRange("");
    }
  }}
  className="filter-select"
/>


      <Select
        value={selectedStatus}
        onChange={(value) => setSelectedStatus(value)}
        className="filter-select"
      >
        <Option value="">Status</Option>
        <Option value="pending">Pending</Option>
        <Option value="paid">Paid</Option>
      </Select>

      <Search
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className="search-input"
      />
    </div>
  </div>
)}

         
        </div>
        {activeTab === "approved" ? (
          /* Approved Claims Grid */
          <CustomGrid
            columns={claimsColumns}
            data={claimsInfo}
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalClaimsItems}
            onPageChange={handlePageChange}
          />
        ) : (
          /* Payouts Tab Content */
          <PayoutsTabContent>
          

            {/* Payouts Grid */}
            <CustomGrid
              columns={payoutsColumns}
              // data={currentPagePayoutsData}
                data={claimsPayout.slice(startIndex, endIndex)}
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={totalPayoutsItems}
              onPageChange={handlePageChange}
            />
          </PayoutsTabContent>
        )}
      </PaymentTabsSection>

<FileUploadModal
  visible={isProofUploadModalVisible}
  onCancel={() => setIsProofUploadModalVisible(false)}
  onSubmit={handleProofOfPaymentSubmit}
  onFileChange={handleProofFileUpload}
  title="Upload Proof of Payment"
  subtitle="Kindly upload your proof of payment"
  uploadText="Upload proof of payment or drag and drop"
/>



      {/* Upload DV Modal */}
      <Modal
  title={<div style={{ textAlign: 'center', width: '100%' }}>Upload Unsigned DV</div>}
        open={isUploadDVModalVisible}
        onCancel={() => setIsUploadDVModalVisible(false)}
        footer={null}
        centered
        width={500}
        closeIcon={<CloseOutlined />}
      >
        <p style={{ textAlign:'center' }} className="unsigned_h">Kindly upload your unsigned DV</p>

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
  onClick={async () => {
    try {
      // await handleConfirmedDownloadInvoice(); // or your actual invoice generation function
      
      setHasGeneratedInvoice(true); // allow switching to payout tab
      setActiveTab("payouts"); // switch tab only after successful generation
      setClaimsInfo([])
        setIsUploadDVModalVisible(false);
    setUploadedFile(null);
    setCurrentPayoutRecord(null);
     setIsInvoiceConfirmModalVisible(false)
      setShowGenerateButton(false); // hide button

    } catch (error) {
      console.error("Invoice generation failed:", error);
      // Optionally show an error message to the user
    }
  }}
>
  Yes, generate
</YesButton>

  <CancelButton onClick={() => setIsInvoiceConfirmModalVisible(false)}>
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
    width: 100%;
    color: #f59e0b;
    border: 1px solid #f59e0b;

    &:hover {
      background-color: #ffedd5;
      color: #f59e0b;
    }
  }

  &.signed {
     width: 100%;
    color: #10b981;
    border: 1px solid #10b981;

    &:hover {
      background-color: #dcfce7;
      color: #10b981;
    }
  }

  &.unsigned {
      width: 100%;
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
  width: 10rem;

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
