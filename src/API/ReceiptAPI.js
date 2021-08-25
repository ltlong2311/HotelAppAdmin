import axiosClient from "./AxiosClient";

const headers = {
  "Content-Type": "multipart/form-data",
};
class ReceiptAPI {
  getAll = () => {
    const url = "/pays";
    return axiosClient.get(url);
  };
  delete = (data) => {
    const url = "/deletePay";
    return axiosClient.post(url, data, {
      headers: headers,
    });
  };
}
const receiptAPI = new ReceiptAPI();
export default receiptAPI;
