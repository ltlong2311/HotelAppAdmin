import React, { useState } from "react";
import { Form, Input, Button, Breadcrumb, Switch, Checkbox } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import roomAPI from "../API/RoomAPI";
import token from "../readCookie";

const UpdateRoomForm = (props) => {
  const [form] = Form.useForm();

  const [floor, setFloor] = useState(props.editRowData.IDPhong);
  const [roomName, setRoomName] = useState(props.editRowData.TenPhong);
  const [roomRate, setRoomRate] = useState(props.editRowData.Gia);
  const [isUsed, setIsUsed] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const { history } = props;

  // const params = useParams();
  // useEffect(() => {
  //   const id = params;  // });

  console.log(isUsed);

  const onUpdateRoom = () => {
    if (floor && roomName && roomRate) {
      if (floor <= 10) {
        let bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("ID", props.editRowData.ID);
        bodyFormData.append("IDTang", floor);
        bodyFormData.append("TenPhong", roomName);
        bodyFormData.append("Gia", roomRate);
        bodyFormData.append("TrangThai", isUsed ? "1" : "0");
        bodyFormData.append("TuSua", isFixed ? "1" : "0");
        updateRoom(bodyFormData);
      } else {
        props.notifyError(" Vui lòng điền đúng số tầng!");
      }
    } else {
      props.notifyError(" Vui lòng điền đẩy đủ thông tin!");
    }
  };

  const updateRoom = async (data) => {
    try {
      const res = await roomAPI.update(data);
      if (res.status === "success") {
        props.notifySuccess(" ✔ Update thành công");
        history.push("/manager/room/list");
      } else {
        props.notifyError(res.msg);
        console.log(res);
      }
    } catch (error) {
      props.notifyError("Error");
      console.log(error);
    }
  };

  const cancelUpdate = () => {
    history.push("/manager/room/list");
  };

  return (
    <Layout id="overview-page" style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/manager/dashboard">Quản trị</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/manager/room/list">Quản lý phòng</Link>
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
        <h3 className="title-update-form" title="Sửa thông tin phòng">
          Sửa thông tin phòng
        </h3>
        <div className="form-update">
          <Form
            form={form}
            name="form-add-room"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 13 }}
            initialValues={{
              size: 30,
            }}
            size="large"
          >
            <Form.Item label="Tên phòng">
              <Input
                onChange={(e) => setRoomName(e.target.value)}
                placeholder=""
                defaultValue={props.editRowData.TenPhong}
              />
            </Form.Item>
            <Form.Item label="Tầng">
              <Input
                onChange={(e) => setFloor(e.target.value)}
                placeholder=""
                defaultValue={floor}
              />
            </Form.Item>
            <Form.Item label="Giá phòng">
              <Input
                type="number"
                onChange={(e) => setRoomRate(e.target.value)}
                placeholder=""
                defaultValue={props.editRowData.Gia}
              />
            </Form.Item>
            <Form.Item label="Trạng Thái">
              <Switch
                checkedChildren="Có khách"
                unCheckedChildren="Trống"
                defaultChecked={
                  props.editRowData.TrangThai === "1" ? true : false
                }
                placeholder=""
                onChange={(checked) => setIsUsed(checked)}
              />
            </Form.Item>
            <Form.Item label="Tu Sửa">
              <Checkbox
                onChange={(e) => setIsFixed(e.target.checked)}
                defaultChecked={props.editRowData.TuSua === "1" ? true : false}
              />
            </Form.Item>
            <div className="btn-action-group">
              <Button className="btn-cancel" onClick={cancelUpdate}>
                Hủy bỏ
              </Button>

              <Button
                className="btn-update"
                onClick={onUpdateRoom}
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRoomForm);
