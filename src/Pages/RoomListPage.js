import React, { useState, useEffect } from "react";
import { Table, Layout, Breadcrumb, Input, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { FormOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AddRoomForm from "../Components/AddRoomForm";
import { connect } from "react-redux";
import { Content } from "antd/lib/layout/layout";
import roomAPI from "../API/RoomAPI";
import token from "../readCookie";

const RoomListPage = (props) => {
  const [data, setData] = useState([]);
  const [isAddRoom, setIsAddRoom] = useState(false);
  const [loading, setLoading] = useState(false);
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
      const res = await roomAPI.getAll();
      const dataRoom = res.data;
      var arrRoom = [];
      dataRoom.forEach((element) => {
        if (
          element.TenPhong.indexOf(searchTerm) !== -1 ||
          element.ID.indexOf(searchTerm) !== -1
        ) {
          arrRoom.push(element);
        }
      });
      setData(arrRoom);
      if (!searchTerm) setData(dataRoom);
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
  const onChange = (e) => {
    // console.log(e.target.value);
  };

  const modifiedData = data.map(({ body, ...item }) => ({
    ...item,
    key: item.id,
    comment: body,
  }));

  // console.log(modifiedData);

  const onEdit = (dataEdit) => {
    history.push("/manager/room/" + dataEdit.ID + "/update");
    props.editRowData(dataEdit);
  };
  const onDelete = async (id) => {
    var bodyFormData = new FormData();
    bodyFormData.append("token", token);
    bodyFormData.append("ID", id);
    try {
      const res = await roomAPI.delete(bodyFormData);
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

  const changeAddRoomForm = () => {
    setIsAddRoom(!isAddRoom);
  };

  const onDataChange = () => {
    setDataChange(!dataChange);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      sorter: {
        compare: (a, b) => a.ID - b.ID,
        multiple: 1,
      },
    },
    {
      title: "Tầng",
      dataIndex: "IDPhong",
      key: "IDPhong",
      editable: true,
      sorter: {
        compare: (a, b) => a.IDPhong - b.IDPhong,
      },
    },
    {
      title: "Tên Phòng",
      dataIndex: "TenPhong",
      editable: true,
    },
    {
      title: "Giá",
      dataIndex: "Gia",
      key: "Gia",
      editable: true,
      sorter: {
        compare: (a, b) => a.Gia - b.Gia,
      },
    },
    {
      title: "Trạng Thái",
      dataIndex: "TrangThai",
      render: (TrangThai) => {
        return <p>{TrangThai === "1" ? "Đã dùng" : "Trống"}</p>;
      },
      filters: [
        { text: "Đã dùng", value: "1" },
        { text: "Trống", value: "0" },
      ],
      onFilter: (value, record) => {
        return record.TrangThai === value;
      },
    },
    {
      title: "Tu sửa",
      dataIndex: "TuSua",
      render: (TuSua) => {
        return <p>{TuSua === "1" ? "Đang sửa" : "Không"}</p>;
      },
      filters: [
        { text: "Đang sửa", value: "1" },
        { text: "Không", value: "0" },
      ],
      onFilter: (value, record) => {
        return record.TuSua === value;
      },
    },
    {
      title: "Action",
      dataIndex: "",
      align: "center",
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
    <Layout id="room-list-page" style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "20px 0" }}>
        <Breadcrumb.Item>
          <Link to="/manager/dashboard">Quản trị</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý phòng</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ margin: "0 0 20px", width: "100%" }}>
        <Button
          onClick={changeAddRoomForm}
          type="primary"
          icon={<PlusOutlined />}
        >
          Thêm phòng
        </Button>
        <Search
          placeholder="Tên phòng, ID, ..."
          allowClear
          enterButton
          onChange={onChange}
          onSearch={onSearch}
          style={{ width: 200, float: "right" }}
        />
      </div>
      <Content>
        <Table
          columns={columns}
          dataSource={modifiedData}
          loading={loading}
          rowKey={(record) => record.ID}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "15", "20", "25", "30", "50"],
          }}
        />
      </Content>

      {isAddRoom && (
        <AddRoomForm
          changeAddRoomForm={changeAddRoomForm}
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

export default connect(null, mapDispatchToProps)(RoomListPage);
