import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-journal-bookmark-fill me-2"></i>
          iNotebook
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

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                <i className="bi bi-house-door-fill me-1"></i>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                <i className="bi bi-info-circle-fill me-1"></i>
                About
              </Link>
            </li>

          </ul>
  
      


     {!localStorage.getItem('token')?<form className="d-flex">
  <Link className="btn btn-primary mx-2" to="/login" role="button">
    Login
  </Link>

  <Link className="btn btn-primary mx-2" to="/signup" role="button">
    Sign up
  </Link>
</form>: <button onClick={handleLogout} className="btn btn-primary">Logout</button>}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;