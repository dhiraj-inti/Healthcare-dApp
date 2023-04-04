import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
export const UserLogin = (props) => {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/user");
  };
  return (
    <>
      <h2 style={{ justifyContent: "center", display: "flex" }}>
        Welcome, {props.name}
      </h2>
      <Form style={{ position: "absolute", left: "40%" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={redirectToHome}>
          Submit
        </Button>
      </Form>
    </>
  );
};
