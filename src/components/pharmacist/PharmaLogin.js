import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import PharmacistContext from "../../context/pharmscists/pharmacistContext";
export const PharmaLogin = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const context = useContext(PharmacistContext)
  const { login, getPharmacist } = context;
  useEffect(() => {
    async function init() {
      if (localStorage.getItem('pharmaToken')) {
        const pharma = await getPharmacist(localStorage.getItem('pharmaToken'))
        if (pharma._id) {
          navigate("/pharma");
        } else {
          navigate("/pharma/login");
        }
      }
    }
    init();
  }, [])
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await login(credentials.email, credentials.password);
    if (response.success) {
      navigate('/pharma')
      localStorage.setItem('pharmaToken', response.authtoken);
    }
    else {
      navigate('/pharma/login')
      setCredentials({ email: "", password: "" })
      alert("Enter correct credentials to Login !")
    }

  }

  return (
    <>
      <h2 style={{ justifyContent: "center", display: "flex" }}>
        Welcome, {props.name}
      </h2>
      <Form onSubmit={onSubmit} style={{ position: "absolute", left: "40%" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} value={credentials.email} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} value={credentials.password} />
        </Form.Group>
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    </>
  );
};
