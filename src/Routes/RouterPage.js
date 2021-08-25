import React from "react";
import { Route, Switch } from "react-router-dom";
import ChangePasswordForm from "../Components/ChangePasswordForm";
import UpdateRoomForm from "../Components/UpdateRoomForm";
import UpdateServiceForm from "../Components/UpdateServiceForm";
import UpdateUserForm from "../Components/UpdateUserForm";
import OverviewPage from "../Pages/OverviewPage";
import ReceiptListPage from "../Pages/ReceiptListPage";
import RoomListPage from "../Pages/RoomListPage";
import ServiceListPage from "../Pages/ServiceListPage";
import UserListPage from "../Pages/UserListPage";

const RouterPage = () => {
  return (
    <Switch>
      <Route exact path="/manager/dashboard" component={OverviewPage} />
      <Route path="/manager/room/list" component={RoomListPage}/>
      <Route path="/manager/service/list" component={ServiceListPage}/>
      <Route path="/manager/receipt/list" component={ReceiptListPage}/>
      <Route path="/manager/user/list" component={UserListPage}/>
      <Route path="/manager/user/active" />
      <Route path="/manager/room/:id/update" component={UpdateRoomForm}/>
      <Route path="/manager/service/:id/update" component={UpdateServiceForm}/>
      <Route path="/manager/user/:id/update" component={UpdateUserForm}/>
      <Route path="/manager/changePassword" component={ChangePasswordForm}/>
      <Route path="/manager" component={OverviewPage} />
      <Route path="/manager/setting" component={UpdateUserForm}/>
    </Switch>
  );
};

export default RouterPage;
