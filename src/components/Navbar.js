import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

export const Navbar = (props) => {
  let location = useLocation();
  const [type, setType] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const Logout = () =>{
    let x = location.pathname;
    let c = x.charAt(1);
    if(c==="u"){
      localStorage.removeItem('token');
      navigate('/user/login');
    }
    else if(c==="p"){
      localStorage.removeItem('pharmaToken');
      navigate('/pharma/login');
    }
    else if(c==="a"){
      navigate('/admin/login');
    }
  }
  useEffect(() => {
    let x = location.pathname;
    let c = x.charAt(1);
    let ch = x.charAt(5)
    //console.log(x.length,ch);
    if (c === "u") {
      setType("user");
    } else if (c === "p") {
      setType("pharma");
    } else if (c === "a") {
      setType("admin");
    }
    else{
      setType("");
    }

    if ((localStorage.getItem("token") && c=="u") || (localStorage.getItem("pharmaToken") && c=="p") || (ch=='n' && x.length==6)) {
      setLogin(true);
    } else {
      setLogin(false);
    }

  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Healthcare DApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {type === "user" && login && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/user/bookappointment"
                      ? "active"
                      : ""
                  }`}
                  to="/user/bookappointment"
                >
                  Book An Appointment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/user/appointments" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/user/appointments"
                >
                  Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/user/accdetails" ? "active" : ""
                  }`}
                  to="/user/accdetails"
                >
                  Account Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/user/login" ? "active" : ""
                  }`}
                  to="/user/login"
                  onClick = {Logout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}

          {type === "pharma" && login && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/pharma/sellmedicine" ? "active" : ""
                  }`}
                  to="/pharma/sellmedicine"
                >
                  Sell Medicines
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/pharma/druginv" ? "active" : ""
                  }`}
                  to="/pharma/druginv"
                >
                  Drug Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/pharma/accdetails" ? "active" : ""
                  }`}
                  to="/pharma/accdetails"
                >
                  Account Details
                </Link>
              </li>
               <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/pharma/login" ? "active" : ""
                  }`}
                  to="/pharma/login"
                  onClick = {Logout}
                >
                  Log out 
                </Link>
              </li>
            </ul>
          )}

          {type === "admin" && login && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/admin/druginv" ? "active" : ""
                  }`}
                  to="/admin/druginv"
                >
                  Drug Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/admin/appointments" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/admin/appointments"
                  onClick = {Logout}
                >
                  Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/admin/login" ? "active" : ""
                  }`}
                  to="/admin/login"
                >
                  Log out
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
