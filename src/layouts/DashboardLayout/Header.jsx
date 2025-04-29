import React from "react";
import { Layout, Space, Dropdown } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import BreadcrumbComponent from "../../components/Breadcrumb";

const { Header: AntHeader } = Layout;

const Header = ({ collapsed, colorBgContainer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Check if we're on the dashboard page
  const isDashboard =
    location.pathname === "/" || location.pathname === "/dashboard";

  return (
    <AntHeader
      style={{
        padding: "0 24px",
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        transition: "all 0.2s",
        marginLeft: collapsed ? 0 : "0",
      }}
    >
      <div
        className="header-left"
        style={{ display: "flex", alignItems: "center" }}
      >
        {isDashboard ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{ fontSize: "12px", color: "#8c8c8c", lineHeight: "1.2" }}
            >
              Welcome,
            </div>
            <div
              style={{ fontSize: "16px", fontWeight: "600", lineHeight: "1.2" }}
            >
              Royal Tech Company
            </div>
          </div>
        ) : (
          <BreadcrumbComponent />
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
