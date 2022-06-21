import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SyncOutlined } from "@ant-design/icons";
import client from "../../apiConfig/api";
import InstructorNav from "../nav/InstructorNav";

export default function InstructorRoute({ children }) {
  const [hidden, setHidden] = useState(true);
  const [denied, setDenied] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        if (token) {
          const apiCall = await client.post("/instructor/current-instructor", {
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
    fetchInstructor();
  }, [token, user]);
  return (
    <>
      {/* <h1 className="jumbotron text-center bg-primary">Dashboard Instructor</h1> */}
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
              <InstructorNav />
            </div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
