import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";
import client from "../../apiConfig/api";
import UserNav from "../nav/UserNav";

export default function UserRoutes({ children }) {
  const [hidden, setHidden] = useState(true);
  const [denied, setDenied] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const apiCall = await client.post("/auth/current-user", {
            token,
          });
          const { data } = apiCall;
          if (apiCall.ok) {
            setHidden(false);
            setDenied(false);
          } else {
            setDenied(true);
            setHidden(true);
          }
        }
      } catch (e) {
        console.log(e);
        setHidden(true);
        setDenied(true);
      }
    };
    fetchUser();
  }, [token, user]);
  return (
    <>
      {/* <h1 className="jumbotron text-center bg-primary">Dashboard User</h1> */}
      {denied ? (
        <div className="alert alert-danger text-center">
          You are not authorized to view this page.
        </div>
      ) : hidden ? (
        <div className="text-center">
          <SyncOutlined spin />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <UserNav />
            </div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
