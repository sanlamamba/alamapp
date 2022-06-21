import React, { useEffect } from "react";
import { Button } from "antd";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BecomeInstructor() {
  const [loading, setLoading] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role && user.role.includes("Instructor")) {
      navigate("/instructor");
      console.log("user is instructor");
    }
  }, [user]);

  return (
    <>
      <h1 className="jumbotron text-center bg-primary">Become an instructor</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
              <UserSwitchOutlined className=" display-1 pb-3" />
              <br />
              <h2> Become an instructor and publish courses. </h2>
              <p className="lead text-warning">
                Become an instructor and publish courses.
              </p>
              <p className="lead">
                You can become an instructor by clicking the button below.
              </p>
              <Button
                type="primary"
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
                size="large"
                onClick={() => {
                  setLoading(true);
                  dispatch({ type: "BECOME_INSTRUCTOR_REQUEST" });
                }}
              >
                {loading ? (
                  <LoadingOutlined />
                ) : user && user.role && user.role.includes("Instructor") ? (
                  " You are already an instructor"
                ) : (
                  "Become an instructor"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
