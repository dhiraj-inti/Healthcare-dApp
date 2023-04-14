import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../context/users/userContext";
export const UserLogin = (props) => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  const { login, getUser } = context;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  useEffect(() => {
    async function init() {
      if (localStorage.getItem("token")) {
        const user = await getUser(localStorage.getItem("token"));
        if (user._id) {
          navigate("/user");
        } else {
          navigate("/user/login");
        }
      }
    }

    init();
  }, []);
  const onClickSignup = (e) => {
    navigate("/user/signup");
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await login(credentials.email, credentials.password);
    if (response.success) {
      navigate("/user");
      localStorage.setItem("token", response.authtoken);
    } else {
      navigate("/user/login");
      setCredentials({ email: "", password: "" })
      alert("Enter correct credentials to Login !")
    }
  };
  return (
    <>
      <h2 style={{ justifyContent: "center", display: "flex" }}>
        Welcome, {props.name}
      </h2>
      <form style={{ position: "absolute", left: "40%" }} onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <div style={{}}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div style={{ marginLeft: "10px" }} id="login" className="form-text">
            New user? Click here to <u onClick={onClickSignup}>Sign up</u>
          </div>
        </div>
      </form>
    </>
  );
};
