// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer
      className="text-white py-5 mt-auto"
      style={{ backgroundColor: "#1a1d2e" }}
    >
      <div className="container">
        <div className="row">
          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>📈</span>
              <h5 className="fw-bold mb-0">StockTracker</h5>
            </div>
            <p className="text-white-50">
              Your trusted partner in stock market investment and portfolio
              management.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/dashboard"
                  className="text-white-50 text-decoration-none"
                >
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/news" className="text-white-50 text-decoration-none">
                  News
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Contact
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3">Get Started</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/register"
                  className="text-white-50 text-decoration-none"
                >
                  Sign Up
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/login"
                  className="text-white-50 text-decoration-none"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <p className="text-center text-white-50 mb-0">
          © 2025 StockTracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
