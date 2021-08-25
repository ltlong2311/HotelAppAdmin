import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Image } from "antd";
import imageIconLogin from "../images/hotel.png";
import { useHistory } from "react-router-dom";
import loginAPI from "../API/LoginAPI";
const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [rememberLogin, setRememberLogin] = useState(true);
  const history = useHistory();

  var bodyFormData = new FormData();
  bodyFormData.append("username", username);
  bodyFormData.append("password", password);

  const setCookie = (c_name, value, exdays) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value =
      escape(value) +
      (exdays === null ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
  };

  const onLogin = () => {
    if (username && password) {
      login();
    }
  };

  const login = async () => {
    try {
      const res = await loginAPI.login(bodyFormData);
      console.log(res);
      if (res.status === "success") {
        let token = res.data.token;
        if (rememberLogin) {
          setCookie("token", token, 5);
        }
        sessionStorage.setItem("token", token);
        history.push("/manager/dashboard");
      } else {
        alert(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-page">
      <div className="center">
        <div className="image-login">
          <Image width={50} height={50} src={imageIconLogin} />
        </div>
        <Form
          name="basic"
          className="login-form"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản của bạn!",
              },
            ]}
          >
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox
              defaultChecked={rememberLogin}
              onChange={(e) => setRememberLogin(e.target.checked)}
            >
              Ghi nhớ đăng nhập
            </Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              onClick={onLogin}
              className="btn-login"
              type="primary"
              htmlType="submit"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
