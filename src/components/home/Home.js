import React from "react";
import { useContext, useEffect, useState } from "react";
import userContext from '../../context/users/userContext';
import PharmacistContext from "../../context/pharmscists/pharmacistContext";
const Logo = require("../sastra_logo.png");
export const Home = (props) => {
  const UserContext = useContext(userContext);
  const context = useContext(PharmacistContext)
  const { getUser } = UserContext;
  const { getPharmacist } = context;
  const [name, setName] = useState(null);
  useEffect(() => {
    async function init() {
      if (props.type === "user") {
        const token = localStorage.getItem('token');
        const user = await getUser(token);
        setName(user.name);
      }
      else if (props.type === "pharma") {
        const pharmaToken = localStorage.getItem('pharmaToken');
        const pharma = await getPharmacist(pharmaToken);
        setName(pharma.name);
      }
      else {
        setName("Admin");
      }

    }
    init()
  }, [])
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px 0",
          backgroundColor: "#white",
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
          Welcome, {name}
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
          <h3><b>Our Services</b></h3>
          <ul style={{
            marginBottom: "30px",
            fontSize: "20px",
            lineHeight: "1.5",
            color: "#4D4D4D",
            textAlign: "left",
            marginLeft: "100px"
          }}>
            <li>{props.s1}</li>
            <li>{props.s2}</li>
            <li>{props.s3}</li>
          </ul>
        </div>
      </div>
    </>
  )
}
