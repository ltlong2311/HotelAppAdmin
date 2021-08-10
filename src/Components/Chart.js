import React, { useState, useEffect } from "react";
import { Area } from "@ant-design/charts";
import axios from "axios";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  let token = localStorage.getItem("token");
  var bodyFormData = new FormData();
  bodyFormData.append("token", token);
  bodyFormData.append("filter", "lastWeek");
  const getData = () => {
    axios({
      method: "post",
      url: "/statisticPay",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "success") {
          const dataChart = response.data.data;
          setData(dataChart);
          console.log(dataChart);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  var config = {
    data: data,
    xField: "from",
    yField: "summary",
    xAxis: { tickCount: 7 },
    // xAxis: { range: [0, 1] },
    animation: false,
    slider: {
      start: 0.1,
      end: 0.9,
      trendCfg: { isArea: true },
    },
  };
  return <Area {...config} />;
};

export default Chart;
