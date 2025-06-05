import React from "react";
import { Layout, Button, Space, Avatar, Dropdown } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import BreadcrumbComponent from "../components/Breadcrumb";
import { AiOutlineCloseSquare, AiOutlineMenu } from "react-icons/ai";

const { Header: AntHeader } = Layout;

const Header = ({ collapsed, colorBgContainer, setMobileSidebarVisible, mobileSidebarVisible }) => {
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
         <div id="menu_mobile_nav">
          <button
            style={{ padding: 12, border: "none", height: 10, background: "none" }}
            onClick={() => setMobileSidebarVisible((prev) => !prev)}
          >
            {mobileSidebarVisible ? <AiOutlineCloseSquare size={20} /> : <AiOutlineMenu size={20} />}
          </button>
        </div>
        <BreadcrumbComponent />
      </div>
    </AntHeader>
  );
};

export default Header;
