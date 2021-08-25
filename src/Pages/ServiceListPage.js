import React, { useState, useEffect, useCallback } from "react";
import { Table, Layout, Breadcrumb, Input, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { FormOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import serviceAPI from "../API/ServiceAPI";
import { connect } from "react-redux";
import AddServiceForm from "../Components/AddServiceForm";
import token from "../readCookie";

const ServiceListPage = (props) => {
  const [data, setData] = useState([]);
  const [isAddService, setIsAddService] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [dataChange, setDataChange] = useState(false);
  const { Search } = Input;
  const { history } = props;

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await serviceAPI.getAll();
      const dataService = res.data;
      var arrService = [];
      dataService.forEach((element) => {
        if (
          element.TenDV.indexOf(searchTerm) !== -1 ||
          element.ID.indexOf(searchTerm) !== -1
        ) {
          arrService.push(element);
        }
      });
      setData(arrService);
      if (!searchTerm) setData(dataService);
      setLoading(false);
      console.log(dataChange);
    } catch (error) {
      setLoading(false);
    }
  }, [dataChange, searchTerm]);
  console.log(data);

  useEffect(() => {
    getData();
  }, [getData]);

  const onSearch = (value) => {
    setSearchTerm(value);
    console.log(searchTerm);
  };

  const onEdit = (dataEdit) => {
    history.push("/manager/service/" + dataEdit.ID + "/update");
    props.editRowData(dataEdit);
  };
  const onDelete = async (id) => {
    var bodyFormData = new FormData();
    bodyFormData.append("token", token);
    bodyFormData.append("ID", id);
    try {
      const res = await serviceAPI.delete(bodyFormData);
      if (res.status === "success") {
        props.notifySuccess(" ✔ Xóa dịch vụ thành công");
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

  const changeAddServiceForm = () => {
    setIsAddService(!isAddService);
  };

  const onDataChange = () => {
    setDataChange(!dataChange);
  };

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
    { title: "Dịch vụ", dataIndex: "TenDV", key: "TenDV" },
    {
      title: "Giá",
      dataIndex: "Gia",
      key: "Gia",
      sorter: {
        compare: (a, b) => a.Gia - b.Gia,
      },
    },
    {
      title: "Trạng Thái",
      dataIndex: "TrangThai",
      key: "TrangThai",
      render: (TrangThai) => {
        return <p>{TrangThai === "1" ? "Hiện có" : "Ngừng phục vụ"}</p>;
      },
      filters: [
        { text: "Hiện có", value: "1" },
        { text: "Ngừng phục vụ", value: "0" },
      ],
      onFilter: (value, record) => {
        return record.TrangThai === value;
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
    <Layout id="service-list-page" style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "20px 0" }}>
        <Breadcrumb.Item>
          <Link to="/manager/dashboard">Quản trị</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý dịch vụ</Breadcrumb.Item>
      </Breadcrumb>

      <div direction="horizontal" style={{ margin: "0 0 20px" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={changeAddServiceForm}
        >
          Thêm dịch vụ
        </Button>
        <Search
          placeholder="Tên dịch vụ, ID, ..."
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
          pageSizeOptions: ["10", "15", "20", "25", "30"],
        }}
      />
      {isAddService && (
        <AddServiceForm
          changeAddServiceForm={changeAddServiceForm}
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

export default connect(null, mapDispatchToProps)(ServiceListPage);
