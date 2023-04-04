import React from "react";
import Header from "../components/common/header";
import Sidebar from "../components/common/sidebar";

type Props = {
  children: React.ReactNode;
};
const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
