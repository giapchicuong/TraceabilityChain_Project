import React from "react";
import "./sidebar.scss";
import { useSelector } from "react-redux";
import NavLinkCustom from "../NavLinkCustom/NavLinkCustom";
const Sidebar = () => {
  const account = useSelector((state) => state.account);
  const currentRole = useSelector(
    (state) => state.account?.userInfor?.groupWithRoles?.name
  );
  if (account && account.isAuthenticated === true) {
    return (
      <div className="sidebar-container">
        <div className="container">
          <div className="top ">
            <NavLinkCustom
              link="/"
              child={
                <div className="brand d-none d-lg-block">TraceabilityChain</div>
              }
            />
            <div className="user">
              <div className="icon">
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
              </div>
              <div className="name d-none d-lg-block">
                {account.userInfor.username.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="center">
            <NavLinkCustom
              title="Dashboard"
              link="/"
              icon="fa fa-signal fs-6"
            />
            {currentRole === "Admin" && (
              <>
                <NavLinkCustom title="Users" link="/users" icon="fa fa-user" />

                <NavLinkCustom
                  title="Groups"
                  link="/groups"
                  icon="fa fa-users"
                />
                <NavLinkCustom title="Roles" link="/roles" icon="fa fa-cubes" />
                <NavLinkCustom
                  title="Roles of group"
                  link="/group-role"
                  icon="fa fa-sitemap"
                />
              </>
            )}
            {currentRole === "Manufacturer" && (
              <>
                <NavLinkCustom
                  title="Products"
                  link="/products"
                  icon="fa fa-cube"
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    // return <Redirect to="/login"></Redirect>;
    return <></>;
  }
};

export default Sidebar;
