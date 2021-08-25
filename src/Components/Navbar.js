import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Dropdown } from "antd";
import {
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";


const { Header} = Layout;

const Navbar = (props) => {
  const logOut = () => {
    props.logOut();
  };
  const toggle = () => {
    props.onCollapse();
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/manager/setting">Thiết Lập Cài Đặt</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/manager/changePassword">Đổi mật khẩu</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logOut}>
        Thoát
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="header" id="header-page">
      {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: toggle,
      })}
      <Menu id="navbarBoard" theme="dark" mode="horizontal">
        <Menu.Item key="1">
          {<SearchOutlined style={{ fontSize: "16px" }} />}
        </Menu.Item>
        <Menu.Item key="2">
          {<BellOutlined style={{ fontSize: "16px" }} />}
        </Menu.Item>
        <Menu.Item key="3">
          <Dropdown overlay={menu} trigger={["click"]}>
            <div
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <span role="img" className="anticon icon-user-option">
                {<MdAccountCircle size={20} />}
              </span>
              <DownOutlined />
            </div>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
