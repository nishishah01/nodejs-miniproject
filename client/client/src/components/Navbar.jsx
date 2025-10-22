import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#1a1d2e", padding: "1rem 0" }}
    >
      <div className="container">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center text-white fw-bold fs-4"
        >
          <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>📈</span>
          StockTracker
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{ borderColor: "rgba(255,255,255,0.3)" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white px-3">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-white px-3">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/news" className="nav-link text-white px-3">
                News
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item me-2">
              <Link to="/login" className="btn btn-outline-light px-4">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/register"
                className="btn px-4"
                style={{ backgroundColor: "#0d6efd", color: "white" }}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
