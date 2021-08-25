import axiosClient from "./AxiosClient";

const headers = {
  "Content-Type": "multipart/form-data",
};
class ServiceAPI {
  getAll = () => {
    const url = "/services";
    return axiosClient.get(url);
  };
  add = (data) => {
    const url = "/createServices";
    return axiosClient.post(url, data, {
      headers: headers,
    });
  };
  update = (data) => {
    const url = "/updateServices";
    return axiosClient.post(url, data, {
      headers: headers,
    });
  };
  delete = (data) => {
    const url = "/deleteServices";
    return axiosClient.post(url, data, {
      headers: headers,
    });
  };
}
const serviceAPI = new ServiceAPI();
export default serviceAPI;
