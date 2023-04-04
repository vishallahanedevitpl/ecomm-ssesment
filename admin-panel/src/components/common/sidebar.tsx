import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link " to="/">
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/product">
              <i className="bi bi-box-seam"></i>
              <span>Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/category">
              <i className="bi bi-diagram-2"></i>
              <span>Categories</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/profile">
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="index.html">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
