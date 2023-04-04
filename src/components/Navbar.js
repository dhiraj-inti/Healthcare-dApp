import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = (props) => {
  let location = useLocation();
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/accdetails" ? "active" : ""
                }`}
                to="/accdetails"
              >
                Account Details
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
                  location.pathname === "/user/bookappointment"
                    ? "active"
                    : ""
                }`}
                to="/user/bookappointment"
              >
                Book An Appointment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
