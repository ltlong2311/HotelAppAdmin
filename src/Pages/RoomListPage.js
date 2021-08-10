import React, {useState, useEffect} from "react";
import axios from "axios";


const RoomListPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`/room`)
      .then((res) => {
        const dataRoom = res.data;
        setData(dataRoom);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return <div></div>;
};

export default RoomListPage;
