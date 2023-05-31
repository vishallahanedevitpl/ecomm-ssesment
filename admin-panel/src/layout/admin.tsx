import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Loader from "../components/common/Loader";
import Sidebar from "../components/common/Sidebar";
type Breadcrumb = {
  title: string;
  link?: string;
  isActive: boolean;
};
type Props = {
  children: React.ReactNode;
  pageTitle: string;
  breadcrumbs: Breadcrumb[];
};
const AdminLayout = ({ children, pageTitle, breadcrumbs }: Props) => {
  const { isLoading } = useSelector((state: any) => state.general);
  return (
    <>
      <Header />
      <Sidebar />
      {isLoading ? (
        <main
          id="main"
          className="main d-flex justify-content-center align-items-center vh-100"
        >
          <Loader />
        </main>
      ) : (
        <main id="main" className="main">
          <div className="pagetitle">
            <h1 className="text-capitalize">{pageTitle}</h1>
            <nav>
              <ol className="breadcrumb">
                {breadcrumbs.map((b, i) => (
                  <React.Fragment key={i}>
                    {b.isActive ? (
                      <li className="breadcrumb-item active">{b.title}</li>
                    ) : (
                      <li className="breadcrumb-item">
                        <Link to={b.link || ""}>{b.title}</Link>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ol>
            </nav>
          </div>
          {children}
        </main>
      )}
    </>
  );
};

export default AdminLayout;
