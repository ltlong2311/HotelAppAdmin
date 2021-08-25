import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import Layout from "antd/lib/layout/layout";
import { CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import roomAPI from "../API/RoomAPI";
import token from "../readCookie";

const AddRoomForm = (props) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");

  const [floor, setFloor] = useState();
  const [roomName, setRoomName] = useState();
  const [roomRate, setRoomRate] = useState();

  const onAddRoom = () => {
    if (floor && roomName && roomRate) {
      if (floor <= 10) {
        let bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("IDTang", floor);
        bodyFormData.append("TenPhong", roomName);
        bodyFormData.append("Gia", roomRate);
        bodyFormData.append("TrangThai", "0");
        bodyFormData.append("TuSua", "0");
        addRoom(bodyFormData);
      } else {
        props.notifyError(" Vui lòng điền đúng số tầng!");
      }
    } else {
      props.notifyError(" Vui lòng điền đẩy đủ thông tin!");
    }
  };

  const addRoom = async (data) => {
    try {
      const res = await roomAPI.add(data);
      if (res.status === "success") {
        console.log(res);
        props.notifySuccess(" ✔ Thêm phòng thành công");
        props.changeAddRoomForm();
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

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  return (
    <div className="background-form overlay">
      <Layout className="form-action">
        <div className="title-form">
          <Button
            onClick={() => props.changeAddRoomForm()}
            className="btn-close"
          >
            <CloseOutlined style={{ fontSize: 15 }} />
          </Button>
          <h3 className="site-page-header" title="Thêm phòng">
            Thêm phòng
          </h3>
        </div>
        <Form
          layout={formLayout}
          form={form}
          name="form-add-room"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="Tên phòng">
            <Input
              onChange={(e) => setRoomName(e.target.value)}
              placeholder=""
            />
          </Form.Item>
          <Form.Item label="Tầng">
            <Input onChange={(e) => setFloor(e.target.value)} placeholder="" />
          </Form.Item>
          <Form.Item label="Giá phòng">
            <Input
              type="number"
              onChange={(e) => setRoomRate(e.target.value)}
              placeholder=""
            />
          </Form.Item>
          <div className="btn-submit">
            <Button onClick={onAddRoom} type="primary">
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
export default connect(null, mapDispatchToProps)(AddRoomForm);
