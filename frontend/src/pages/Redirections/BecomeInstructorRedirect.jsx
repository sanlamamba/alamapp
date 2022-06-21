import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function BecomeInstructorRedirect() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      dispatch({ type: "SET_JUST_LOGGED_OUT", payload: false });
      //   navigate("/instructor");
    }
  }, [user, dispatch, navigate]);

  return (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-2 p-3"
    />
  );
}
