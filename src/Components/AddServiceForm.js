import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import Layout from "antd/lib/layout/layout";
import { CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import serviceAPI from "../API/ServiceAPI";
import token from "../readCookie";

const AddServiceForm = (props) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");

  const [serviceName, setServiceName] = useState();
  const [servicePrice, setServicePrice] = useState();

  const onAddService = () => {
    if (serviceName && servicePrice) {
      let bodyFormData = new FormData();
      bodyFormData.append("token", token);
      bodyFormData.append("TenDV", serviceName);
      bodyFormData.append("Gia", servicePrice);
      bodyFormData.append("TrangThai", "1");
      addService(bodyFormData);
    } else {
      props.notifyError(" Vui lòng điền đẩy đủ thông tin!");
    }
  };

  const addService = async (data) => {
    try {
      const res = await serviceAPI.add(data);
      if (res.status === "success") {
        console.log(res);
        props.notifySuccess(" ✔ Thêm dịch vụ thành công");
        props.changeAddServiceForm();
        props.onDataChange();
      } else {
        props.notifyError(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  return (
    <div className="background-form overlay">
      <Layout className="form-action">
        <div className="title-form">
          <Button
            onClick={() => props.changeAddServiceForm()}
            className="btn-close"
          >
            <CloseOutlined style={{ fontSize: 15 }} />
          </Button>
          <h3 className="site-page-header" title="Thêm dịch vụ">
            Thêm dịch vụ
          </h3>
        </div>
        <Form
          layout={formLayout}
          form={form}
          name="form-add-service"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="Tên dịch vụ">
            <Input
              onChange={(e) => setServiceName(e.target.value)}
              placeholder=""
            />
          </Form.Item>
          <Form.Item label="Giá dịch vụ">
            <Input
              type="number"
              onChange={(e) => setServicePrice(e.target.value)}
              placeholder=""
            />
          </Form.Item>
          <div className="btn-submit">
            <Button onClick={onAddService} type="primary">
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
export default connect(null, mapDispatchToProps)(AddServiceForm);
