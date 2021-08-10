import React from "react";
import { Layout, Breadcrumb, Card, Col, Row } from "antd";
// import { Button } from "antd";
import { Link } from "react-router-dom";
import FooterPage from "../Components/FooterPage";
import "../Styles/Overview.css";
import Chart from "../Components/Chart";

const { Content } = Layout;

const OverviewPage = () => {
  return (
    <Layout
      id="overview-page"
      style={{ padding: "0 24px 24px" }}
    >
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/manager/dashboard">Quản trị</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Tổng quan</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Phòng trống" bordered={false} className="room-num">
              <span>18</span>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Phòng đã dùng" bordered={false} className="revenue-month-num">
              <span>3</span>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Dịch vụ" bordered={false} className="service-num">
              <span>9</span>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Hóa đơn" bordered={false} className="receipt-num">
              <span>6</span>
            </Card>
          </Col>
        </Row>
      </div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <h4>Dashboard</h4>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 900,
        }}
      >
        <Chart />
      </Content>
      <FooterPage />
    </Layout>
  );
};

export default OverviewPage;
