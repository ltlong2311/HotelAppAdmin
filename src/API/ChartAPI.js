import axiosClient from "./AxiosClient";

class ChartAPI {
  dataFilter= (data) => {
    const url = "/statisticPay";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
}
const chartAPI = new ChartAPI();
export default chartAPI;
