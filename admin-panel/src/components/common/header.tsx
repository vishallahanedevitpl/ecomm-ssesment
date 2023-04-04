import React from "react";

const Header = () => {
  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">E-comm</span>
          </a>
          {/* <i className="bi bi-list toggle-sidebar-btn" /> */}
        </div>
        {/* End Logo */}
      </header>
    </>
  );
};

export default Header;
