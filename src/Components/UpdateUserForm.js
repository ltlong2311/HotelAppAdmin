import React, { useState } from "react";
import { Form, Input, Button, Breadcrumb, DatePicker } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import token from "../readCookie";
import userAPI from "../API/UserAPI";
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';

const UpdateUserForm = (props) => {
  const [form] = Form.useForm();

  const [nameUser, setNameUser] = useState(props.editRowData.HoTen);
  const [identityCardNum, setIdentityCardNum] = useState(
    props.editRowData.CMT
  );
  const [birth, setBirth] = useState(props.editRowData.NgaySinh);
  const [address, setAddress] = useState(props.editRowData.DiaChi);
  const { history } = props;

  const onUpdateUser = () => {
    if (nameUser && identityCardNum && birth && address) {
      if (identityCardNum.length >= 9 && identityCardNum.length <= 12) {
        let bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("ID", props.editRowData.ID);
        bodyFormData.append("HoTen", nameUser);
        bodyFormData.append("CMT", identityCardNum);
        bodyFormData.append("NgaySinh", birth);
        bodyFormData.append("DiaChi", address);
        updateUser(bodyFormData);
      }
      else{
        props.notifyError(" Vui lòng iền đúng độ dài chứng minh thư!");
      }
    } else {
      props.notifyError(" Vui lòng điền đẩy đủ thông tin!");
    }
  };

  const updateUser = async (data) => {
    try {
      const res = await userAPI.update(data);
      if (res.status === "success") {
        props.notifySuccess(" ✔ Thay đổi thành công");
        history.push("/manager/user/list");
      } else {
        props.notifyError(res.msg);
        console.log(res);
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

  const cancelUpdate = () => {
    history.push("/manager/user/list");
  };

  return (
    <Layout id="overview-page" style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/manager/dashboard">Quản trị</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/manager/user/list">Quản lý user</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Update</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 20,
          margin: 0,
        }}
      >
        <h3 className="title-update-form" title="Sửa thông tin user">
          Sửa thông tin user
        </h3>
        <div className="form-update">
          <Form
            form={form}
            name="form-add-user"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 13 }}
            initialValues={{
              size: 30,
            }}
            size="large"
          >
            <Form.Item label="Họ Tên">
              <Input
                onChange={(e) => setNameUser(e.target.value)}
                placeholder=""
                defaultValue={props.editRowData.HoTen}
              />
            </Form.Item>
            <Form.Item label="CMND">
              <Input
                type="number"
                onChange={(e) => setIdentityCardNum(e.target.value)}
                placeholder=""
                defaultValue={props.editRowData.CMT}
              />
            </Form.Item>
            <Form.Item label="Ngày sinh">
              <DatePicker
                onChange={onChangeDate}
                defaultValue={moment(props.editRowData.NgaySinh, dateFormat)} format={dateFormat}
                placeholder="Chọn ngày"
              />
            </Form.Item>
            <Form.Item label="Địa chỉ">
              <Input
                onChange={(e) => setAddress(e.target.value)}
                placeholder=""
                defaultValue={props.editRowData.DiaChi}
              />
            </Form.Item>
            <div className="btn-action-group">
              <Button className="btn-cancel" onClick={cancelUpdate}>
                Hủy bỏ
              </Button>
              <Button
                className="btn-update"
                onClick={onUpdateUser}
                type="primary"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    editRowData: state.editRow,
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserForm);
