import axiosClient from "./AxiosClient";
const headers = {
  "Content-Type": "multipart/form-data",
};
class UserAPI {
  getAll = () => {
    const url = "/users";
    return axiosClient.get(url);
  };
  add = (data) => {
    const url = "/createUsers";
    return axiosClient.post(url, data, {
      headers: headers,
    });
  };
  update = (data) => {
    const url = "/updateUsers";
    return axiosClient.post(url, data, {
      headers: headers,
    });
  };
  delete = (data) => {
    const url = "/deleteUsers";
    return axiosClient.post(url, data, {
      headers: headers,
    });
  };
  change = (data) => {
    const url = "/renewPassword";
    return axiosClient.post(url, data, {
      headers: headers,
    });
  }
}
const userAPI = new UserAPI();
export default userAPI;
