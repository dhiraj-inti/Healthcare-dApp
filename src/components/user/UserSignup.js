import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../context/users/userContext";
export const UserSignup = (props) => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  //const { login, getUser } = context;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:"",
    dob: "",
    address: "",
    phoneNumber: "",
    chronicConditions:"",
    medicalAllergies:""
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onClickLogin = (e) => {
    navigate("/user/login");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials)
    let isSubmit = true;
    if(credentials.password===credentials.confirmPassword){
        isSubmit=true;
    }
    else{
        alert("Passwords not matching.");
        isSubmit = false;
    }
    /*if(isSubmit && //condition for successful signup){
      navigate("/user/login");
    }
    else{
      navigate("/user/signup")
    }*/
  };
  return (
    <>
      <h2 style={{ justifyContent: "center", display: "flex" }}>
        Welcome, {props.name}
      </h2>
      <form style={{ position: "absolute", left: "35%" }} onSubmit={onSubmit}>
        <div
          className="mb-3"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            <label htmlFor="InputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={credentials.name}
            />
          </div>
          <div>
            <label htmlFor="InputEmail" className="form-label">
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <label htmlFor="InputPassword" className="form-label">
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
            <div style={{ marginLeft: "10px" }}>
              <label htmlFor="InputConfirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                onChange={onChange}
                value={credentials.confirmPassword}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <label htmlFor="InputDOB" className="form-label">
                DOB
              </label>
              <input
                type="date"
                className="form-control"
                id="DOB"
                name="DOB"
                style={{ width: "205px" }}
                aria-describedby="emailHelp"
                onChange={onChange}
                value={credentials.dob}
              />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <label htmlFor="InputPhno" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="Phno"
                name="phoneNumber"
                onChange={onChange}
                value={credentials.phoneNumber}
              />
            </div>
          </div>
          <div>
            <label htmlFor="InputAddress" className="form-label">
              Address
            </label>
            <input
              type="textarea"
              className="form-control"
              id="address"
              name="address"
              style={{ height: "60px" }}
              onChange={onChange}
              value={credentials.address}
            />
          </div>
          <div>
            <label htmlFor="InputChronic" className="form-label">
              Chronic medical conditions, if any
            </label>
            <input
              type="textarea"
              className="form-control"
              id="chronicConditions"
              name="chronicConditions"
              onChange={onChange}
              value={credentials.chronicConditions}
            />
          </div>
          <div>
            <label htmlFor="InputAllergies" className="form-label">
              Medical Allergies, if any
            </label>
            <input
              type="textarea"
              className="form-control"
              id="medicalAllergies"
              name="medicalAllergies"
              onChange={onChange}
              value={credentials.medicalAllergies}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div style={{ marginLeft: "10px" }} id="login" class="form-text">
            Already signed up? Click here to{" "}
              <u onClick={onClickLogin}>Login</u>
          </div>
        </div>
      </form>
    </>
  );
};
