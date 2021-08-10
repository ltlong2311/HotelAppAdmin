import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { BrowserRouter as Router} from "react-router-dom";
import "../Styles/HomePage.css";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import RouterPage from "../Routes/RouterPage";

const AdminHomePage = (props) => {
  const logOut = () => {
    props.logOut();
  };
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    console.log(collapsed);
    setCollapsed(!collapsed);
  };
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar collapsed={collapsed} onCollapse={toggle} />
        <Layout className="site-layout site-layout-background">
          <Navbar collapsed={collapsed} onCollapse={toggle} logOut={logOut} />
          <RouterPage />
        </Layout>
      </Layout>
    </Router>
  );
};

export default AdminHomePage;
