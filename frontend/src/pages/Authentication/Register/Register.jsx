import React, { useEffect } from "react";
import api from "../../../apiConfig/api";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import CLink from "../../../components/General/CustomLink/CLink";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleState = (e, stateHandler) => {
    stateHandler(e.target.value);
  };
  const emptyForm = () => {
    setName("");
    setPassword("");
    setEmail("");
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name,
      password,
      email,
    };
    dispatch({ type: "REGISTER_REQUEST", payload: user });
    emptyForm();
  };
  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigate("/");
      }
    }, 1000);
  }, [user, navigate]);
  return (
    <div>
      <h1 className="jumbotron text-center bg-primary"> Register</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          {/* form with email name and password fields */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => handleState(e, setEmail)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => handleState(e, setName)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleState(e, setPassword)}
            />
          </div>
          <button
            disabled={loading || !name || !email || !password}
            type="submit"
            className="btn btn-primary"
          >
            {loading ? <SyncOutlined spin /> : "Register"}
          </button>
        </form>
        <p className="text-center p-3">
          Already have an account?
          <CLink path="/login" label="Login" />
        </p>
      </div>
    </div>
  );
}
