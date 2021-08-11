import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Layout, Breadcrumb, Input, Space, Button } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const { Search } = Input;

const onSearch = (value) => console.log(value);

const ReceiptListPage = () => {
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [data, setData] = useState([]);
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`/pays`)
      .then((res) => {
        var dataReceipt = res.data.data;
        const infoCustom = [];
        // console.log(res);
        for (let i = 0; i < dataReceipt.length; i++) {
          infoCustom.push(dataReceipt[i].InfoKhach);
          var customName = dataReceipt[i].InfoKhach.Ten;
          dataReceipt[i].InfoKhach = customName;

          var dataServiceList = dataReceipt[i].DichVu;
          var arrService = [];
          for (let j = 0; j < dataServiceList.length; j++) {
            arrService.push(dataServiceList[j].TenDV);
          }
          dataReceipt[i].DichVu = arrService.join(", ");
        }
        setCustomer(infoCustom);
        setData(dataReceipt);
      })
      .catch((error) => console.log(error));
  };
    console.log(data);
    console.log(customer);
  //   console.log(services);

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      sorter: {
        compare: (a, b) => a.ID - b.ID,
        multiple: 1,
      },
    },
    { title: "ID Phòng", dataIndex: "IDPhong", key: "IDPhong" },
    { title: "ID User", dataIndex: "IDUser", key: "IDUser" },
    { title: "Khách hàng", dataIndex: "InfoKhach", key: "InfoKhach" },
    { title: "Dịch vụ", dataIndex: "DichVu", key: "DichVu" },
    {
      title: "Thanh Toán",
      dataIndex: "ThanhToan",
      key: "ThanhToan",
      sorter: {
        compare: (a, b) => a.ThanhToan - b.ThanhToan,
        multiple: 2,
      },
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createDate",
      key: "createDate",
      sorter: {
        compare: (a, b) => a.createDate - b.createDate,
        multiple: 3,
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <>
          <Button type="danger" icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <Layout id="room-list-page" style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "20px 0" }}>
        <Breadcrumb.Item>
          <Link to="/manager/dashboard">Quản trị</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý hóa đơn</Breadcrumb.Item>
      </Breadcrumb>

      <Space direction="horizontal" style={{ margin: "0 0 20px" }}>
        <Search
          placeholder=""
          allowClear
          enterButton
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 15 }}
        onChange={onChange}
      />
    </Layout>
  );
};

export default ReceiptListPage;
