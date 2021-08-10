import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Components/Login";
import AdminHomePage from "../Pages/AdminHomePage";
const RouterURL = (props) => {
    const logOut = () => {
        props.logOut();
    }
  return (
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Route path="/manager/dashboard">
        <AdminHomePage logOut={logOut} />
      </Route>
    </Switch>
  );
};

export default RouterURL;
