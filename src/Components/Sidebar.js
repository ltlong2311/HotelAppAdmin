import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { MdRoomService } from "react-icons/md";
import { Link } from "react-router-dom";

import "../Styles/HomePage.css";

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = (props) => {
  const onCollapse = () => {
    props.onCollapse();
  };

  return (
    <Sider collapsible collapsed={props.collapsed} onCollapse={onCollapse}>
      {props.collapsed ? (
        <div className="logo-page"></div>
      ) : (
        <div className="logo">
          <h1>HotelManagement</h1>
        </div>
      )}
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/manager/dashboard"> Tổng quan</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          <Link to="/manager/room/list"> Quản lý phòng</Link>
        </Menu.Item>
        <Menu.Item key="service" icon={<MdRoomService />}>
          <Link to="/manager/service/list"> Quản lý dịch vụ</Link>
        </Menu.Item>
        <Menu.Item key="sub3" icon={<ShoppingCartOutlined />}>
          <Link to="/manager/receipt/list"> Quản lý hóa đơn</Link>
        </Menu.Item>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Quản lý user">
          <Menu.Item key="6">
            {" "}
            <Link to="/manager/user">Thông tin</Link>
          </Menu.Item>
          <Menu.Item key="8">
            {" "}
            <Link to="/manager/user/active">Hoạt động</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<QuestionCircleOutlined />}>
          Thông tin
        </Menu.Item>
        
      </Menu>
    </Sider>
  );
};

export default Sidebar;
