import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import Layout from "antd/lib/layout/layout";
import { CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import userAPI from "../API/UserAPI";
import token from "../readCookie";

const AddUserForm = (props) => {
  const [form] = Form.useForm();
  const [nameUser, setNameUser] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [identityCardNum, setIdentityCardNum] = useState();
  const [birth, setBirth] = useState();
  const [address, setAddress] = useState();
  // const [level, setLevel] = useState("1");
  // const { Option } = Select;

  var bodyFormData = new FormData();
  bodyFormData.append("token", token);
  bodyFormData.append("HoTen", nameUser);
  bodyFormData.append("username", username);
  bodyFormData.append("password", password);
  bodyFormData.append("CMT", identityCardNum);
  bodyFormData.append("NgaySinh", birth);
  bodyFormData.append("DiaChi", address);

  const onAddUser = () => {
    if (
      nameUser &&
      username &&
      password &&
      identityCardNum &&
      birth &&
      address
    ) {
      if (identityCardNum.length >= 9 && identityCardNum.length <= 12) {
        let bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("HoTen", nameUser);
        bodyFormData.append("username", username);
        bodyFormData.append("password", password);
        bodyFormData.append("CMT", identityCardNum);
        bodyFormData.append("NgaySinh", birth);
        bodyFormData.append("DiaChi", address);
        addUser(bodyFormData);
      } else {
        props.notifyError(" Vui lòng iền đúng độ dài chứng minh thư!");
      }
    } else {
      props.notifyError(" Vui lòng điền đẩy đủ thông tin!");
    }
  };

  const addUser = async (data) => {
    try {
      const res = await userAPI.add(data);
      if (res.status === "success") {
        console.log(res);
        props.notifySuccess(" ✔ Thêm dịch vụ thành công");
        props.changeAddUserForm();
        props.onDataChange();
      } else {
        console.log(res);
        props.notifyError(res.msg);
      }
    } catch (error) {
      props.notifyError("Error");
      console.log(error);
    }
  };


  const onChangeDate = (date, dateString) => {
    console.log(date);
    console.log(dateString);
    setBirth(dateString);
  };

  // function handleChange(e) {
  //   setLevel(e.value);
  // }

  return (
    <div className="background-form overlay">
      <Layout className="form-action">
        <div className="title-form">
          <Button
            onClick={() => props.changeAddUserForm()}
            className="btn-close"
          >
            <CloseOutlined style={{ fontSize: 15 }} />
          </Button>
          <h3 className="site-page-header" title="Thêm dịch vụ">
            Thêm nhân viên
          </h3>
        </div>
        <Form
          layout="horizontal"
          form={form}
          name="form-add-user"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="username">
            <Input
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
            />
          </Form.Item>
          <Form.Item label="password">
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
          </Form.Item>
          <Form.Item label="Họ tên">
            <Input
              onChange={(e) => setNameUser(e.target.value)}
              placeholder=""
            />
          </Form.Item>
          <Form.Item label="CMND">
            <Input
              type="number"
              onChange={(e) => setIdentityCardNum(e.target.value)}
              placeholder=""
            />
          </Form.Item>
          <Form.Item label="Ngày sinh">
            <DatePicker onChange={onChangeDate} placeholder="Chọn ngày" />
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input
              onChange={(e) => setAddress(e.target.value)}
              placeholder=""
            />
          </Form.Item>
          {/* <Form.Item label="Vai trò">
            <Select
              labelInValue
              defaultValue={{ value: "1" }}
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="2">Quản lý</Option>
              <Option value="1">Nhân viên</Option>
            </Select>
          </Form.Item> */}
          <div className="btn-submit">
            <Button onClick={onAddUser} type="primary">
              Xác nhận
            </Button>
          </div>
        </Form>
      </Layout>
    </div>
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
export default connect(null, mapDispatchToProps)(AddUserForm);
