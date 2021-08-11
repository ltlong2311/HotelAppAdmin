import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Layout, Breadcrumb, Input, Button } from "antd";
import { Link } from "react-router-dom";
import {
  FormOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const ServiceListPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`/services`)
      .then((res) => {
        const dataRoom = res.data.data;
        console.log(res);
        setData(dataRoom);
      })
      .catch((error) => console.log(error));
  };
  console.log(data);

  const columns = [
    { title: "ID", dataIndex: "ID", key: "ID", sorter: {
      compare: (a, b) => a.ID - b.ID,
      multiple: 2,
    }},
    { title: "Tên Phòng", dataIndex: "TenDV", key: "TenDV" },
    { title: "Giá", dataIndex: "Gia", key: "Gia" },
    { title: "Trạng Thái", dataIndex: "TrangThai", key: "TrangThai" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <div className="btn-action">
          <Button type="" icon={<FormOutlined />}>
            Sửa
          </Button>{" "}
          <Button type="danger" icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const { Search } = Input;

  const onSearch = (value) => console.log(value);
  return (
    <Layout id="overview-page" style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "20px 0" }}>
        <Breadcrumb.Item>
          <Link to="/manager/dashboard">Quản trị</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý dịch vụ</Breadcrumb.Item>
      </Breadcrumb>

      <div direction="horizontal" style={{ margin: "0 0 20px" }}>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm dịch vụ
        </Button>
        <Search
          placeholder=""
          allowClear
          enterButton
          onSearch={onSearch}
          style={{ width: 200, float: "right" }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </Layout>
  );
};

export default ServiceListPage;
