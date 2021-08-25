import axiosClient from "./AxiosClient";

const headers = {
  "Content-Type": "multipart/form-data",
};
class RoomAPI {
  getAll = (params) => {
    const url = "/rooms";
    return axiosClient.get(url, { params });
  };
  add = (data) => {
    const url = "/createRooms";
    return axiosClient.post(url, data, {
      headers: headers,
    });
  };
  update = (data) => {
    const url = "/updateRooms";
    return axiosClient.post(url, data, {
      headers: headers,
    });
  };
  delete = (data) => {
    const url = "/deleteRooms";
    return axiosClient.post(url, data, {
      headers: headers,
    });
  };
  update2 = (data) => {
    return axiosClient({
      method: "post",
      url: "/updateRooms",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
}
const roomAPI = new RoomAPI();
export default roomAPI;
