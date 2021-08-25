import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import RouterURL from "./Routes/RouterURL";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "antd/dist/antd.css";
import "./Styles/index.css";
import "react-toastify/dist/ReactToastify.css";

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
    }// eslint-disable-next-line 
  }, []);

  return (
    <>
      <RouterURL logOut={logOut} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    notify: state.notify,
  };
};

export default connect(mapStateToProps)(App);
