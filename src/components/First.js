import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const Logo = require("./sastra_logo.png");
export const First = () => {
  const navigate = useNavigate();
  const userLogin = () => {
    navigate("/user/login");
  };
  const pharmaLogin = () => {
    navigate("/pharma/login");
  };
  const adminLogin = () => {
    navigate("/admin/login");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px 0",
          backgroundColor: "#F2F2F2",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <img
          src={Logo}
          style={{
            width: "200px",
            height: "100px",
            marginBottom: "50px",
          }}
        />
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "36px",
            fontWeight: "bold",
            color: "#1A1A1A",
          }}
        >
          Enhanced Healthcare Services Using Blockchain
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "700px",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <p
            style={{
              marginBottom: "30px",
              fontSize: "18px",
              lineHeight: "1.5",
              color: "#4D4D4D",
            }}
          >
            Welcome to our platform for enhanced healthcare services using
            blockchain technology. We believe in providing seamless and
            transparent access to medical information for patients, doctors, and
            administrators.
          </p>
          <p
            style={{
              marginBottom: "30px",
              fontSize: "18px",
              lineHeight: "1.5",
              color: "#4D4D4D",
            }}
          >
            Our aim is to revolutionize the healthcare industry and improve
            patient outcomes through the use of secure and decentralized
            blockchain technology.
          </p>
          <h2
            style={{
              marginBottom: "20px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1A1A1A",
            }}
          >
            Who are you ?
          </h2>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Button
              style={{ margin: "20px" }}
              variant="primary"
              onClick={userLogin}
            >
              Patient
            </Button>{" "}
            <Button
              style={{ margin: "20px" }}
              variant="secondary"
              onClick={pharmaLogin}
            >
              Pharmacist
            </Button>{" "}
            <Button
              style={{ margin: "20px" }}
              variant="success"
              onClick={adminLogin}
            >
              Admin
            </Button>{" "}
          </div>
          <h6
            style={{
              position: "absolute",
              bottom: -100,
              right: 100,
              textAlign: "left",
            }}
          >
            <b>
            Developed by
            <br />
            Inti Dhiraj
            <br />
            Dhavala Sai Sri Mahita
            </b>
          </h6>
        </div>
      </div>
    </>
  );
};
