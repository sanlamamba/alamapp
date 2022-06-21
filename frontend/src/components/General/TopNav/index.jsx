import React, { useEffect } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import CLink from "../CustomLink/CLink";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Index() {
  const dispatch = useDispatch();
  const { SubMenu, Item } = Menu;
  const [current, setCurrent] = React.useState("");
  const navigate = useNavigate();
  const { user, justLoggedOut } = useSelector((state) => state.auth);
  useEffect(() => {
    setCurrent(window.location.pathname);
  }, [navigate, current, user, dispatch]);
  return (
    <Menu mode="horizontal" activeKey={current}>
      <Item key="/" icon={<AppstoreOutlined />} onClick={() => setCurrent("/")}>
        <CLink path="/" label="Home" />
      </Item>
      {user && user.role && user.role.includes("Instructor") && (
        // Create a course link if user is an instructor
        <Item key="/instructor/course/create" icon={<CarryOutOutlined />}>
          <CLink path="/instructor/course/create" label="Create Course" />
        </Item>
      )}
      {user && user.role && !user.role.includes("Instructor") && (
        // Become an instructor link if user is not an instructor
        <Item key="/user/become-instructor" icon={<TeamOutlined />}>
          <CLink path="/user/become-instructor" label="Become an Instructor" />
        </Item>
      )}
      <SubMenu
        key="authentication"
        icon={<UserOutlined />}
        title={user ? user.name : "Authentication"}
      >
        {user ? (
          <>
            <Item key="/user" onClick={() => setCurrent("/user")}>
              <CLink path="/user" label="My Account" />
            </Item>
            {user.role.includes("Instructor") && (
              <Item key="/instructor" onClick={() => setCurrent("/instructor")}>
                <CLink path="/instructor" label="Instructor Profile" />
              </Item>
            )}
          </>
        ) : (
          <>
            <Item key="/login" onClick={() => setCurrent("/login")}>
              <CLink path="/login" label="Login" />
            </Item>
            <Item key="/register" onClick={() => setCurrent("/register")}>
              <CLink path="/register" label="Register" />
            </Item>
          </>
        )}
      </SubMenu>
      {user && (
        <Item
          className="float-right"
          key="/logout"
          onClick={() => dispatch({ type: "LOGOUT_REQUEST" })}
          icon={<LoginOutlined />}
        >
          Log out
        </Item>
      )}
    </Menu>
  );
}
