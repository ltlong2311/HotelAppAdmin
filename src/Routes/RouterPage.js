import React from "react";
import { Route, Switch } from "react-router-dom";
import OverviewPage from "../Pages/OverviewPage";

const RouterPage = (props) => {
  return (
    <Switch>
      <Route exact path="/manager/dashboard" component={OverviewPage} />
      <Route path="/manager/room/list" />
      <Route path="/manager/service/list" />
      <Route path="/manager/receipt/list" />
      <Route path="/manager/user" />
      <Route path="/manager/user/active" />
    </Switch>
  );
};

export default RouterPage;
