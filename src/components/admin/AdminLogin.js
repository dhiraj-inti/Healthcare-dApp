import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export const AdminLogin = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (credentials.email === "admin@healthcaredapp.com" && credentials.password === "dappassword") {
      navigate('/admin');
    }
    else {
      navigate('/admin/login');
      setCredentials({ email: "", password: "" })
      alert("Enter correct credentials to Login !")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  return (
    <>
      <h2 style={{ justifyContent: "center", display: "flex" }}>
        Welcome, {props.name}
      </h2>
      <form
        style={{ position: "absolute", left: "40%" }}
        onSubmit={onSubmit}
      >
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
