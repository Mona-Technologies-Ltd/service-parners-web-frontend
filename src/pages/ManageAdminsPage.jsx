import React, { useState } from "react";
import styled from "styled-components";
import { Select, Input, Button, message, Modal, Form, Dropdown } from "antd";
import CustomGrid from "../components/CustomGrid/CustomGrid";
import { Icon } from "@iconify/react";
import AdminInviteModal from "./AdminInviteModal";
import { Table, Menu } from "antd";
import ResolveClaimModalDeactivate from "./ResolveClaimModalDeactivate";
// import "antd/dist/antd.css";
const ManageAdminsPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
const [activeTab, setActiveTab] = useState("manage");
const [showDeactivateModal, setShowDeactivateModal] = useState(false);
const [selectedAdmin, setSelectedAdmin] = useState(null);

  const pageSize = 10;


const allAdminsData = Array(10).fill(null).map((_, index) => ({
  id: index + 1,
  adminId: `#${String(index + 1).padStart(4, "0")}`,
  name: "John Joseph Doe",
  email: "johnjosephdoe@gmail.com",
  // company: "ABC Tech Enterprise, Abuja",
  phoneNumber: "09034567890",
  dateCreated: "2025-02-27",
  action: "More",
}));

console.log(allAdminsData);

 const allInvitationsData = Array(50)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      sn: `#${String(index + 1).padStart(4, "0")}`,
      email: `johnjosephdoe@gmail.com`,
      invitedBy: "John Joseph Doe",
      dateInvited: "2025-02-27",
    }));

const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
const currentPageData = allAdminsData.slice(startIndex, endIndex);
const totalItems = allAdminsData.length;

const filteredData = allAdminsData.filter((admin) => {
  const roleMatch = selectedRole ? admin.role === selectedRole : true;
  const statusMatch = selectedStatus ? admin.status === selectedStatus : true;
  const searchMatch = searchQuery
    ? admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.adminId.toLowerCase().includes(searchQuery.toLowerCase())
    : true;

  return roleMatch && statusMatch && searchMatch;
});
const invitationPageData = allInvitationsData.slice(startIndex, endIndex);
const totalInvitations = allInvitationsData.length;

  const handleActivateAdmin = (record) => {
    message.success(`Admin ${record.name} activated successfully`);
  };

  // const handleDeactivateAdmin = (record) => {
  //   message.success(`Admin ${record.name} deactivated successfully`);
  // };
  const handleDeactivateAdmin = (record) => {
  setSelectedAdmin(record);
  setShowDeactivateModal(true);
      message.success(`Admin ${record.name} deactivated successfully`);

};
const handleConfirmDeactivate = () => {
  message.success(`Admin ${selectedAdmin?.name} deactivated successfully`);
  setShowDeactivateModal(false);
  setSelectedAdmin(null);
};

const invitationColumns = [
   {
      title: "S/N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Invited by",
      dataIndex: "invitedBy",
      key: "invitedBy",
    },
    {
      title: "Date Invited",
      dataIndex: "dateInvited",
      key: "dateInvited",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "Resend",
                label: "Resend",
                style: { backgroundColor: "#e6f7ff" },
                disabled: record.status === "Resend",
              },
              {
                key: "Cancel",
                label: "Cancel",
                disabled: record.status === "Cancel",
              },
            ],
          }}
          placement="bottomRight"
          trigger={["click"]}
          overlayStyle={{
            minWidth: "150px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <MoreButton>
            More <Icon icon="mdi:chevron-down" width="16" height="16" />
          </MoreButton>
        </Dropdown>
      ),
    },
];

  const columns = [
    {
      title: "ID",
      dataIndex: "adminId",
      key: "adminId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Company",
    //   dataIndex: "company",
    //   key: "company",
    // },
    {
      title: "phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status) => {
    //     const statusStyle = {
    //       Active: {
    //         background: "#E8F5E9",
    //         color: "#2E7D32",
    //       },
    //       Inactive: {
    //         background: "#FFF8E1",
    //         color: "#F57C00",
    //       },
    //       Suspended: {
    //         background: "#FFEBEE",
    //         color: "#C62828",
    //       },
    //     };

    //     return <StatusBadge style={statusStyle[status]}>{status}</StatusBadge>;
    //   },
    // },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "deactivate",
                label: "Deactivate",
                onClick: () => handleDeactivateAdmin(record),
                style: { backgroundColor: "#e6f7ff" },
                disabled: record.status === "Inactive",
              },
              {
                key: "activate",
                label: "Activate",
                onClick: () => handleActivateAdmin(record),
                disabled: record.status === "Active",
              },
            ],
          }}
          placement="bottomRight"
          trigger={["click"]}
          overlayStyle={{
            minWidth: "150px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <MoreButton>
            More <Icon icon="mdi:chevron-down" width="16" height="16" />
          </MoreButton>
        </Dropdown>
      ),
    },
  ];

  const handleRoleChange = (value) => {
    setSelectedRole(value);
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

 const showAddAdminModal = () => {
  setShowModal(true); // instead of setIsModalVisible(true)
};


  const handleAddAdmin = () => {
      setShowModal(false);
   
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
        {/* <Header>
          <Title>Manage Admins</Title> */}
          <Header style={{ width:'100%',display: "flex", flexDirection:'column' , justifyContent: "space-between", alignItems: "center" }}>
  {/* Tabs */}
  {showDeactivateModal && (
  <ResolveClaimModalDeactivate
    onResolve={handleConfirmDeactivate}
    onCancel={() => setShowDeactivateModal(false)}
  />
)}
<ResponsiveHeader>
  <TabGroup>
    <Tab
      active={activeTab === "manage"}
      onClick={() => setActiveTab("manage")}
    >
      Manage Admin
    </Tab>
    <Tab
      active={activeTab === "invitation"}
      onClick={() => setActiveTab("invitation")}
    >
      Invitations
    </Tab>
  </TabGroup>

  {activeTab === "manage" && (
    <AddButton onClick={showAddAdminModal}>Add New Admin</AddButton>
  )}
</ResponsiveHeader>


         {/* <div>
           <FilterSection>
            <FilterLabel>Filter by:</FilterLabel>
            <SelectWrapper>
              <Select
                placeholder="Role"
                style={{ width: 150 }}
                onChange={handleRoleChange}
                suffixIcon={<ArrowIcon />}
                options={[
                  { value: "Super Admin", label: "Super Admin" },
                  { value: "Admin", label: "Admin" },
                  { value: "Support", label: "Support" },
                  { value: "Claims Manager", label: "Claims Manager" },
                  { value: "Viewer", label: "Viewer" },
                ]}
              />
            </SelectWrapper>
            <SelectWrapper>
              <Select
                placeholder="Status"
                style={{ width: 150 }}
                onChange={handleStatusChange}
                suffixIcon={<ArrowIcon />}
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                  { value: "Suspended", label: "Suspended" },
                ]}
              />
            </SelectWrapper>
            <SearchInput
              placeholder="Search"
              onChange={handleSearchChange}
              prefix={<Icon icon="mdi:magnify" width="16" height="16" />}
            />
          </FilterSection>
         </div> */}

        </Header>

        {/* <ActionBar>
          <AddButton onClick={showAddAdminModal}>
            <Icon
              icon="mdi:plus"
              width="18"
              height="18"
              style={{ marginRight: "8px" }}
            />
            Add New Admin
          </AddButton>
        </ActionBar> */}

        <div className="admins-grid">
          {/* <CustomGrid
            columns={columns}
            data={currentPageData}
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          /> */}
          {activeTab === "manage" ? (
  <div className="admins-grid">
    <CustomGrid
      columns={columns}
      data={currentPageData}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={handlePageChange}
    />
    {showModal && <AdminInviteModal onClose={() => setShowModal(false)} />}
  </div>
) : (
  <div className="invitations-grid">
    <CustomGrid
      columns={invitationColumns}
      data={invitationPageData}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalInvitations}
      onPageChange={handlePageChange}
    />
  </div>
)}

        </div>
      </Container>

   {showModal && (
  <AdminInviteModal onClose={() => setShowModal(false)} />
)}

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




const StatusBadge = styled.div`
  padding: 4px 8px;
  /* border-radius: 4px; */
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  width: 10rem;
  text-align: center;
`;

const MoreButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 12px;
  height: 32px;
  color: #004AAD;
  border: 1px solid #004AAD;
  background: white;
  border-radius: 2px;
  font-size: 14px;
  transition: none;
  &:hover {
    color: #004AAD;
    border-color: #004AAD;
    background-color: white;
  }
`;



const ResponsiveHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TabGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;

  @media (min-width: 600px) {
    width: 70%;
    justify-content: flex-start;
  }
`;

const Tab = styled.div`
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#004AAD" : "#9e9e9e")};
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? "2px solid #004AAD" : "none")};
  padding-bottom: 4px;
`;

const AddButton = styled.button`
  background-color: #004AAD;
  color: #fff;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  align-self: center;

  @media (min-width: 600px) {
    padding: 8px 16px;
    align-self: auto;
  }
`;

export default ManageAdminsPage;
