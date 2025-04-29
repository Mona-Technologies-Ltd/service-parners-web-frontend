import React from "react";
import { Layout, Menu, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { Icon } from "@iconify/react";
import monaHeaderLogo from "../../assets/monaHeaderLogo.svg";
import monaSingleLogo from "../../assets/monaSingleLogo.png";

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Extract the current path from location to determine which menu item is active
  const currentPath = location.pathname;

  // Menu items configuration with paths and icons
  const menuItems = [
    {
      key: "/dashboard",
      icon: <Icon icon="material-symbols:dashboard" width="20" height="20" />,
      label: "Dashboard",
    },
    {
      key: "/sales",
      icon: <Icon icon="mdi:cart-outline" width="20" height="20" />,
      label: "Sales",
    },
    {
      key: "/repairs",
      icon: <Icon icon="mdi:tools" width="20" height="20" />,
      label: "Repairs",
    },
    {
      key: "/team-members",
      icon: <Icon icon="mdi:account-group-outline" width="20" height="20" />,
      label: "Team Members",
    },
    {
      key: "/support",
      icon: <Icon icon="mdi:headset" width="20" height="20" />,
      label: "Support",
    },
    {
      key: "/reviews",
      icon: <Icon icon="mdi:star-outline" width="20" height="20" />,
      label: "Ratings/Reviews",
    },
    {
      key: "/account",
      icon: <Icon icon="mdi:account-circle-outline" width="20" height="20" />,
      label: "Account",
    },
  ];

  // Handle click on menu item
  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      // Dispatch logout action
      dispatch(logout());
      // Navigate to login page
      navigate("/login");
    } else {
      // Navigate to the clicked menu item's path
      navigate(e.key);
    }
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      className="dashboard-sidebar"
      theme="light"
    >
      <div
        className="logo"
        style={{ height: "64px", padding: "16px", position: "relative" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-start",
            alignItems: "center",
            height: "100%",
          }}
        >
          {collapsed ? (
            <img
              src={monaSingleLogo}
              alt="Mona Logo"
              style={{ maxHeight: "32px" }}
            />
          ) : (
            <img
              src={monaHeaderLogo}
              alt="Mona Logo"
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>
        <Button
          type="text"
          icon={
            <Icon
              icon={collapsed ? "mdi:chevron-right" : "mdi:chevron-left"}
              width="20"
              height="20"
              style={{ color: "#1890ff" }}
            />
          }
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-toggle"
          style={{
            position: "absolute",
            right: "-12px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 100,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
            border: "1px solid #e8e8e8",
            padding: 0,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-50%) scale(1.05)",
            },
          }}
        />
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[currentPath]}
        onClick={handleMenuClick}
        items={[
          ...menuItems,
          {
            key: "logout",
            icon: <Icon icon="mdi:logout" width="20" height="20" />,
            label: "Logout",
            className: "logout-item",
            style: {
              marginTop: "20px",
              color: "#ff4d4f",
            },
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
