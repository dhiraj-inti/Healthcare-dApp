import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../context/users/userContext";
export const UserSignup = (props) => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  const { signup, getIpfsPath, getUser } = context;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    address: "",
    phoneNumber: "",
    chronicConditions: "",
    medicalAllergies: "",
  });
  useEffect(() => {
    async function init() {

      if (localStorage.getItem('token')) {
        const user = await getUser(localStorage.getItem('token'));
        if (user._id) {
          navigate("/user");
        }
        else {
          navigate("/user/signup");
        }
      }
    }

    init();
  }, [])
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const dateValidation = () => {
    var now = new Date();
    if (credentials.dob > now.toJSON().slice(0, 10)) {
      return false;
    }
    return true;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let isSubmit = true;
    //password and confirm password fields should match
    if (credentials.password === credentials.confirmPassword && credentials.password.length >= 5) {
      isSubmit = true;
    }
    else {
      alert("Passwords not matching.");
      isSubmit = false;
    }
    //name should have atleast 3 characters
    if (credentials.name.length < 3) {
      alert("Name should have atleast 3 characters.");
      isSubmit = false;
    }
    //date must be valid
    const isDateValid = dateValidation();
    if (!isDateValid) {
      isSubmit = false;
      alert("Date of birth cannot be in the future.")
    }
    //phone number must have exactly 10 digits
    if (credentials.phoneNumber.length !== 10) {
      isSubmit = false;
      alert("Phone number must have exactly 10 digits.")
    }
    if (isSubmit) {
      //preprocess name
      const filename = credentials.name.replaceAll(" ", "_");
      const response1 = await getIpfsPath(credentials.name, filename, credentials.chronicConditions, credentials.medicalAllergies);
      const path = response1[0].path
      if (response1[0].path) {
        const response2 = await signup(credentials.name, credentials.email, credentials.password, credentials.dob, credentials.address, credentials.phoneNumber, path);
        if (response2.success) {
          localStorage.setItem('token', response2.authtoken)
          navigate("/user/login");
        }
      }
    }
    else {
      navigate("/user/signup")
    }
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
                name="dob"
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
