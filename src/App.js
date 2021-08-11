import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";
import RouterURL from "./Routes/RouterURL";
import './Styles/index.css'
// import history from '../history';

function App() {
  const history = useHistory();

  const logOut = () => {
    // setIsLogin(false);
    localStorage.removeItem("token");
    localStorage.clear();
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    document.cookie = "token=; expires=Thu, 23 Nov 1999 12:00:00 UTC";
    history.push("/login");
  };
  const readCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };
  useEffect(() => {
    let tokenLogin = readCookie("token");
    console.log(tokenLogin);
    if (
      localStorage.getItem("token") ||
      sessionStorage.getItem("token") ||
      tokenLogin
    ) {
      history.push("/manager/dashboard");
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <RouterURL logOut={logOut} />
    </>
  );
}

export default App;
