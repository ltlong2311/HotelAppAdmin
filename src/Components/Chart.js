import React, { useState, useEffect } from "react";
import { Area } from "@ant-design/charts";
import token from "../readCookie";
import chartAPI from "../API/ChartAPI";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(); // eslint-disable-next-line
  }, []);

  const getData = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("token", token);
    bodyFormData.append("filter", "lastWeek");

    try {
      const res = await chartAPI.dataFilter(bodyFormData);
      console.log(res);
      if (res.status === "success") {
        const dataChart = res.data;
        setData(dataChart);
        console.log(dataChart);
      }
    } catch (error) {
      console.log(error);
    }
  };
  var config = {
    data: data,
    title: {
      visible: true,
      text: "Doanh thu tuần qua",
    },
    xField: "from",
    yField: "summary",
    // xAxis: { tickCount: 1 },
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
