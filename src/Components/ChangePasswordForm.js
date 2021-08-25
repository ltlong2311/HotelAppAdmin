import React, { useState } from "react";
import { Form, Input, Breadcrumb, Button } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import token from "../readCookie";

const ChangePasswordForm = (props) => {
  const [form] = Form.useForm();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [retypePassword, setRetypePassword] = useState();
  const { history } = props;

  const onCancel = () => {
    history.push("/manager/dashboard")
  };

  console.log(oldPassword, newPassword, retypePassword);
  return (
    <Layout id="overview-page" style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/manager/dashboard">Quản trị</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Đổi mật khẩu</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 20,
          margin: 0,
        }}
      >
        <h3 className="title-update-form" title="Sửa thông tin phòng">
          Đổi mật khẩu
        </h3>
        <div className="form-update">
          <Form
            form={form}
            layout="horizontal"
            name="form-add-room"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 13 }}
            initialValues={{
              size: 30,
            }}
            size="large"
          >
            <Form.Item label="Mật khẩu cũ">
              <Input
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder=""
              />
            </Form.Item>
            <Form.Item label="Mật khẩu mới">
              <Input
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder=""
              />
            </Form.Item>
            <Form.Item label="Nhập lại mật khẩu">
              <Input
                type="number"
                onChange={(e) => setRetypePassword(e.target.value)}
                placeholder=""
              />
            </Form.Item>
            <div className="btn-action-group">
              <Button className="btn-cancel" onClick={onCancel}>
                Hủy bỏ
              </Button>
              <Button className="btn-update" type="primary">
                Update
              </Button>
            </div>
          </Form>
        </div>
      </Content>
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
export default connect(null, mapDispatchToProps)(ChangePasswordForm);
