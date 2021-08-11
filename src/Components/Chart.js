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
    title: {
      visible: true,
      text: "Doanh thu tuần qua",
    },
    xField: "from",
    yField: "summary",
    // xAxis: { tickCount: 6 },
    xAxis: { range: [0, 1] },
    animation: false,
    slider: {
      start: 0.1,
      end: 0.9,
      trendCfg: { isArea: true },
    },
    point: {
      visible: true,
      shape: "circle",
      style: {
        fill: "white",
        stroke: "#2593fc",
        lineWidth: 2,
      },
    },
  };
  return (
    <div>
      <Area
        style={{
          marginTop: 40,
        }}
        {...config}
      />
      <div
        className=""
        style={{
          padding: 24,
          margin: 0,
          textAlign: "center",
          color: "#6c7a89",
        }}
      >
        Biểu đồ doanh thu tuần qua
      </div>
    </div>
  );
};

export default Chart;
