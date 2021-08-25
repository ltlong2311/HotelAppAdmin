import axiosClient from "./AxiosClient";

class LoginAPI {
  login = (data) => {
    const url = "/login";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
}
const loginAPI = new LoginAPI();
export default loginAPI;
