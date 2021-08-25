import React, { useEffect, useState } from "react";
import { Table, Layout, Breadcrumb, Input, Button, Popconfirm} from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import receiptAPI from "../API/ReceiptAPI";
import token from "../readCookie";
import { connect } from "react-redux";

const ReceiptListPage = (props) => {
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [data, setData] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataChange, setDataChange] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const { Search } = Input;

  useEffect(() => {
    getData(); // eslint-disable-next-line
  }, [dataChange, searchTerm]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await receiptAPI.getAll();
      const dataReceipt = res.data;
      var arrReceipt = [];
      var infoCustom = [];
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
      dataReceipt.forEach((element) => {
        if (
          element.InfoKhach.indexOf(searchTerm) !== -1 ||
          element.ID.indexOf(searchTerm) !== -1
        ) {
          arrReceipt.push(element);
        }
      });
      setData(arrReceipt);
      if (!searchTerm) setData(dataReceipt);
      setLoading(false);
      console.log(res);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };
  
  
  const onSearch = (value) => {
    setSearchTerm(value);
    console.log(searchTerm);
  };

  const onDelete = async (id) => {
    var bodyFormData = new FormData();
    bodyFormData.append("token", token);
    bodyFormData.append("ID", id);
    try {
      const res = await receiptAPI.delete(bodyFormData);
      if (res.status === "success") {
        props.notifySuccess(" ✔ Xóa hóa đơn thành công");
        onDataChange();
      } else {
        props.notifyError(res.msg);
        console.log(res);
      }
    } catch (error) {
      props.notifyError("Error");
      console.log(error);
    }
  };

  const onDataChange = () => {
    setDataChange(!dataChange);
  };
  console.log(customer);
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
      render: (record) => (
        <>
           <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => onDelete(record.ID)}
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
 
  return (
    <Layout id="receipt-list-page" style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "20px 0" }}>
        <Breadcrumb.Item>
          <Link to="/manager/dashboard">Quản trị</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý hóa đơn</Breadcrumb.Item>
      </Breadcrumb>

      <div direction="horizontal" style={{ margin: "0 0 20px" }}>
        <Search
          placeholder="Tên KH, ID, ..."
          allowClear
          enterButton
          onSearch={onSearch}
          style={{ width: 200, float: "right" }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="ID"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "15", "20", "25", "30", "50"],
        }}
        onChange={onChange}
      />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    notifySuccess: (notifySuccess) => {
      dispatch({
        type: "NOTIFY_SUCCESS",
        notifySuccess,
      });
    },
    notifyError: (notifyError) => {
      dispatch({
        type: "NOTIFY_ERROR",
        notifyError,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(ReceiptListPage);
