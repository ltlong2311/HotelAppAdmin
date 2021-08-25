import React, { useState, useEffect } from "react";
import { Table, Layout, Breadcrumb, Input, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { FormOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import token from "../readCookie";
import userAPI from "../API/UserAPI";
import AddUserForm from "../Components/AddUserForm";
import { connect } from "react-redux";

const UserListPage = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);
  const [dataChange, setDataChange] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const { Search } = Input;
  const { history } = props;

  useEffect(() => {
    getData(); // eslint-disable-next-line
  }, [dataChange, searchTerm]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await userAPI.getAll();
      const dataUser = res.data;
      var arrUser = [];
      dataUser.forEach((element) => {
        if (
          element.HoTen.indexOf(searchTerm) !== -1 ||
          element.ID.indexOf(searchTerm) !== -1
        ) {
          arrUser.push(element);
        }
      });
      setData(arrUser);
      if (!searchTerm) setData(dataUser);
      setLoading(false);
      console.log(res);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };
  console.log(data);

  const onSearch = (value) => {
    setSearchTerm(value);
    console.log(searchTerm);
  };

  const onEdit = (dataEdit) => {
    history.push("/manager/user/" + dataEdit.ID + "/update");
    props.editRowData(dataEdit);
  };
  const onDelete = async (id) => {
    var bodyFormData = new FormData();
    bodyFormData.append("token", token);
    bodyFormData.append("ID", id);
    try {
      const res = await userAPI.delete(bodyFormData);
      if (res.status === "success") {
        props.notifySuccess(" ✔ Xóa thành công");
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

  const changeAddUserForm = () => {
    setIsAddUser(!isAddUser);
  };

  const onDataChange = () => {
    setDataChange(!dataChange);
  };

  function formatDate(input) {
    var splitDate = input.split("-");
    if (splitDate.count === 0) {
      return null;
    }
    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2];
    return day + "-" + month + "-" + year;
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      sorter: {
        compare: (a, b) => a.ID - b.ID,
        multiple: 2,
      },
    },
    { title: "Họ Tên", dataIndex: "HoTen", key: "HoTen" },
    { title: "Username", dataIndex: "userName", key: "userName" },
    {
      title: "Ngày sinh",
      dataIndex: "NgaySinh",
      key: "NgaySinh",
      render: (NgaySinh) => {
        return <p>{formatDate(NgaySinh)}</p>;
      },
    },
    { title: "CMND", dataIndex: "CMT", key: "CMT" },
    { title: "Địa chỉ", dataIndex: "DiaChi", key: "DiaChi" },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        return <p>{role === "2" ? "Quản lý" : "Nhân viên"}</p>;
      },
      filters: [
        { text: "Quản lý", value: "2" },
        { text: "Nhân viên", value: "1" },
      ],
      onFilter: (value, record) => {
        return record.role === value;
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <>
          <Button
            type=""
            icon={<FormOutlined />}
            onClick={() => onEdit(record)}
          >
            Sửa
          </Button>
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
    <Layout id="overview-page" style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "20px 0" }}>
        <Breadcrumb.Item>
          <Link to="/manager/dashboard">Quản trị</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý user</Breadcrumb.Item>
      </Breadcrumb>

      <div direction="horizontal" style={{ margin: "0 0 20px" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={changeAddUserForm}
        >
          Thêm user
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
        loading={loading}
        rowKey="ID"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "15", "20", "30"],
        }}
      />
      {isAddUser && (
        <AddUserForm
          changeAddUserForm={changeAddUserForm}
          onDataChange={onDataChange}
        />
      )}
    </Layout>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    editRowData: (editRowData) => {
      dispatch({
        type: "EDIT_ROW",
        editRowData,
      });
    },
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

export default connect(null, mapDispatchToProps)(UserListPage);
