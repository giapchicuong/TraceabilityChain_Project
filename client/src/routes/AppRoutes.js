import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import ManufacturerRoutes from "./ManufacturerRoutes";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Groups from "../pages/Groups/Groups";
import Products from "../pages/ManageProducts/Products";
import Users from "../pages/ManageUsers/Users";
import Home from "../pages/Home/Home";
import Roles from "../pages/Roles/Roles";
import GroupRole from "../pages/GroupRole/GroupRole";
import Error from "../components/Error/Error";
import PublicRoutes from "./PublicRoutes";
import Product from "../pages/Product/Product";
const AppRoutes = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <PrivateRoutes path="/" component={Home} exact={true} />
        <PrivateRoutes
          path="/users"
          component={() => <AdminRoutes>{<Users />}</AdminRoutes>}
        />
        <PrivateRoutes
          path="/roles"
          component={() => <AdminRoutes>{<Roles />}</AdminRoutes>}
        />
        <PrivateRoutes
          path="/group-role"
          component={() => <AdminRoutes>{<GroupRole />}</AdminRoutes>}
        />
        <PrivateRoutes
          path="/groups"
          component={() => <AdminRoutes>{<Groups />}</AdminRoutes>}
        />

        <PrivateRoutes
          path="/products"
          component={() => (
            <ManufacturerRoutes>{<Products />}</ManufacturerRoutes>
          )}
        />
        <PublicRoutes path="/public/product/:id" component={Product} />

        <Route path="*" component={Error} />
      </Switch>
    </>
  );
};

export default AppRoutes;
