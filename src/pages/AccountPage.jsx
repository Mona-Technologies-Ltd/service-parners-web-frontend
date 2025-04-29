import React, { useState } from "react";
import { Card, Row, Col, Tabs, Typography, Tag, Button, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import IconInput from "../components/common/IconInput";
import "../styles/AccountPage.css";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  // Mock user data - would come from API/redux in real app
  const userData = {
    name: "John Doe",
    role: "Customers",
    state: "FCT, Abuja",
    gender: "Male",
    email: "Johndoe23@gmail.com",
    phone: "0814 224 4432",
    dob: "24/12/1992",
    nin: "212323234344432",
    profileImage: "/profile-placeholder.svg", // Using the existing SVG in public directory
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handlePasswordChange = () => {
    console.log("Password change submitted");
    // Here you would implement password change logic
  };

  return (
    <div className="account-page-container">
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        className="account-tabs"
      >
        <TabPane tab="Personal info" key="1" className="active-tab">
          <div className="tab-content">
            <Card className="profile-card">
              <div className="profile-header">
                <div className="profile-image-container">
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="profile-image"
                  />
                  <button className="edit-image-button">
                    <EditOutlined />
                  </button>
                </div>
                <div className="profile-info">
                  <Title level={3} className="user-name">
                    {userData.name}
                  </Title>
                  <Tag color="blue" className="user-role">
                    {userData.role}
                  </Tag>
                </div>
              </div>
            </Card>

            <Card className="details-card">
              <Row gutter={[32, 24]}>
                <Col xs={24} sm={12}>
                  <div className="detail-item">
                    <Text className="detail-label">State/city</Text>
                    <Text className="detail-value">{userData.state}</Text>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="detail-item">
                    <Text className="detail-label">Gender</Text>
                    <Tag color="#D7F0FF" className="gender-tag">
                      {userData.gender}
                    </Tag>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="detail-item">
                    <Text className="detail-label">Email</Text>
                    <Text className="detail-value">{userData.email}</Text>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="detail-item">
                    <Text className="detail-label">Phone Number</Text>
                    <Text className="detail-value">{userData.phone}</Text>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="detail-item">
                    <Text className="detail-label">Date Of Birth</Text>
                    <Text className="detail-value">{userData.dob}</Text>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="detail-item">
                    <Text className="detail-label">NIN</Text>
                    <Text className="detail-value">{userData.nin}</Text>
                  </div>
                </Col>
              </Row>
              <Button type="primary" className="edit-button">
                Edit
              </Button>
            </Card>
          </div>
        </TabPane>

        <TabPane tab="Password & security" key="2">
          <div className="tab-content">
            <div className="password-header">
              <Title level={4} className="password-title">
                Password
              </Title>
              <Text className="password-subtitle">Manage your password</Text>
            </div>

            <Form className="password-form" layout="vertical">
              <Form.Item label="OLD PASSWORD">
                <IconInput
                  name="oldPassword"
                  type="password"
                  placeholder="Enter your old password"
                  prefixIconName="basil:lock-outline"
                  suffixIconName="lets-icons:eye-light"
                  showCircle={true}
                />
              </Form.Item>

              <Form.Item label="NEW PASSWORD">
                <IconInput
                  name="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  prefixIconName="basil:lock-outline"
                  suffixIconName="lets-icons:eye-light"
                  showCircle={true}
                />
              </Form.Item>

              <Form.Item label="CONFIRM NEW PASSWORD">
                <IconInput
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  prefixIconName="basil:lock-outline"
                  suffixIconName="lets-icons:eye-light"
                  showCircle={true}
                />
              </Form.Item>

              <Button
                type="primary"
                className="change-password-button"
                onClick={handlePasswordChange}
                style={{ backgroundColor: "#0056b3" }}
              >
                Change
              </Button>
            </Form>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AccountPage;
