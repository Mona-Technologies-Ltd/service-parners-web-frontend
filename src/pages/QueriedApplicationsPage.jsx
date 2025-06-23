import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Select, Button } from "antd";
import CustomGrid from "../components/CustomGrid/CustomGrid";
import { Icon } from "@iconify/react";
import QueriedApplicationDetailsModal from "../components/QueriedApplicationDetailsModal";
import RepairClaimModal from "./RepairClaimModal";
import QueriedApplications from "./QueriedApplications";

const QueriedApplicationsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pageSize = 10;
  const [dateFilter, setDateFilter] = useState("");
const [otherFilter, setOtherFilter] = useState("");
const [isOpen, setIsOpen] = useState(true);
if (!isOpen) return null;


  // Mock data for queried applications
  // const queriedApplicationsData = Array(120)
  //   .fill(null)
  //   .map((_, index) => ({
  //     id: index + 1,
  //     claimId: "#0001",
  //     deviceBrand: "iPhone",
  //     model: "iPhone 13 Pro MAX 1",
  //     issueType: "Damaged Screen",
  //     amount: "#23,345",
  //     dateQueried: "2025-02-27",
  //     newMessages: [4, 1, 0, 0][index % 4], // Cycle through message counts
  //   }));
  const queriedApplicationsData = [
   {
    id: 1,
    claimId: "PLU3766",
    deviceId: "IP12567",
    deviceModel: "iPhone 13 Pro MAX",
    issue: "Damaged screen",
    amount: "25000.00",
    status: "Closed",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:false,
    isPending:true, 
    isResponse:false,
    isQuery : false,
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
    status: "Closed",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:true,
    isPending:false,
    isResponse:false,
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
    status: "Closed",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:true,
    isPending:false,
    isResponse:true,
    isQuery : true,
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
    status: "Closed",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:true,
    isPending:false,
    isResponse:true,
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
    status: "Closed",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:false,
    isPending:true,
    isResponse:false,
    isQuery : false,
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
    status: "Closed",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:false,
    isPending:true,    
    isResponse:false,
    isQuery : false,
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
    status: "Closed",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:true,

isPending:false,   
 isResponse:true,
 isQuery : true,
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
    status: "Closed",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:true,
    isPending:false,
    isResponse:false,
    isQuery : false,
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
    status: "Closed",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:true,
    isPending:false,   
   isResponse:false,
   isQuery : false,
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
    status: "Queried",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:false,
    isPending:false,   
    isResponse:true,
    isQuery : true,
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
    status: "Queried",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:false,
    isPending:false,   
    isResponse:true,
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
    status: "Queried",
    teamMember: "John Doe",
    company: "Mona Tech",
 isClosed:false,
    isPending:false,   
    isResponse:true,
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
    status: "Queried",
    teamMember: "John Doe",
    company: "Mona Tech",
     isClosed:false,
    isPending:false,   
    isResponse:true,
    isQuery : true,
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
    status: "Queried",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:false,
    isPending:false,   
    isResponse:true,
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
    status: "Queried",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:false,
    isPending:false,   
    isResponse:true,
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
    status: "Queried",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:false,
    isPending:false,   
    isResponse:true,
    isQuery : true,
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
    status: "Queried",
    teamMember: "John Doe",
    company: "Mona Tech",
     isClosed:false,
    isPending:false,   
    isResponse:true,
    isQuery : true,
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
    status: "Queried",
    teamMember: "John Doe",
    company: "Mona Tech",
    isClosed:false,
    isPending:false,   
    isResponse:true,
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
    status: "Queried",
    teamMember: "John Doe",
    company: "Mona Tech",
     isClosed:false,
    isPending:false,   
    isResponse:true,
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
    status: "Queried",
    teamMember: "John Doe",
    company: "Mona Tech",
     isClosed:false,
    isPending:false,   
    isResponse:true,
    isQuery : true,
    customerName: "John Doe",
    customerPhone: "08143789883",
    date: "Dec 6, 2024",
     isExcess: true,
    excess: "#2,000",
  },];


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


const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return "#10b981";
    case "pending":
      return "#f59e0b";
    case "closed":
      return "#DCEBFF";
    case "queried":
      return "#FFE5DB";
    default:
      return "#9ca3af";
  }
};
const getStatusTextColor = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return "#117A4F"; // green
    case "pending":
      return "#D18A00"; // orange
    case "closed":
      return "#004AAD"; // blue
    case "queried":
      return "#B91C1C"; // red
    default:
      return "#6B7280"; // gray
  }
};

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
      dataIndex: "deviceModel",
      key: "deviceBrand",
    },
    {
      title: "Model",
      dataIndex: "deviceModel",
      key: "model",
    },
     {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => (
      <span
        style={{
          width:'100%',
          padding: "4px 8px",
          backgroundColor: getStatusColor(value),
          color: getStatusTextColor(value),
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        {value}
      </span>
    ),
  },
    // {
    //   title: "Issue Type",
    //   dataIndex: "issue",
    //   key: "issueType",
    // },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date Queried",
      dataIndex: "date",
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
        <button
          className="action-button-queried"
          onClick={() => handleViewClick(record)}
        >
          View
        </button>
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
      {/* <ButtonStyleOverrides /> */}
      <Container>
      
          <QueriedApplications />
         
{/* <RepairClaimModal /> */}
{showModal && (
  <RepairClaimModal
    isOpen={showModal}
    onClose={handleCloseModal}
    device={selectedApplication}
  />
)}

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

        {/* <QueriedApplicationDetailsModal
          visible={showModal}
          onClose={handleCloseModal}
          application={selectedApplication}
        /> */}
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

    @media (max-width: 768px) {
  padding: 5px;  }
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

   @media (max-width: 768px) {
    font-size: 5px; /* Smaller font for mobile */
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;

  
`;

const FilterLabel = styled.span`
  margin-right: 12px;
  font-weight: 600;

    @media (max-width: 768px) {
    font-size: 5px; /* Smaller font for mobile */
    /* font-weight: 400; */
  }
`;

const SelectWrapper = styled.div`
  margin-right: 12px;

  .ant-select {
    width: 70px;

    @media (max-width: 768px) {
      width: 120px; /* Reduced width on mobile */
    }
  }
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
  background: #004AAD !important;
  color: white !important;
  border: none !important;
  border-radius: 4px;
  height: 32px;
  padding: 0 16px;
  font-weight: 500;
  box-shadow: none !important;
  transition: none !important;

  &:hover,
  &:focus,
  &:active {
    background: #004AAD !important;
    color: white !important;
    border: none !important;
    box-shadow: none !important;
    transform: none !important;
    outline: none !important;
  }
`;

export default QueriedApplicationsPage;
