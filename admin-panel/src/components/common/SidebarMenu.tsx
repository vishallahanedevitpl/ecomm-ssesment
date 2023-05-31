import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarMenu = ({
  title,
  to,
  iconClass = "bi bi-file-earmark",
  isDropDown = false,
  dropDownItems = [],
  ...rest
}) => {
  //States
  const [collapse, setCollapse] = useState(false);
  const { pathname } = useLocation();

  const checkForMenuActive = () => {
    if (isDropDown) {
      const allPaths = dropDownItems.map((item) => item.to);
      allPaths.forEach((path) => {
        if (pathname.includes(path)) {
          setCollapse(true);
          return;
        }
      });
    } else {
      if (pathname.includes(to)) {
        setCollapse(true);
      }
    }
  };

  useEffect(() => {
    checkForMenuActive();
  }, []);

  //Static variables
  const conditionalProps = isDropDown
    ? {
        "data-bs-target": title.toLowerCase().replaceAll(" ", "-"),
        "data-bs-toggle": "collapse",
        onClick: () => {
          setCollapse(!collapse);
        },
      }
    : {};
  return (
    <>
      <li className="nav-item" {...rest}>
        <Link
          className={collapse ? "nav-link" : "nav-link collapsed"}
          to={to}
          {...conditionalProps}
        >
          <i className={iconClass}></i>
          <span>{title}</span>
          {isDropDown && <i className="bi bi-chevron-down ms-auto"></i>}
        </Link>
        {isDropDown && (
          <ul
            id="components-nav"
            className={!collapse ? "nav-content collapse" : "nav-content"}
            data-bs-parent="#sidebar-nav"
          >
            {dropDownItems.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.to}
                  className={pathname.includes(item.to) ? "active" : ""}
                >
                  <i className="bi bi-circle"></i>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    </>
  );
};

export default SidebarMenu;
