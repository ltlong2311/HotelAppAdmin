import React from "react";
import { Route, Switch } from "react-router-dom";
import OverviewPage from "../Pages/OverviewPage";
import ReceiptListPage from "../Pages/ReceiptListPage";
import RoomListPage from "../Pages/RoomListPage";
import ServiceListPage from "../Pages/ServiceListPage";
import UserListPage from "../Pages/UserListPage";

const RouterPage = (props) => {
  return (
    <Switch>
      <Route exact path="/manager/dashboard" component={OverviewPage} />
      <Route path="/manager/room/list" component={RoomListPage}/>
      <Route path="/manager/service/list" component={ServiceListPage}/>
      <Route path="/manager/receipt/list" component={ReceiptListPage}/>
      <Route path="/manager/user" component={UserListPage}/>
      <Route path="/manager/user/active" />
    </Switch>
  );
};

export default RouterPage;
