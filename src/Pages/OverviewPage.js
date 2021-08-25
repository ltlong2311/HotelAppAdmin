import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import FooterPage from "../Components/FooterPage";
import Chart from "../Components/Chart";
import tray from "../icons/tray.png";
import bed from "../icons/beds2.png";
import bed2 from "../icons/double_bed.png";
import money from "../icons/coin.png";
import { connect } from "react-redux";
import roomAPI from "../API/RoomAPI";
import serviceAPI from "../API/ServiceAPI";
import receiptAPI from "../API/ReceiptAPI";
const { Content } = Layout;

const OverviewPage = (props) => {
  const [numOfRoomsAvailable, setNumOfRoomsAvailable] = useState();
  const [numOfRoomsUsed, setNumOfRoomsUsed] = useState();
  const [numOfService, setNumOfService] = useState();
  const [numOfReceipt, setNumOfReceipt] = useState();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resRoom = await roomAPI.getAll();
      const resService = await serviceAPI.getAll();
      const resReceipt = await receiptAPI.getAll();
      var dataRoom = resRoom.data;
      var numA = 0;
      var numU = 0;
      dataRoom.forEach((e) => {
        (e.TrangThai === "0" && e.TuSua === "0") && numA++;
        (e.TrangThai === "1" && e.TuSua === "0") && numU++;
      });
      setNumOfService(resService.data.length);
      setNumOfReceipt(resReceipt.data.length);
    } catch (error) {
      console.log("Error", error);
    }
    setNumOfRoomsAvailable(numA);
    setNumOfRoomsUsed(numU);
    console.log(dataRoom);
  };

  return (
    <Layout id="overview-page" style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/manager/dashboard">Quản trị</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Tổng quan</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Phòng trống" bordered={false} className="room-title">
              <span className="room-num">{numOfRoomsAvailable}</span>
              <img width={35} height={35} src={bed} alt="icon" />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Phòng đã dùng"
              bordered={false}
              className="room-active-title"
            >
              <span className="room-active-num">{numOfRoomsUsed}</span>
              <img width={35} height={35} src={bed2} alt="icon" />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Dịch vụ" bordered={false} className="service-title">
              <span className="service-num">{numOfService}</span>
              <img width={35} height={35} src={tray} alt="icon" />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Hóa đơn" bordered={false} className="receipt-title">
              <span className="receipt-num">{numOfReceipt}</span>
              <img width={35} height={35} src={money} alt="icon" />
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
        }}
      >
        <Chart />
      </Content>
      <FooterPage />
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    totalNumOfRooms: state.totalNumOfRooms,
  };
};

export default connect(mapStateToProps)(OverviewPage);
