import React, { useState } from "react";
import { Form, Input, Button, Breadcrumb, Switch } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import token from "../readCookie";
import serviceAPI from "../API/ServiceAPI";

const UpdateServiceForm = (props) => {
  const [form] = Form.useForm();

  const [serviceName, setServiceName] = useState(props.editRowData.TenDV);
  const [servicePrice, setServicePrice] = useState(props.editRowData.Gia);
  const [isUsed, setIsUsed] = useState(false);
  const { history } = props;

  const onUpdateService = () => {
    if (serviceName && servicePrice) {
      let bodyFormData = new FormData();
      bodyFormData.append("token", token);
      bodyFormData.append("ID", props.editRowData.ID);
      bodyFormData.append("TenDV", serviceName);
      bodyFormData.append("Gia", servicePrice);
      bodyFormData.append("TrangThai", isUsed ? "1" : "0");
      updateService(bodyFormData);
    } else {
      props.notifyError(" Vui lòng điền đẩy đủ thông tin!");
    }
  };

  const updateService = async (data) => {
    try {
      const res = await serviceAPI.update(data);
      if (res.status === "success") {
        props.notifySuccess(" ✔ Thay đổi thành công");
        history.push("/manager/service/list");
      } else {
        props.notifyError(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancelUpdate = () => {
    history.push("/manager/service/list");
  };

  return (
    <Layout id="overview-page" style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/manager/dashboard">Quản trị</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/manager/service/list">Quản lý dịch vụ</Link>
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
        <h3 className="title-update-form" title="Sửa thông tin dịch vụ">
          Sửa thông tin dịch vụ
        </h3>
        <div className="form-update">
          <Form
            form={form}
            name="form-add-service"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 13 }}
            initialValues={{
              size: 30,
            }}
            size="large"
          >
            <Form.Item label="Tên dịch vụ">
              <Input
                onChange={(e) => setServiceName(e.target.value)}
                placeholder=""
                defaultValue={props.editRowData.TenDV}
              />
            </Form.Item>
            <Form.Item label="Giá dịch vụ">
              <Input
                type="number"
                onChange={(e) => setServicePrice(e.target.value)}
                placeholder=""
                defaultValue={props.editRowData.Gia}
              />
            </Form.Item>
            <Form.Item label="Trạng Thái">
              <Switch
                checkedChildren="Hiện có"
                unCheckedChildren="Ngừng phục vụ"
                defaultChecked={
                  props.editRowData.TrangThai === "1" ? true : false
                }
                placeholder=""
                onChange={(checked) => setIsUsed(checked)}
              />
            </Form.Item>
            <div className="btn-action-group">
              <Button className="btn-cancel" onClick={cancelUpdate}>
                Hủy bỏ
              </Button>
              <Button
                className="btn-update"
                onClick={onUpdateService}
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateServiceForm);
