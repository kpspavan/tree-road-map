import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import "./Navbar.css";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className="header">
      <div className="logo">
        <Menu mode="horizontal" theme="blue" style={{ flex: 1 }}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
        </Menu>
      </div>
      <div className="icons">
        <UserOutlined
          style={{ fontSize: "24px", color: "#fff", marginRight: "16px" }}
        />
        <SettingOutlined style={{ fontSize: "24px", color: "#fff" }} />
      </div>
    </Header>
  );
};

export default Navbar;
