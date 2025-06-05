import React, { useState } from "react";
import styled from "styled-components";
import { Select, Input, Button, message, Modal, Form, Dropdown } from "antd";
import CustomGrid from "../components/CustomGrid/CustomGrid";
import { Icon } from "@iconify/react";
import AdminInviteModal from "./AdminInviteModal";

const ManageAdminsPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
// const [selectedRole, setSelectedRole] = useState(null);
// const [selectedStatus, setSelectedStatus] = useState(null);
// const [searchQuery, setSearchQuery] = useState("");
// const [currentPage, setCurrentPage] = useState(1);


// const totalItems = filteredData.length;
// const currentPageData = filteredData.slice(startIndex, endIndex);

  const pageSize = 10;

  // Mock data for the admins table
  // const allAdminsData = Array(50)
  //   .fill(null)
  //   .map((_, index) => ({
  //     id: index + 1,
  //     adminId: `#AD${String(index + 1001).padStart(4, "0")}`,
  //     name: [
  //       "John Doe",
  //       "Jane Smith",
  //       "Robert Johnson",
  //       "Maria Garcia",
  //       "David Chen",
  //     ][index % 5],
  //     email: [
  //       "john.doe@example.com",
  //       "jane.smith@example.com",
  //       "robert.j@example.com",
  //       "maria.garcia@example.com",
  //       "david.chen@example.com",
  //     ][index % 5],
  //     role: ["Super Admin", "Admin", "Support", "Claims Manager", "Viewer"][
  //       index % 5
  //     ],
  //     department: ["IT", "Claims", "Customer Support", "Finance", "Management"][
  //       index % 5
  //     ],
  //     dateAdded: new Date(
  //       Date.now() - Math.floor(Math.random() * 10000000000)
  //     ).toLocaleDateString(),
  //     status:
  //       index % 3 === 0 ? "Active" : index % 3 === 1 ? "Inactive" : "Suspended",
  //   }));

  // Calculate current page data
  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = startIndex + pageSize;
  // const currentPageData = allAdminsData.slice(startIndex, endIndex);
  // const totalItems = allAdminsData.length;

  // const allAdminsData = Array(50)
  // .fill(null)
  // .map((_, index) => ({
  //   id: index + 1,
  //   adminId: `#AD${String(index + 1001).padStart(4, "0")}`,
  //   name: [
  //     "John Doe",
  //     "Jane Smith",
  //     "Robert Johnson",
  //     "Maria Garcia",
  //     "David Chen",
  //   ][index % 5],
  //   email: [
  //     "john.doe@example.com",
  //     "jane.smith@example.com",
  //     "robert.j@example.com",
  //     "maria.garcia@example.com",
  //     "david.chen@example.com",
  //   ][index % 5],
  //   role: ["Super Admin", "Admin", "Support", "Claims Manager", "Viewer"][
  //     index % 5
  //   ],
  //   department: ["IT", "Claims", "Customer Support", "Finance", "Management"][
  //     index % 5
  //   ],
  //   dateAdded: new Date(
  //     Date.now() - Math.floor(Math.random() * 10000000000)
  //   ).toLocaleDateString(),
  //   status:
  //     index % 3 === 0 ? "Active" : index % 3 === 1 ? "Inactive" : "Suspended",
  // }));
const allAdminsData = Array(50)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    adminId: `#AD${String(index + 1001).padStart(4, "0")}`,
    name: ["John Doe", "Jane Smith", "Robert Johnson", "Maria Garcia", "David Chen"][index % 5],
    email: ["john.doe@example.com", "jane.smith@example.com", "robert.j@example.com", "maria.garcia@example.com", "david.chen@example.com"][index % 5],
    role: ["Super Admin", "Admin", "Support", "Claims Manager", "Viewer"][index % 5],
    department: ["IT", "Claims", "Customer Support", "Finance", "Management"][index % 5],
    dateAdded: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
    status: index % 3 === 0 ? "Active" : index % 3 === 1 ? "Inactive" : "Suspended",
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

  const handleActivateAdmin = (record) => {
    message.success(`Admin ${record.name} activated successfully`);
  };

  const handleDeactivateAdmin = (record) => {
    message.success(`Admin ${record.name} deactivated successfully`);
  };

  const columns = [
    {
      title: "Admin ID",
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
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "dateAdded",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusStyle = {
          Active: {
            background: "#E8F5E9",
            color: "#2E7D32",
          },
          Inactive: {
            background: "#FFF8E1",
            color: "#F57C00",
          },
          Suspended: {
            background: "#FFEBEE",
            color: "#C62828",
          },
        };

        return <StatusBadge style={statusStyle[status]}>{status}</StatusBadge>;
      },
    },
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
    // form
    //   .validateFields()
    //   .then((values) => {
    //     message.success(`Invitation sent to ${values.email}`);
    //     form.resetFields();
    //     setIsModalVisible(false);
    //   })
    //   .catch((info) => {
    //     console.log("Validate Failed:", info);
    //   });
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
          <Title>Manage Admins</Title>
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
        </Header>

        <ActionBar>
          <AddButton onClick={showAddAdminModal}>
            <Icon
              icon="mdi:plus"
              width="18"
              height="18"
              style={{ marginRight: "8px" }}
            />
            Add New Admin
          </AddButton>
        </ActionBar>

        <div className="admins-grid">
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

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FilterLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const SelectWrapper = styled.div`
  .ant-select-selector {
    border-radius: 4px !important;
  }
`;

const SearchInput = styled(Input)`
  width: 200px;
  border-radius: 4px;
`;

const ArrowIcon = styled(Icon).attrs({
  icon: "mdi:chevron-down",
  width: "16",
  height: "16",
})``;

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const AddButton = styled(Button)`
  background-color: #0066cc;
  color: white;
  display: flex;
  align-items: center;
  border: none;
  transition: none;
  &:hover {
    background-color: #0066cc;
    color: white;
  }
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
  color: #0066cc;
  border: 1px solid #0066cc;
  background: white;
  border-radius: 2px;
  font-size: 14px;
  transition: none;
  &:hover {
    color: #0066cc;
    border-color: #0066cc;
    background-color: white;
  }
`;

const ModalHeader = styled.div`
width: 100%;
  background-color: #0066cc;
  padding: 20px;
  text-align: center;
`;

const ModalTitle = styled.h2`
  color: white;
  font-size: 24px;
  margin: 0;
`;

const ModalBody = styled.div`
  /* padding: 40px; */
   padding: 0;

  form {
    padding: 24px; /* Apply spacing only to the form itself */
  }
`;

const SendInviteButton = styled(Button)`
  background-color: #0066cc;
  color: white;
  height: 44px;
  font-size: 16px;
  border: none;
  padding: 0 32px;
  transition: none;
  &:hover {
    background-color: #0066cc;
    color: white;
  }
`;

const CloseIcon = styled(Icon).attrs({
  icon: "mdi:close",
  width: "20",
  height: "20",
})`
  position: absolute;
  top: 16px;
  right: 16px;
  color: white;
  cursor: pointer;
  z-index: 1;
`;
const AdminInviteModalWrapper = styled.div`
  .ant-modal-body {
    padding: 0 !important;
  }
`;


export default ManageAdminsPage;
