import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  let location = useLocation();
  const [type, setType] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const Logout = () => {
    let x = location.pathname;
    let c = x.charAt(1);
    if (c === "u") {
      localStorage.removeItem('token');
      setLogin(false);
      navigate('/user/login');
    }
    else if (c === "p") {
      localStorage.removeItem('pharmaToken');
      setLogin(false);
      navigate('/pharma/login');
    }
    else if (c === "a") {
      navigate('/admin/login');
      setLogin(false);
    }
  }
  useEffect(() => {
    let x = location.pathname;
    let c = x.charAt(1);
    let ch = x.charAt(5)
    if (c === "u") {
      setType("user");
    } else if (c === "p") {
      setType("pharma");
    } else if (c === "a") {
      setType("admin");
    }
    else {
      setType("");
    }

    if ((localStorage.getItem("token") && c === "u") || (localStorage.getItem("pharmaToken") && c === "p") || (ch === 'n' && x.length >= 6 && x.charAt(7) !== 'l')) {
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
                  className={`nav-link ${location.pathname === "/user/bookappointment"
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
                  className={`nav-link ${location.pathname === "/user/viewbyrfid"
                      ? "active"
                      : ""
                    }`}
                  to="/user/viewbyrfid"
                >
                  View by RFID
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/user/appointments" ? "active" : ""
                    }`}
                  to="/user/appointments"
                >
                  Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/user/accdetails" ? "active" : ""
                    }`}
                  to="/user/accdetails"
                >
                  Account Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/user/login" ? "active" : ""
                    }`}
                  to="/user/login"
                  onClick={Logout}
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
                  className={`nav-link ${location.pathname === "/pharma/sellmedicine" ? "active" : ""
                    }`}
                  to="/pharma/sellmedicine"
                >
                  Sell Medicines
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/pharma/druginv" ? "active" : ""
                    }`}
                  to="/pharma/druginv"
                >
                  Drug Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/pharma/viewmed" ? "active" : ""
                    }`}
                  to="/pharma/viewmed"
                >
                  Medicine Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/pharma/accdetails" ? "active" : ""
                    }`}
                  to="/pharma/accdetails"
                >
                  Account Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/pharma/login" ? "active" : ""
                    }`}
                  to="/pharma/login"
                  onClick={Logout}
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
                  className={`nav-link ${location.pathname === "/admin/druginv" ? "active" : ""
                    }`}
                  to="/admin/druginv"
                >
                  Drug Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/admin/appointments" ? "active" : ""
                    }`}
                  aria-current="page"
                  to="/admin/appointments"
                >
                  Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/admin/viewmed" ? "active" : ""
                    }`}
                  to="/admin/viewmed"
                >
                  Medicine Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/admin/accdetails" ? "active" : ""
                    }`}
                  to="/admin/accdetails"
                >
                  Account Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/admin/login" ? "active" : ""
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
