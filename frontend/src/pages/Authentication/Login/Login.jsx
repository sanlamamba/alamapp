import React, { useEffect } from "react";
import CLink from "../../../components/General/CustomLink/CLink";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleState = (e, stateHandler) => {
    stateHandler(e.target.value);
  };
  const emptyForm = () => {
    setPassword("");
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      password,
      email,
    };
    dispatch({ type: "LOGIN_REQUEST", payload: user });
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
      <h1 className="jumbotron text-center bg-primary"> Login </h1>
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
            disabled={!email || !password}
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>
        </form>
        <p className="text-center p-3">
          Already have an account?
          <CLink path="/Register" label="Register" />
        </p>
      </div>
    </div>
  );
}
